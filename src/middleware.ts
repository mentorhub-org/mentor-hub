import { NextRequest, NextResponse } from 'next/server'
import { authClient } from './lib/auth-client'

// Define protected routes
const protectedPaths = ['/profile/*']

export async function middleware(request: NextRequest) {
  const session = await authClient.getSession({
    fetchOptions: { headers: request.headers },
  })

  const { pathname } = request.nextUrl

  if (pathname.startsWith('/profile') && !session.data) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (pathname.startsWith('/auth') && session.data) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Allow the request to proceed
  return NextResponse.next()
}

// Specify which routes the middleware should apply to
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images).*)',
  ],
}
