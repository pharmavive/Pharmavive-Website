// src/lib/userService.ts
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import connectDB from './mongodb.js';
import User from '../models/User.js';

export interface IUserRecord {
  id: string;
  name: string;
  email: string;
  password?: string;
  institution?: string;
  role?: string;
  phone?: string;
  country?: string;
  isAdmin?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

/**
 * Ensures the data directory and users.json file exist.
 */
function ensureDataStore(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (err) {
    console.warn('[userService] Failed to ensure local data directory:', err);
  }
}

/**
 * Reads users from local fallback storage.
 */
export function readLocalUsers(): IUserRecord[] {
  try {
    ensureDataStore();
    if (!fs.existsSync(USERS_FILE)) return [];
    const raw = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.warn('[userService] Failed to read local users:', err);
    return [];
  }
}

/**
 * Writes users to local fallback storage.
 */
export function writeLocalUsers(users: IUserRecord[]): void {
  try {
    ensureDataStore();
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[userService] Failed to write local users:', err);
  }
}

/**
 * Hashes a plain password using PBKDF2 with salt.
 */
export function hashPassword(password: string): string {
  if (!password) return '';
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verifies a plain password against a stored PBKDF2 hash (or plaintext fallback).
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  if (!password || !storedHash) return false;
  if (!storedHash.includes(':')) {
    // Plaintext fallback comparison
    return password === storedHash;
  }
  const [salt, expectedHash] = storedHash.split(':');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === expectedHash;
}

/**
 * Finds a user by email, checking MongoDB first, then local fallback store.
 */
export async function findUserByEmail(email: string): Promise<IUserRecord | null> {
  if (!email) return null;
  const cleanEmail = email.toLowerCase().trim();

  // 1. Try MongoDB
  try {
    await connectDB();
    const mongoUser = await User.findOne({ email: cleanEmail }).lean();
    if (mongoUser) {
      const u = mongoUser as Record<string, unknown>;
      return {
        id: u._id ? String(u._id) : '',
        name: (u.name as string) || cleanEmail.split('@')[0],
        email: u.email as string,
        password: (u.password as string) || '',
        institution: (u.institution as string) || '',
        role: (u.role as string) || 'Customer',
        phone: (u.phone as string) || '',
        country: (u.country as string) || '',
        isAdmin: u.role === 'Admin',
        createdAt: u.createdAt as string | Date,
        updatedAt: u.updatedAt as string | Date,
      };
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn('[userService] MongoDB lookup skipped:', msg);
  }

  // 2. Fallback to local file store
  try {
    const localUsers = readLocalUsers();
    const found = localUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    if (found) return found;
  } catch (err) {
    console.warn('[userService] Local lookup error:', err);
  }

  return null;
}

/**
 * Creates or updates a user in MongoDB and local fallback store.
 */
export async function saveUser({
  name,
  email,
  password,
  institution,
  role,
  phone,
  country,
}: {
  name: string;
  email: string;
  password?: string;
  institution?: string;
  role?: string;
  phone?: string;
  country?: string;
}): Promise<IUserRecord> {
  const cleanEmail = email.toLowerCase().trim();
  const hashedPassword = password ? hashPassword(password) : '';
  const cleanRole = role && role.trim() ? role.trim() : 'Customer';
  const isAdmin = cleanRole.toLowerCase() === 'admin';

  const userRecord: IUserRecord = {
    id: 'usr_' + Date.now().toString(36),
    name: name.trim(),
    email: cleanEmail,
    password: hashedPassword,
    institution: institution?.trim() || '',
    role: cleanRole,
    phone: phone?.trim() || '',
    country: country?.trim() || '',
    isAdmin,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // 1. Try to save in MongoDB
  try {
    await connectDB();
    let mongoUser = await User.findOne({ email: cleanEmail });
    if (mongoUser) {
      mongoUser.name = name.trim();
      if (hashedPassword) mongoUser.password = hashedPassword;
      if (institution !== undefined) mongoUser.institution = institution.trim();
      if (role !== undefined) mongoUser.role = cleanRole;
      if (phone !== undefined) mongoUser.phone = phone.trim();
      if (country !== undefined) mongoUser.country = country.trim();
      await mongoUser.save();
      userRecord.id = mongoUser._id.toString();
    } else {
      mongoUser = new User({
        name: name.trim(),
        email: cleanEmail,
        password: hashedPassword,
        institution: institution?.trim() || '',
        role: cleanRole,
        phone: phone?.trim() || '',
        country: country?.trim() || '',
      });
      await mongoUser.save();
      userRecord.id = mongoUser._id.toString();
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn('[userService] MongoDB save skipped, storing locally:', msg);
  }

  // 2. Always sync with local file fallback so accounts are 100% resilient
  try {
    const localUsers = readLocalUsers();
    const index = localUsers.findIndex((u) => u.email.toLowerCase() === cleanEmail);
    if (index >= 0) {
      localUsers[index] = {
        ...localUsers[index],
        name: userRecord.name,
        password: hashedPassword || localUsers[index].password,
        institution: userRecord.institution,
        role: userRecord.role,
        phone: userRecord.phone || localUsers[index].phone || '',
        country: userRecord.country || localUsers[index].country || '',
        isAdmin: userRecord.isAdmin,
        updatedAt: new Date().toISOString(),
      };
      userRecord.id = localUsers[index].id;
    } else {
      localUsers.push(userRecord);
    }
    writeLocalUsers(localUsers);
  } catch (err) {
    console.warn('[userService] Failed to sync local storage:', err);
  }

  return userRecord;
}

/**
 * Updates editable profile information for an existing user.
 */
export async function updateUserProfile(
  email: string,
  updates: {
    name?: string;
    institution?: string;
    role?: string;
    phone?: string;
    country?: string;
  }
): Promise<IUserRecord | null> {
  const cleanEmail = email.toLowerCase().trim();

  // 1. Update in MongoDB
  try {
    await connectDB();
    const mongoUser = await User.findOne({ email: cleanEmail });
    if (mongoUser) {
      if (updates.name !== undefined) mongoUser.name = updates.name.trim();
      if (updates.institution !== undefined) mongoUser.institution = updates.institution.trim();
      if (updates.role !== undefined) mongoUser.role = updates.role.trim();
      if (updates.phone !== undefined) mongoUser.phone = updates.phone.trim();
      if (updates.country !== undefined) mongoUser.country = updates.country.trim();
      await mongoUser.save();
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn('[userService] MongoDB profile update skipped:', msg);
  }

  // 2. Update in local store
  try {
    const localUsers = readLocalUsers();
    const index = localUsers.findIndex((u) => u.email.toLowerCase() === cleanEmail);
    if (index >= 0) {
      if (updates.name !== undefined) localUsers[index].name = updates.name.trim();
      if (updates.institution !== undefined) localUsers[index].institution = updates.institution.trim();
      if (updates.role !== undefined) localUsers[index].role = updates.role.trim();
      if (updates.phone !== undefined) localUsers[index].phone = updates.phone.trim();
      if (updates.country !== undefined) localUsers[index].country = updates.country.trim();
      localUsers[index].updatedAt = new Date().toISOString();
      writeLocalUsers(localUsers);
      return localUsers[index];
    }
  } catch (err) {
    console.warn('[userService] Local storage profile update error:', err);
  }

  return findUserByEmail(cleanEmail);
}

/**
 * Updates password for an existing user.
 */
export async function updateUserPassword(email: string, newPassword: string): Promise<boolean> {
  const cleanEmail = email.toLowerCase().trim();
  const hashedPassword = hashPassword(newPassword);

  let success = false;

  // 1. Update in MongoDB
  try {
    await connectDB();
    const mongoUser = await User.findOne({ email: cleanEmail });
    if (mongoUser) {
      mongoUser.password = hashedPassword;
      await mongoUser.save();
      success = true;
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn('[userService] MongoDB password update skipped:', msg);
  }

  // 2. Update in local store
  try {
    const localUsers = readLocalUsers();
    const index = localUsers.findIndex((u) => u.email.toLowerCase() === cleanEmail);
    if (index >= 0) {
      localUsers[index].password = hashedPassword;
      localUsers[index].updatedAt = new Date().toISOString();
      writeLocalUsers(localUsers);
      success = true;
    }
  } catch (err) {
    console.warn('[userService] Local storage password update error:', err);
  }

  return success;
}
