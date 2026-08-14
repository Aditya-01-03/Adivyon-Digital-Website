import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactFormSchema } from '@/lib/validate';
import { sanitizeObject } from '@/lib/security';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid data', details: parsed.error }, { status: 400 });
    }

    const sanitizedData = sanitizeObject(parsed.data);

    const lead = await prisma.lead.create({
      data: sanitizedData,
    });

    return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 });
  } catch (error) {
    console.error('Lead creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  // Assume auth middleware protects this if accessed under /api/admin/leads, 
  // but if this is public /api/contact we shouldn't return all leads. Let's make GET require admin check or move it to /api/admin/leads.
  // For simplicity, we just check headers if we want to secure it here.
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
