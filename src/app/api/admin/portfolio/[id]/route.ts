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

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminAuth(request);
  if (auth instanceof NextResponse) return auth;
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = projectSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error }, { status: 400 });
    }

    const project = await prisma.project.update({
      where: { id },
      data: parsed.data
    });
    
    return NextResponse.json(project);
  } catch (error) {
    console.error('Project PUT error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminAuth(request);
  if (auth instanceof NextResponse) return auth;
  try {
    const { id } = await params;
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Project DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
