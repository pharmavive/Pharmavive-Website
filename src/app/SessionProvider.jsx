// src/app/SessionProvider.jsx
// This is a client component wrapper for NextAuth's SessionProvider.
// It's necessary because the root layout.js can be a server component by default,
// but SessionProvider needs to be a client component.

'use client';

import { SessionProvider } from 'next-auth/react';

// This component receives the server-fetched session as a prop,
// and passes it down to the NextAuth SessionProvider.
export default function NextAuthSessionProvider({ children, session }) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}
