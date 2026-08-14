'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Card } from '@/components/ui/Card';

const pillars = [
  {
    id: 1,
    title: 'Strategy',
    description: 'We analyze your market, audience, and goals to create a winning plan.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
    ),
  },
  {
    id: 2,
    title: 'Build',
    description: 'Custom solutions crafted for your unique needs with modern technologies.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
    ),
  },
  {
    id: 3,
    title: 'Launch',
    description: 'Strategic deployment and go-to-market execution for maximum impact.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    ),
  },
  {
    id: 4,
    title: 'Grow',
    description: 'Continuous optimization, marketing, and scaling to drive ROI.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
    ),
  }
];

export function GrowthEcosystem() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container-main">
        <SectionHeading 
          badge="Our Approach"
          title="The Growth Ecosystem"
          description="We don't just build websites; we create interconnected digital ecosystems designed to scale your business sustainably."
        />
        
        <div className="mt-16 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-24 left-0 w-full h-0.5 bg-border -z-10" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, index) => (
              <ScrollReveal key={pillar.id} delay={index * 0.1}>
                <div className="relative group">
                  <div className="w-16 h-16 mx-auto bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {pillar.icon}
                  </div>
                  <Card padding="lg" hoverable className="h-full text-center group-hover:border-primary/20">
                    <div className="absolute top-0 right-0 p-4 text-8xl font-black text-surface opacity-50 select-none -z-10 pointer-events-none transition-all group-hover:-translate-y-4 group-hover:text-primary/5">
                      {pillar.id}
                    </div>
                    <h3 className="text-xl font-bold mb-3 break-words">{pillar.title}</h3>
                    <p className="text-body break-words line-clamp-3">{pillar.description}</p>
                  </Card>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
