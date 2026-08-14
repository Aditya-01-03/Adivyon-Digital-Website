import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SERVICES_DATA, getServiceBySlug } from '@/lib/services-data';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CTASection } from '@/components/home/CTASection';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import WebDevIllustration from '@/components/illustrations/WebDevIllustration';
import MarketingIllustration from '@/components/illustrations/MarketingIllustration';
import AIIllustration from '@/components/illustrations/AIIllustration';
import BrandingIllustration from '@/components/illustrations/BrandingIllustration';
import ContentIllustration from '@/components/illustrations/ContentIllustration';
import StrategyIllustration from '@/components/illustrations/StrategyIllustration';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://adivyon.com/services/${service.slug}`,
      siteName: 'Adivyon Digital',
      type: 'website',
    },
  };
}

const getIllustration = (slug: string) => {
  switch (slug) {
    case 'website-development': return <WebDevIllustration />;
    case 'digital-marketing': return <MarketingIllustration />;
    case 'ai-automation': return <AIIllustration />;
    case 'brand-identity': return <BrandingIllustration />;
    case 'content-production': return <ContentIllustration />;
    case 'business-strategy': return <StrategyIllustration />;
    default: return null;
  }
};

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Top Breadcrumb & Hero */}
      <section className="bg-surface py-12 md:py-20 border-b border-border">
        <div className="container-main max-w-5xl">
          {/* Breadcrumb / Back link */}
          <div className="mb-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors"
            >
              <svg className="w-4 h-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Back to Services
            </Link>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <Badge variant="outline" className="mb-4 text-primary border-primary bg-primary/5">
                {service.title}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-heading leading-tight break-words">
                {service.headline}
              </h1>
              <p className="text-lg md:text-xl text-body break-words leading-relaxed">
                {service.body}
              </p>
            </div>

            <div className="md:col-span-4 flex justify-center">
              <div className="w-48 h-48 md:w-56 md:h-56 p-6 rounded-2xl bg-accent-light border border-accent/20 flex items-center justify-center shadow-sm">
                {getIllustration(service.slug)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section-padding bg-white">
        <div className="container-main max-w-5xl">
          <ScrollReveal direction="up">
            <div className="mb-10">
              <Badge variant="outline" className="mb-3 text-primary border-primary bg-primary/5">
                Deliverables
              </Badge>
              <h2 className="text-3xl font-bold text-heading break-words">What's Included</h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {service.included.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1} direction="up">
                <Card className="h-full p-6 flex items-start gap-4 hover:border-primary/50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-heading break-words">{item}</h3>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="section-padding bg-surface border-t border-border">
        <div className="container-main max-w-5xl">
          <ScrollReveal direction="up">
            <Card padding="lg" className="bg-white border-l-4 border-l-primary shadow-sm">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-12 h-12 rounded-xl bg-dark-green text-white flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-heading mb-3 break-words">Who This Is For</h2>
                  <p className="text-lg text-body break-words leading-relaxed">
                    {service.whoItsFor}
                  </p>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
