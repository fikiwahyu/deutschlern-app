import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
});
// This exports the NextAuth handlers and authentication functions, allowing for user sign-in and sign-out.
