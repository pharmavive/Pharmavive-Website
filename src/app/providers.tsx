    // src/app/providers.tsx
    'use client'; // This directive makes this a client component

    import { SessionProvider } from 'next-auth/react';
    import React from 'react';

    interface NextAuthSessionProviderProps {
      children: React.ReactNode;
    }

    export default function NextAuthSessionProvider({ children }: NextAuthSessionProviderProps) {
      return (
        <SessionProvider
          refetchOnWindowFocus={false}
          refetchWhenOffline={false}
          refetchInterval={0}
        >
          {children}
        </SessionProvider>
      );
    }
    