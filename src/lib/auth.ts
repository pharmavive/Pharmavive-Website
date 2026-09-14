// src/lib/auth.ts
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import type { DefaultSession } from 'next-auth';
import { findUserByEmail, verifyPassword } from './userService';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'admin' },
        password: { label: 'Password', type: 'password', placeholder: 'admin@123' },
      },
      async authorize(credentials) {
        const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin@pharmavive.com';
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        const inputEmail = credentials.email.trim();
        const inputPassword = credentials.password;

        // 1. Hardcoded Administrator check
        const isEmailMatch =
          inputEmail.toLowerCase() === ADMIN_USERNAME.toLowerCase() ||
          inputEmail.toLowerCase() === 'admin' ||
          inputEmail.toLowerCase() === 'admin@pharmavive.com';

        const isPassMatch =
          inputPassword === ADMIN_PASSWORD ||
          inputPassword === 'admin123' ||
          inputPassword === 'admin@123';

        if (isEmailMatch && isPassMatch) {
          return {
            id: 'hardcoded_admin_id',
            email: ADMIN_USERNAME,
            name: 'Administrator',
            role: 'Admin',
            isAdmin: true,
          };
        }

        // 2. Registered Users Authentication (MongoDB + Fallback Store)
        try {
          const user = await findUserByEmail(inputEmail);
          if (user && user.password) {
            const isMatch = verifyPassword(inputPassword, user.password);
            if (isMatch) {
              return {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role || 'Customer',
                institution: user.institution || '',
                isAdmin: Boolean(user.isAdmin || user.role === 'Admin'),
              };
            }
          }
        } catch (authErr) {
          console.error('[auth] Registered user verification error:', authErr);
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
        token.role = user.role;
        token.institution = user.institution;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.isAdmin = token.isAdmin as boolean;
        session.user.role = token.role as string;
        session.user.institution = token.institution as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      try {
        const parsed = new URL(url);
        if (parsed.hostname === 'localhost' || parsed.origin === baseUrl) {
          return url;
        }
      } catch {
        // Fallback to baseUrl
      }
      return baseUrl;
    },
  },
  useSecureCookies:
    process.env.NODE_ENV === 'production' &&
    Boolean(process.env.NEXTAUTH_URL?.startsWith('https://')) &&
    !process.env.NEXTAUTH_URL?.includes('localhost'),
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  pages: {
    signIn: '/admin/signin',
  },
};

// Extend next-auth types
declare module 'next-auth' {
  interface User {
    id?: string;
    isAdmin?: boolean;
    role?: string;
    institution?: string;
  }
  
  interface Session extends DefaultSession {
    user?: {
      id?: string;
      isAdmin?: boolean;
      role?: string;
      institution?: string;
    } & DefaultSession['user'];
  }

  interface JWT {
    id?: string;
    isAdmin?: boolean;
    role?: string;
    institution?: string;
  }
}