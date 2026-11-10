'use client';

import React from 'react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { STATS } from '@/lib/constants';

export function TrustStats() {
  const statMeta = [
    {
      label: 'Projects Delivered',
      detail: 'Enterprise applications, digital systems, and video productions.',
    },
    {
      label: 'Client Partnerships',
      detail: 'Agri-enterprises, news media companies, and consumer brands.',
    },
    {
      label: 'Years of Operation',
      detail: 'Field-level execution, strategy, and continuous optimization.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-border">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-border">
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col ${idx > 0 ? 'pt-6 md:pt-0 md:pl-10' : ''}`}
            >
              <div className="text-4xl sm:text-5xl font-bold font-heading text-primary tracking-tight mb-2">
                <AnimatedCounter end={stat.value} suffix="+" />
              </div>
              <div className="text-sm font-semibold uppercase tracking-wider text-heading">
                {statMeta[idx]?.label || stat.label}
              </div>
              <p className="text-xs sm:text-sm text-body mt-1">
                {statMeta[idx]?.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustStats;
