import { NextResponse } from 'next/server';
import { findUserByEmail, saveUser } from '../../../../lib/userService';
import { sendNewCustomerNotification } from '../../../../lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, institution, role } = body || {};

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required.' },
        { status: 400 }
      );
    }

    if (typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters.' },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.toLowerCase().trim();
    const cleanInstitution = typeof institution === 'string' ? institution.trim() : '';
    const cleanRole = typeof role === 'string' && role.trim() ? role.trim() : 'Customer';

    // Check if user already exists (if so, update password and details seamlessly)
    const existingUser = await findUserByEmail(cleanEmail);
    const isUpdate = Boolean(existingUser);

    // Save/update user with hashed password (handles both MongoDB and local persistent store)
    const savedUser = await saveUser({
      name: cleanName,
      email: cleanEmail,
      password: password,
      institution: cleanInstitution,
      role: cleanRole,
    });

    // Dispatch admin notification email to info.pharmavive@gmail.com
    sendNewCustomerNotification({
      name: cleanName,
      email: cleanEmail,
      institution: cleanInstitution,
      role: cleanRole,
      timestamp: new Date(),
    }).catch((emailErr) => {
      console.error('[Register API] Failed to dispatch admin notification email:', emailErr);
    });

    return NextResponse.json(
      {
        success: true,
        message: isUpdate
          ? 'Account credentials updated successfully! You can now log in.'
          : 'Account registered successfully! Welcome to Pharmavive.',
        user: {
          id: savedUser.id,
          name: savedUser.name,
          email: savedUser.email,
          institution: savedUser.institution,
          role: savedUser.role,
        },
      },
      { status: isUpdate ? 200 : 201 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error.';
    console.error('Registration error:', errorMessage);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
