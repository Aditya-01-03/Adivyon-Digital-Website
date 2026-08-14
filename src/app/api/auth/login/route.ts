import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword } from '@/lib/hash';
import { signAccessToken, signRefreshToken } from '@/lib/auth';
import { loginSchema } from '@/lib/validate';

export async function POST(request: Request) {
  const start = Date.now();
  
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               request.headers.get('x-real-ip') || 
               '127.0.0.1';
               
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    
    if (!parsed.success) {
      console.warn(`Failed login attempt (invalid schema) from IP: ${ip}`);
      return delayResponse(NextResponse.json({ error: 'Invalid credentials' }, { status: 401 }), start);
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Still verify a dummy password to prevent timing attacks
      await verifyPassword(password, 'dummy:hash');
      console.warn(`Failed login attempt (user not found) from IP: ${ip}`);
      return delayResponse(NextResponse.json({ error: 'Invalid credentials' }, { status: 401 }), start);
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      console.warn(`Failed login attempt (wrong password) from IP: ${ip}`);
      return delayResponse(NextResponse.json({ error: 'Invalid credentials' }, { status: 401 }), start);
    }

    const accessToken = await signAccessToken({ userId: user.id, role: user.role });
    const refreshToken = await signRefreshToken(user.id);

    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: 'access_token',
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 10 * 60, // 10 minutes
      path: '/',
    });

    response.cookies.set({
      name: 'refresh_token',
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return delayResponse(response, start);
  } catch (error) {
    console.error('Login error:', error);
    return delayResponse(NextResponse.json({ error: 'Invalid credentials' }, { status: 401 }), start);
  }
}

async function delayResponse(res: NextResponse, startTime: number): Promise<NextResponse> {
  const elapsed = Date.now() - startTime;
  const MIN_DELAY = 200;
  if (elapsed < MIN_DELAY) {
    await new Promise(resolve => setTimeout(resolve, MIN_DELAY - elapsed));
  }
  return res;
}
