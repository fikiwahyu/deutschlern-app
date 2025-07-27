import { cookies } from "next/headers";

// This is a mock user type. In a real app, you'd get this from your database.
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "director" | "institution" | "user";
}

// Mock function to get the current user session.
// In a real app, this would involve verifying a JWT or session cookie.
export async function getSession(): Promise<{ user: User } | null> {
  const sessionCookie = cookies().get("session");

  if (!sessionCookie) {
    return null;
  }

  // In this mock, we're just parsing a JSON string.
  return JSON.parse(sessionCookie.value);
}
