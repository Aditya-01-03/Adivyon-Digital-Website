import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

async function hashToken(token: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ success: true, message: 'If an account exists, a reset link has been sent.' });
    }

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
    if (!user) {
      return NextResponse.json({ success: true, message: 'If an account exists, a reset link has been sent.' });
    }

    const rawToken = crypto.randomUUID();
    const tokenHash = await hashToken(rawToken);
    
    // 1 hour expiry
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
        isUsed: false,
      }
    });



    return NextResponse.json({ success: true, message: 'If an account exists, a reset link has been sent.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ success: true, message: 'If an account exists, a reset link has been sent.' });
  }
}
