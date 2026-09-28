import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: ["/account/:path*", "/pools/:path*", "/api/ably/:path*"],
};
