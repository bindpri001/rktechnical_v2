import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.role === "ADMIN" || token?.role === "SUPERADMIN";

    // If attempting to access dashboard without admin roles, redirect to home
    if (req.nextUrl.pathname.startsWith("/dashboard") && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      // Return true to allow the middleware function above to run
      // If no token exists, next-auth will automatically redirect to the signIn page
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
