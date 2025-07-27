import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // In a real app, you'd invalidate the session on the server.
  // Here, we just clear the cookie.
  (
    await // In a real app, you'd invalidate the session on the server.
    // Here, we just clear the cookie.
    cookies()
  ).delete("session");

  return NextResponse.redirect(new URL("/login", request.url));
}
