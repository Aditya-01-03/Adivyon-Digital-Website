'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';

const pillars = [
  {
    step: '01',
    title: 'Discovery & Market Intelligence',
    description:
      'We assess your operating landscape, analyze customer behavior, and define a clear roadmap aligned with measurable business objectives.',
  },
  {
    step: '02',
    title: 'Architecture & Craft',
    description:
      'From custom web engineering to documentary cinematography and packaging, we design and build systems built for reliability and trust.',
  },
  {
    step: '03',
    title: 'Go-to-Market Deployment',
    description:
      'We launch integrated campaigns, establish search and social infrastructure, and ensure your message reaches decision-makers and buyers.',
  },
  {
    step: '04',
    title: 'Optimization & Compounding Scale',
    description:
      'Continuous performance tuning, operational automations, and channel expansion to sustain growth over quarters and years.',
  },
];

export function GrowthEcosystem() {
  return (
    <section className="section-padding bg-[#FAFAF8] border-b border-border">
      <div className="container-main">
        <SectionHeading
          badge="Methodology"
          title="The Growth Ecosystem"
          description="A disciplined, end-to-end framework uniting technology, storytelling, and market strategy."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <Card
              key={pillar.step}
              className="p-8 bg-white border border-[#E5E7EB] rounded-xl flex flex-col justify-between hover:border-primary/40 transition-colors"
            >
              <div>
                <span className="font-mono text-sm font-bold text-primary mb-6 block">
                  {pillar.step}
                </span>
                <h3 className="font-heading text-lg font-bold text-heading mb-3">
                  {pillar.title}
                </h3>
                <p className="text-body text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GrowthEcosystem;
