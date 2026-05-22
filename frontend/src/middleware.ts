import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {

  const token = request.cookies.get("token")?.value;

  const protectedRoutes = [
    "/dashboard",
    "/projects",
    "/clients",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/projects/:path*",
    "/clients/:path*",
  ],
};