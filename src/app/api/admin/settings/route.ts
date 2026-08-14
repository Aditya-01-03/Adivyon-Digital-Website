import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { siteSettingsSchema } from '@/lib/validate';
import { z } from 'zod';
import { requireAdminAuth } from '@/lib/require-auth';

const settingsArraySchema = z.array(siteSettingsSchema);

export async function GET(request: Request) {
  const auth = await requireAdminAuth(request);
  if (auth instanceof NextResponse) return auth;
  try {
    const settings = await prisma.siteSetting.findMany();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Settings GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const auth = await requireAdminAuth(request);
  if (auth instanceof NextResponse) return auth;
  try {
    const body = await request.json();
    const parsed = settingsArraySchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error }, { status: 400 });
    }

    const results = await prisma.$transaction(
      parsed.data.map(setting => 
        prisma.siteSetting.upsert({
          where: { key: setting.key },
          update: { value: setting.value },
          create: { key: setting.key, value: setting.value }
        })
      )
    );
    
    return NextResponse.json(results);
  } catch (error) {
    console.error('Settings PUT error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
