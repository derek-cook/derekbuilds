import { authMiddleware } from "@clerk/nextjs";
import { type NextMiddleware } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default async function middleware(...args: Parameters<NextMiddleware>) {
  return await authMiddleware({
    publicRoutes: ["/"],
    // debug: true,
  })(...args);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
