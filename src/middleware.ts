import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/admin"];
const adminRoles = ["admin", "manager", "director", "institution"];

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("session");

  if (
    protectedRoutes.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const session = JSON.parse(sessionCookie.value);
    if (!session?.user || !adminRoles.includes(session.user.role)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
