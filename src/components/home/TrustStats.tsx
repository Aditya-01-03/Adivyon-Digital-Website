'use client';

import React from 'react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { STATS } from '@/lib/constants';

export function TrustStats() {
  return (
    <section className="py-12 bg-white border-y border-border">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                <AnimatedCounter end={stat.value} suffix="+" />
              </div>
              <div className="text-sm md:text-base font-medium text-heading">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
