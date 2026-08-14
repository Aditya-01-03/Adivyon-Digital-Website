'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { INDUSTRIES } from '@/lib/constants';
import { Card } from '@/components/ui/Card';

export function Industries() {
  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <SectionHeading 
          badge="Industries"
          title="Who We Serve"
          description="Tailored digital solutions for various sectors."
        />
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-12">
          {INDUSTRIES.map((industry, i) => {
            let Icon = null;
            if (industry.title.includes('Technology') || industry.title.includes('Tech')) Icon = <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
            else if (industry.title.includes('Healthcare') || industry.title.includes('Health')) Icon = <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
            else if (industry.title.includes('Finance') || industry.title.includes('Fin')) Icon = <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
            else if (industry.title.includes('Retail') || industry.title.includes('Shop')) Icon = <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>;
            else if (industry.title.includes('Education') || industry.title.includes('Learn')) Icon = <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>;
            else if (industry.title.includes('Real') || industry.title.includes('Estate')) Icon = <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
            else Icon = <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;

            return (
              <Card key={i} className="text-center group hover:border-primary transition-colors cursor-default overflow-hidden break-words">
                <div className="flex justify-center mb-4 text-primary/70 group-hover:text-primary transition-colors">
                  {Icon}
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors break-words">{industry.title}</h3>
                <p className="text-sm text-body break-words">{industry.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
