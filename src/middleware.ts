import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "./server/auth";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const protectedPaths = ["/arabic/", "/koine-greek", "/hebrew"];
  const isPathProtected = protectedPaths?.some((path) => pathname == path);
  const res = NextResponse.next();

  if (isPathProtected) {
    const sessionCookie = req.cookies.get("next-auth.session-token");
    if (!sessionCookie) {
      const url = new URL(`/authenticate`, req.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  return res;
}
