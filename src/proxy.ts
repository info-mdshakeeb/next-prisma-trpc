import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth-utils";

const PUBLIC_AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
];

const PROTECTED_ROUTES = [
  "/dashboard",
  "/settings",
  "/profile",
  '/users',
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if current path is protected
  const isProtectedRoute = PROTECTED_ROUTES.some(route =>
    pathname.startsWith(route)
  )
  // Check if current path is auth route
  const isAuthRoute = PUBLIC_AUTH_ROUTES.some(route =>
    pathname.startsWith(route)
  )

  // Get session
  const session = await getSession()
  const isLoggedIn = !!session;

  // Handle protected routes - user not logged in
  if (isProtectedRoute && !isLoggedIn) {
    const callback = encodeURIComponent(pathname + request.nextUrl.search)
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callback', callback)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthRoute && session) {
    const redirectUrl = new URL('/dashboard', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  runtime: "nodejs",
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/profile/:path*",
    "/users/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
};