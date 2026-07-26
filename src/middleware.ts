import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check for the JWT token in cookies (HTTP-only cookies will be sent with the request)
  // We assume the cookie name is 'token' or 'access_token' or 'jwt'.
  // We will check for 'token' or 'jwt'
  const token = request.cookies.get('token')?.value || request.cookies.get('jwt')?.value || request.cookies.get('access_token')?.value;

  const isLoginPage = request.nextUrl.pathname.startsWith('/login');

  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
