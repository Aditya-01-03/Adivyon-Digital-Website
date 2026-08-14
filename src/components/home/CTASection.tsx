'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-dark-green via-primary to-dark-green text-white text-center overflow-hidden">
      <div className="container-main max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 break-words">Ready to scale your business?</h2>
        <p className="text-xl text-white/80 mb-10 break-words">
          Let's discuss how we can help you achieve your digital goals.
        </p>
        <Button size="lg" variant="primary" href="/contact" className="bg-primary hover:bg-primary/90 text-white border border-white/20 group">
          <span className="flex items-center gap-2">
            Book a Free Consultation 
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </span>
        </Button>
      </div>
    </section>
  );
}
