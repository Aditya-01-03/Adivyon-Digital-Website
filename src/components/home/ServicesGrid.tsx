'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SERVICES as FALLBACK_SERVICES } from '@/lib/constants';
import WebDevIllustration from '@/components/illustrations/WebDevIllustration';
import MarketingIllustration from '@/components/illustrations/MarketingIllustration';
import AIIllustration from '@/components/illustrations/AIIllustration';
import BrandingIllustration from '@/components/illustrations/BrandingIllustration';
import ContentIllustration from '@/components/illustrations/ContentIllustration';
import StrategyIllustration from '@/components/illustrations/StrategyIllustration';

interface ServiceData {
  id?: string;
  slug?: string;
  title: string;
  shortDescription?: string;
  description?: string;
  icon?: string;
}

const getIllustration = (slugOrId: string) => {
  switch (slugOrId) {
    case 'website-development': return <WebDevIllustration />;
    case 'digital-marketing': return <MarketingIllustration />;
    case 'ai-automation': return <AIIllustration />;
    case 'brand-identity': return <BrandingIllustration />;
    case 'content-production': return <ContentIllustration />;
    case 'business-strategy': return <StrategyIllustration />;
    default: return <WebDevIllustration />;
  }
};

export function ServicesGrid() {
  const [services, setServices] = useState<ServiceData[]>(FALLBACK_SERVICES);

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        }
      })
      .catch(() => {
        // Fallback to static constants on error
      });
  }, []);

  return (
    <section className="section-padding bg-surface">
      <div className="container-main">
        <SectionHeading 
          badge="Our Services"
          title="Comprehensive Digital Solutions"
          description="Everything you need to grow your business online, under one roof."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const slug = service.slug || service.id || 'website-development';
            const desc = service.shortDescription || service.description || '';

            return (
              <Card key={service.id || index} hoverable className="h-full flex flex-col group overflow-hidden">
                <div className="h-48 bg-accent-light rounded-t-xl mb-6 p-6 flex items-center justify-center overflow-hidden">
                  <div className="w-32 h-32 group-hover:scale-110 transition-transform duration-500">
                    {getIllustration(slug)}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 break-words">{service.title}</h3>
                <p className="text-body mb-6 flex-1 break-words line-clamp-2">{desc}</p>
                <Link href={`/services/${slug}`} className="text-primary font-semibold flex items-center gap-2 group-hover:text-secondary transition-colors mt-auto">
                  Learn more
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
