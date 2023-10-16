import { authMiddleware } from "@clerk/nextjs";
import { NextResponse, NextRequest } from "next/server";
import { get } from "@vercel/edge-config" 

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
      publicRoutes: ["/"]
});
 
export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 
export async function middleware(request: NextRequest) {
      if (await get("isMaintenanceModeActive")) {
            return NextResponse.rewrite(new URL('/maintenance', request.url))
      }
}