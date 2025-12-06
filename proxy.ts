import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected routes that require authentication
const protectedRoutes = [
  "/user/profile",
  "/user/orders",
  "/checkout",
  "/admin",
] as const;

// Define public routes that should redirect to home if already authenticated
const authRoutes = ["/sign-in", "/sign-up"] as const;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user has session cookie
  const sessionToken = request.cookies.get("better-auth.session_token");
  const isAuthenticated = Boolean(sessionToken?.value);

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if the current route is an auth route (sign-in, sign-up)
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // If trying to access protected route without authentication
  if (isProtectedRoute && !isAuthenticated) {
    const signInUrl = new URL("/sign-in", request.url);
    // Add callback URL to redirect back after sign-in
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // If trying to access auth routes while already authenticated
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Generate session cart ID if not present
  const response = NextResponse.next();
  const sessionCartId = request.cookies.get("sessionCartId");

  if (!sessionCartId) {
    const newSessionCartId = crypto.randomUUID();
    response.cookies.set("sessionCartId", newSessionCartId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  return response;
}

// Configure which routes the proxy should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|icon.svg).*)",
  ],
};
