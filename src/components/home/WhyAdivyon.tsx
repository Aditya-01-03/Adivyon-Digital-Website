'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Card } from '@/components/ui/Card';

const REASONS = [
  { title: 'Data-Driven approach', description: 'We base our strategies on hard data, not just intuition.' },
  { title: 'Industry Experts', description: 'Our team consists of seasoned professionals in their respective fields.' },
  { title: 'Transparent Reporting', description: 'Clear, concise reports so you always know how your campaigns are performing.' },
  { title: 'Agile Methodology', description: 'We adapt quickly to market changes and new opportunities.' },
  { title: 'Holistic View', description: 'We consider your entire business ecosystem, not just isolated metrics.' },
  { title: 'Client-Centric', description: 'Your success is our primary metric of achievement.' }
];

export function WhyAdivyon() {
  return (
    <section className="section-padding bg-dark-green text-white">
      <div className="container-main">
        <SectionHeading 
          badge="Why Choose Us"
          title="The Adivyon Advantage"
          description="We combine technical expertise with strategic thinking."
          className="text-white"
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {REASONS.map((reason, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 text-white overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-6 text-6xl font-black text-white/5 select-none -z-10 group-hover:text-primary/20 transition-colors pointer-events-none">
                  {(i + 1).toString().padStart(2, '0')}
                </div>
                <h3 className="text-xl font-bold mb-3 break-words">{reason.title}</h3>
                <p className="text-white/70 break-words">{reason.description}</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
