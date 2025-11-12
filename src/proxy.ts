import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

const signInRoutes = ["/login", "/register", "/verify-2fa", "/reset-password"];
const publicRoutes = ["/"];

export default async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const pathname = request.nextUrl.pathname;
  const referer = request.headers.get("referer") || "";

  // 1️⃣ Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const isSignInRoute = signInRoutes.includes(pathname);

  // 2️⃣ If visiting sign-in routes without session → allow
  if (isSignInRoute && !sessionCookie) {
    return NextResponse.next();
  }

  // 3️⃣ If visiting protected route without session → redirect to login
  if (!isSignInRoute && !sessionCookie) {
    // Preserve destination so user returns after successful login
    const callback = encodeURIComponent(pathname + request.nextUrl.search);
    return NextResponse.redirect(new URL(`/login?callback=${callback}`, request.url));
  }

  // 4️⃣ If visiting sign-in route *with* session → redirect to dashboard
  if (isSignInRoute && sessionCookie && !referer.includes("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 5️⃣ Otherwise → allow (authenticated user visiting normal route)
  return NextResponse.next();
}

export const config = {
  // Run middleware on all routes except static assets and api routes
  matcher: ["/((?!.*\\..*|_next|api/auth).*)", "/", "/trpc(.*)"],
};
