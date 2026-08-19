import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  console.log(
    "PROXY:",
    request.nextUrl.pathname,
    "SESSION:",
    !!sessionCookie
  );

  if (!sessionCookie) {
    return NextResponse.redirect(
      new URL("/auth/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blog/:path*", "/create/:path*"],
};