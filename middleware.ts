import { NextRequest, NextResponse } from 'next/server';

/**
 * Vercel Edge Middleware for Staging Protection
 * Adds basic authentication to staging environment
 */

export const config = {
  matcher: '/:path*',
};

export default function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';

  // Only protect staging environment
  if (!hostname.includes('staging.cleanventnyc.com')) {
    return NextResponse.next();
  }

  // Check for authorization header
  const authHeader = request.headers.get('authorization');

  if (!authHeader) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Staging Environment"',
      },
    });
  }

  // Parse Basic Auth credentials
  const auth = authHeader.split(' ')[1];
  const [user, password] = Buffer.from(auth, 'base64').toString().split(':');

  // Staging credentials (change these!)
  const validUsername = 'cleanvent';
  const validPassword = 'staging2025!';

  if (user === validUsername && password === validPassword) {
    // Add staging header for debugging
    const response = NextResponse.next();
    response.headers.set('X-Environment', 'staging');
    return response;
  }

  return new NextResponse('Invalid credentials', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Staging Environment"',
    },
  });
}
