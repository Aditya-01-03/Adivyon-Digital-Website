import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';

export function CoreValues() {
  const values = [
    { title: 'Innovation', desc: 'We push boundaries and embrace emerging technologies to deliver forward-thinking solutions.' },
    { title: 'Integrity', desc: 'Transparent communication and honest partnerships form the foundation of every client relationship.' },
    { title: 'Excellence', desc: 'Every pixel, every line of code, every strategy is held to the highest standard of quality.' },
    { title: 'Collaboration', desc: 'We work as an extension of your team, aligning our expertise with your vision and goals.' }
  ];
  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <SectionHeading title="Core Values" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {values.map(val => (
            <Card key={val.title} className="text-center overflow-hidden">
              <h4 className="font-bold break-words mb-2">{val.title}</h4>
              <p className="text-sm text-body">{val.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
