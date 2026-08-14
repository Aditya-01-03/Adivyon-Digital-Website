'use client';

import React, { useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PROCESS_STEPS } from '@/lib/constants';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="section-padding bg-white overflow-hidden" ref={containerRef}>
      <div className="container-main">
        <SectionHeading 
          badge="Our Process"
          title="How We Work"
          description="A proven methodology for delivering exceptional results."
        />
        
        <div className="relative max-w-3xl mx-auto mt-16">
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[2px] bg-border md:-translate-x-1/2" />
          <motion.div 
            className="absolute left-[19px] md:left-1/2 top-0 w-[2px] bg-primary md:-translate-x-1/2 origin-top" 
            style={{ height: lineHeight }}
          />
          
          <div className="space-y-12">
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row items-start ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="absolute left-0 md:left-1/2 w-10 h-10 rounded-full bg-white border-4 border-primary flex items-center justify-center md:-translate-x-1/2 font-bold text-primary z-10">
                  {i + 1}
                </div>
                
                <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                  <h3 className="text-2xl font-bold mb-2 break-words">{step.title}</h3>
                  <p className="text-body break-words">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
