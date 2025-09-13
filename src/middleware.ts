import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile", "/admin/dashboard"];

const middleware = async (request: NextRequest) => {
  const { nextUrl } = request;
  const sessionCookie = getSessionCookie(request);

  const isLoggedIn = !!sessionCookie;

  const isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
  const isOnAuthRoute = nextUrl.pathname.startsWith("/auth");

  if (isOnProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isOnAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/profile",
    "/auth/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

export default middleware;
