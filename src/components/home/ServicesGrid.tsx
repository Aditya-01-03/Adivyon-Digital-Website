'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SERVICES as FALLBACK_SERVICES } from '@/lib/constants';

interface ServiceData {
  id?: string;
  slug?: string;
  title: string;
  shortDescription?: string;
  description?: string;
}

interface ServicesGridProps {
  showHeader?: boolean;
}

export function ServicesGrid({ showHeader = true }: ServicesGridProps) {
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
    <section className="section-padding bg-gray-50 border-b border-gray-200">
      <div className="container-main px-4 sm:px-6">
        {showHeader && (
          <SectionHeading
            badge="Capabilities"
            title="Core Capabilities"
            description="Disciplined engineering, cinema-grade storytelling, and measurable commercial execution."
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const slug = service.slug || service.id || 'website-development';
            const desc = service.shortDescription || service.description || '';
            const stepNumber = (index + 1).toString().padStart(2, '0');

            return (
              <Card
                key={service.id || index}
                className="p-7 bg-white border border-gray-200 rounded-xl flex flex-col justify-between hover:border-[#1E6F43] transition-colors shadow-2xs"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#1E6F43] block mb-4">
                    {stepNumber}
                  </span>
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {desc}
                  </p>
                </div>
                <Link
                  href={`/services/${slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E6F43] hover:text-[#0F3D2E] transition-colors mt-auto"
                >
                  <span>Learn more</span>
                  <span>&rarr;</span>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesGrid;
