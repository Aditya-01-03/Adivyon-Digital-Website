import React from 'react';
import { Card } from '@/components/ui/Card';

export function MissionVision() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-main grid md:grid-cols-2 gap-8">
        <Card className="overflow-hidden">
          <h3 className="text-2xl font-bold mb-4 break-words">Our Mission</h3>
          <p className="text-body break-words">To empower businesses with digital solutions that drive real growth.</p>
        </Card>
        <Card className="overflow-hidden">
          <h3 className="text-2xl font-bold mb-4 break-words">Our Vision</h3>
          <p className="text-body break-words">To be the global leader in digital innovation and strategy.</p>
        </Card>
      </div>
    </section>
  );
}
