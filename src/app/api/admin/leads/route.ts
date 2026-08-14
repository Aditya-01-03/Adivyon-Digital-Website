import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminAuth } from '@/lib/require-auth';

export async function GET(request: Request) {
  const auth = await requireAdminAuth(request);
  if (auth instanceof NextResponse) return auth;
  try {
    const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(leads);
  } catch (error) {
    console.error('Leads GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
