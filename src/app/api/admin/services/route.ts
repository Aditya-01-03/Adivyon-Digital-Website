import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { serviceSchema } from '@/lib/validate';
import { requireAdminAuth } from '@/lib/require-auth';

export async function GET(request: Request) {
  const auth = await requireAdminAuth(request);
  if (auth instanceof NextResponse) return auth;
  try {
    const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(services);
  } catch (error) {
    console.error('Services GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAdminAuth(request);
  if (auth instanceof NextResponse) return auth;
  try {
    const body = await request.json();
    const parsed = serviceSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error }, { status: 400 });
    }

    const service = await prisma.service.create({ data: parsed.data });
    
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error('Services POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
