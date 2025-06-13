import { NextResponse } from 'next/server'

export const config = {
    matcher: [
      '/((?!_next|api|auth).*)'
    ]
  }

export function middleware(request) {
  const cookies = request.cookies

  const authToken = cookies.get('username')

  if (!authToken) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  return NextResponse.next()
}