import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminAuth } from '@/lib/require-auth';

export async function GET(request: Request) {
  const auth = await requireAdminAuth(request);
  if (auth instanceof NextResponse) return auth;
  try {
    const [
      totalServices,
      totalProjects,
      totalLeads,
      unreadLeads,
      totalTestimonials,
      totalFaqs,
      recentLeads
    ] = await Promise.all([
      prisma.service.count(),
      prisma.project.count(),
      prisma.lead.count(),
      prisma.lead.count({ where: { isRead: false } }),
      prisma.testimonial.count(),
      prisma.fAQ.count(),
      prisma.lead.findMany({ take: 5, orderBy: { createdAt: 'desc' } })
    ]);

    return NextResponse.json({
      totalServices,
      totalProjects,
      totalLeads,
      unreadLeads,
      totalTestimonials,
      totalFaqs,
      recentLeads
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
