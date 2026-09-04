import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

import { PUBLIC_ROUTES, LOGIN, ROOT } from "@/lib/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
   ("req.auth =", req.auth);
  const { nextUrl } = req;

  // ✅ Auth.js API routes skip
  if (nextUrl.pathname.startsWith("/api/auth")) {
    return;
  }

  const isAuthenticated = !!req.auth;
  ("isAuthenticated =", isAuthenticated);

  const isPublicRoute =
    PUBLIC_ROUTES.some((route) => nextUrl.pathname.startsWith(route)) ||
    nextUrl.pathname === ROOT;

  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL(LOGIN, nextUrl));
  }

  return;
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};