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

export async function GET(request: Request) {
  const auth = await requireAdminAuth(request);
  if (auth instanceof NextResponse) return auth;
  try {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Testimonials GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAdminAuth(request);
  if (auth instanceof NextResponse) return auth;
  try {
    const body = await request.json();
    const parsed = testimonialSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.create({ data: parsed.data });
    
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error('Testimonial POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
