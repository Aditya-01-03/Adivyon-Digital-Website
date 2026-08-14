import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { requireAdminAuth } from '@/lib/require-auth';

const testimonialSchema = z.object({
  clientName: z.string().min(2),
  company: z.string().default(''),
  designation: z.string().default(''),
  review: z.string().min(5),
  rating: z.number().min(1).max(5).default(5),
  photo: z.string().optional(),
  isPublished: z.boolean().default(true),
  order: z.number().default(0),
});

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminAuth(request);
  if (auth instanceof NextResponse) return auth;
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = testimonialSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: parsed.data
    });
    
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error('Testimonial PUT error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminAuth(request);
  if (auth instanceof NextResponse) return auth;
  try {
    const { id } = await params;
    await prisma.testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Testimonial DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
