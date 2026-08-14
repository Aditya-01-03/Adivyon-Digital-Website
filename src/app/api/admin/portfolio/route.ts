import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { requireAdminAuth } from '@/lib/require-auth';

const projectSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  category: z.string().default('General'),
  industry: z.string().default('General'),
  challenge: z.string().default(''),
  solution: z.string().default(''),
  result: z.string().default(''),
  images: z.string().optional(),
  isFeatured: z.boolean().default(false),
  order: z.number().default(0),
});

export async function GET(request: Request) {
  const auth = await requireAdminAuth(request);
  if (auth instanceof NextResponse) return auth;
  try {
    const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Projects GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAdminAuth(request);
  if (auth instanceof NextResponse) return auth;
  try {
    const body = await request.json();
    const parsed = projectSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error }, { status: 400 });
    }

    const project = await prisma.project.create({ data: parsed.data });
    
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Projects POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
