import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessToken } from './lib/auth';
import { SECURITY_HEADERS, CSP_HEADER, isMaliciousPath, isMaliciousBot } from './lib/security';
import { checkRateLimit, getRateLimitHeaders } from './lib/rate-limit';
import { validateOrigin, isMutatingMethod } from './lib/csrf';

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
             request.headers.get('x-real-ip') ||
             '127.0.0.1';

  const userAgent = request.headers.get('user-agent') || '';
  if (isMaliciousBot(userAgent)) {
    return new NextResponse(null, { status: 403 });
  }

  const pathname = request.nextUrl.pathname;
  if (isMaliciousPath(pathname)) {
    return new NextResponse(null, { status: 403 });
  }

  // Path traversal blocking check (already partially handled by isMaliciousPath, but adding explicit check if requested)
  if (pathname.includes('../') || pathname.includes('..%2f')) {
    return new NextResponse(null, { status: 403 });
  }

  // Request body size check
  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > 1048576) {
    return NextResponse.json({ error: 'Payload Too Large' }, { status: 413 });
  }

  // Apply Security Headers
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  response.headers.set('Content-Security-Policy', CSP_HEADER);

  if (pathname.startsWith('/api')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  }

  // CSRF validation for mutating API requests
  if (pathname.startsWith('/api') && isMutatingMethod(request.method)) {
    const allowedOrigins = [
      'http://localhost:3000',
      'https://localhost:3000',
      process.env.NEXT_PUBLIC_SITE_URL || '',
    ].filter(Boolean);
    
    // Also allow Vercel preview/production URLs dynamically
    const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
    const vercelProjectUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '';
    if (vercelUrl) allowedOrigins.push(vercelUrl);
    if (vercelProjectUrl) allowedOrigins.push(vercelProjectUrl);

    // Also allow same-origin requests (origin matches the request host)
    const requestOrigin = `${request.nextUrl.protocol}//${request.nextUrl.host}`;
    if (requestOrigin) allowedOrigins.push(requestOrigin);

    if (!validateOrigin(request, allowedOrigins)) {
      return NextResponse.json({ error: 'Invalid Origin' }, { status: 403 });
    }
  }

  // Rate Limiting
  let rateLimitType: 'API' | 'LOGIN' | 'ADMIN_PAGE' | 'FORGOT_PASSWORD' | 'CONTACT_FORM' | null = null;
  if (pathname === '/api/auth/login') {
    rateLimitType = 'LOGIN';
  } else if (pathname === '/api/auth/forgot-password') {
    rateLimitType = 'FORGOT_PASSWORD';
  } else if (pathname === '/api/contact' || pathname.startsWith('/api/leads')) { // Assuming contact form creates lead
    rateLimitType = 'CONTACT_FORM';
  } else if (pathname.startsWith('/api')) {
    rateLimitType = 'API';
  } else if (pathname.startsWith('/admin')) {
    rateLimitType = 'ADMIN_PAGE';
  }

  if (rateLimitType) {
    const limitInfo = checkRateLimit(ip, rateLimitType);
    const limitHeaders = getRateLimitHeaders(limitInfo);
    
    Object.entries(limitHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    if (!limitInfo.success) {
      if (pathname.startsWith('/api')) {
        return NextResponse.json(
          { error: 'Too many requests' },
          { status: 429, headers: limitHeaders }
        );
      } else {
        return new NextResponse('Too many requests', { status: 429, headers: limitHeaders });
      }
    }
  }

  // Auth check for /admin and /api/admin paths
  const isAdminPath = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login') && !pathname.startsWith('/admin/forgot-password') && !pathname.startsWith('/admin/reset-password');
  const isAdminApi = pathname.startsWith('/api/admin');

  if (isAdminPath || isAdminApi) {
    const token = request.cookies.get('access_token')?.value;
    
    if (!token) {
      return isAdminApi 
        ? NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        : NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const payload = await verifyAccessToken(token);
    if (!payload) {
      return isAdminApi 
        ? NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        : NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
