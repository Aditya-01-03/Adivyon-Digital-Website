import { NextResponse } from 'next/server';
import { verifyRefreshToken, signAccessToken, signRefreshToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const cookies = request.headers.get('cookie') || '';
    const tokenMatch = cookies.match(/refresh_token=([^;]+)/);
    
    if (!tokenMatch) {
      return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
    }
    
    const refreshToken = tokenMatch[1];
    
    const payload = await verifyRefreshToken(refreshToken);
    
    if (!payload || !payload.userId) {
      return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: payload.userId as string }
    });
    if (!user) {
      return NextResponse.json({ error: 'User no longer exists' }, { status: 401 });
    }
    
    const newAccessToken = await signAccessToken({ sub: user.id, userId: user.id, role: user.role });
    const newRefreshToken = await signRefreshToken(user.id);
    
    const response = NextResponse.json({ success: true });
    
    response.cookies.set({
      name: 'access_token',
      value: newAccessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60,
      path: '/',
    });
    
    response.cookies.set({
      name: 'refresh_token',
      value: newRefreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });
    
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
