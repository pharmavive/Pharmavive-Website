// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { authOptions } from '../../../../lib/auth'; // Ensure this path is correct

// NextAuth itself returns a handler that is compatible with the App Router's Request/Response objects.
// It internally handles the parsing of dynamic route parameters ([...nextauth]).
const handler = NextAuth(authOptions);

// Export the handler for GET and POST requests.
// These exports will be automatically recognized by Next.js App Router.
export { handler as GET, handler as POST };