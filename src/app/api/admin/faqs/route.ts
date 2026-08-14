import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { faqSchema } from '@/lib/validate';
import { requireAdminAuth } from '@/lib/require-auth';

export async function GET(request: Request) {
  const auth = await requireAdminAuth(request);
  if (auth instanceof NextResponse) return auth;
  try {
    const faqs = await prisma.fAQ.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(faqs);
  } catch (error) {
    console.error('FAQs GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAdminAuth(request);
  if (auth instanceof NextResponse) return auth;
  try {
    const body = await request.json();
    const parsed = faqSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error }, { status: 400 });
    }

    const faq = await prisma.fAQ.create({ data: parsed.data });
    
    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    console.error('FAQs POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
