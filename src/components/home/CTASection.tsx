'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

export function CTASection() {
  return (
    <section className="py-24 bg-[#0F3D2E] text-white text-center border-t border-white/10">
      <div className="container-main max-w-3xl">
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#86EFAC] block mb-3">
          Initiate a Partnership
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4 !text-white text-white">
          Ready to build something meaningful?
        </h2>
        <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
          Tell us about your organization, your goals, and where you want to take your digital presence.
        </p>
        <Button
          size="lg"
          href="/contact"
          className="bg-white text-dark-green hover:bg-white/95 font-semibold px-8 py-3.5 shadow-md"
        >
          <span>Start a Conversation &rarr;</span>
        </Button>
      </div>
    </section>
  );
}

export default CTASection;
