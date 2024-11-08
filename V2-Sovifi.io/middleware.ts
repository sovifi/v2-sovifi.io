import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ThirdwebAuth } from "@thirdweb-dev/auth/next";
import { THIRDWEB_CONFIG } from '@/lib/thirdwebConfig';

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();

  // Add Thirdweb headers
  if (THIRDWEB_CONFIG?.clientId) {
    response.headers.set('x-thirdweb-client', THIRDWEB_CONFIG.clientId);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};