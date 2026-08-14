import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function ProjectResults() {
  return (
    <section className="section-padding bg-dark-green text-white">
      <div className="container-main">
        <SectionHeading title="Real Results" className="text-white" />
        <div className="grid md:grid-cols-3 gap-8 mt-12 text-center">
          <div>
            <h4 className="text-4xl font-bold text-accent mb-2 break-words">300%</h4>
            <p className="break-words">Traffic Increase</p>
          </div>
          <div>
            <h4 className="text-4xl font-bold text-accent mb-2 break-words">5x</h4>
            <p className="break-words">Conversion Rate</p>
          </div>
          <div>
            <h4 className="text-4xl font-bold text-accent mb-2 break-words">#1</h4>
            <p className="break-words">Search Ranking</p>
          </div>
        </div>
      </div>
    </section>
  );
}
