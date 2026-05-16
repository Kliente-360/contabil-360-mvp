import { NextRequest, NextResponse } from "next/server";
import { verifySession, COOKIE_NAME } from "@/lib/auth-demo";

const PUBLIC_PATHS = ["/login", "/api/auth"];

// Simple per-process token verification cache (Edge Runtime compatible)
const tokenCache = new Map<string, number>(); // token → expiry timestamp ms

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = req.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Check cache first
  const cachedExp = tokenCache.get(token);
  if (cachedExp && cachedExp > Date.now()) {
    return NextResponse.next();
  }

  const session = await verifySession(token);

  if (!session) {
    tokenCache.delete(token);
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete(COOKIE_NAME);
    return response;
  }

  // Cache for 60 seconds
  tokenCache.set(token, Date.now() + 60_000);

  // Prevent unbounded growth
  if (tokenCache.size > 500) {
    const now = Date.now();
    for (const [k, exp] of tokenCache) {
      if (exp < now) tokenCache.delete(k);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
