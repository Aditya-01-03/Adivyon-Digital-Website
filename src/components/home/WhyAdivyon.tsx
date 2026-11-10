'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';

const REASONS = [
  {
    number: '01',
    title: 'Evidence-Based Strategy',
    description:
      'We ground our strategies in verifiable market data and field research, tailoring every decision to real commercial and social dynamics.',
  },
  {
    number: '02',
    title: 'Cross-Disciplinary Execution',
    description:
      'Our capabilities span custom software architecture, cinema-line documentary production, brand identity, and performance marketing.',
  },
  {
    number: '03',
    title: 'Operational Transparency',
    description:
      'Clear timelines, straightforward reporting, and weekly collaboration checkpoints. You have complete visibility into every deliverable.',
  },
  {
    number: '04',
    title: 'End-to-End Ownership',
    description:
      'From pre-production field research to technical deployment and campaign execution, our team manages the entire pipeline in-house.',
  },
  {
    number: '05',
    title: 'Holistic Ecosystem Thinking',
    description:
      'We do not treat branding, technology, and marketing as silos. We integrate them into one cohesive, compounding growth engine.',
  },
  {
    number: '06',
    title: 'Accountability for Results',
    description:
      'We measure our success by tangible milestones: client revenue growth, audience trust, and sustainable operational capacity.',
  },
];

export function WhyAdivyon() {
  return (
    <section className="section-padding bg-[#15231B] text-white">
      <div className="container-main">
        <SectionHeading
          badge="Principles"
          title="The Adivyon Advantage"
          description="Disciplined execution, engineering rigor, and deep storytelling craft."
          className="text-white"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {REASONS.map((reason) => (
            <Card
              key={reason.number}
              className="bg-white/5 border border-white/10 hover:bg-white/10 text-white p-7 rounded-xl flex flex-col justify-between transition-colors"
            >
              <div>
                <span className="font-mono text-xs font-bold text-[#86EFAC] tracking-wider block mb-4">
                  {reason.number}
                </span>
                <h3 className="text-lg font-bold font-heading mb-2 !text-white text-white">
                  {reason.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyAdivyon;
