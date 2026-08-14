import { NextResponse } from 'next/server';
import { verifyAccessToken } from './auth';

export async function requireAdminAuth(request: Request): Promise<{ authorized: true; userId: string } | NextResponse> {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    const tokenMatch = cookieHeader.match(/access_token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyAccessToken(token);
    const userId = payload.sub || payload.userId;
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return { authorized: true, userId: userId as string };
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
