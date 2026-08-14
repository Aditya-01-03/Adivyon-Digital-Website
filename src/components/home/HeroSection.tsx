'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { TextFlip } from '@/components/ui/TextFlip';
import { ANIMATED_WORDS } from '@/lib/constants';
import HeroIllustration from '@/components/illustrations/HeroIllustration';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-surface py-20 lg:py-32">
      <div className="container-main grid lg:grid-cols-2 gap-12 items-center">
        <div className="z-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Empowering Your Digital Journey
          </div>
          <h1 className="text-clamp-hero font-bold leading-tight tracking-tight mb-6 animate-fade-in-up break-words text-4xl md:text-5xl lg:text-6xl" style={{ animationDelay: '0.2s' }}>
            Build your digital <br className="hidden sm:block" />
            presence for <TextFlip words={ANIMATED_WORDS} />
          </h1>
          <p className="text-lg md:text-xl text-body mb-8 max-w-lg animate-fade-in-up break-words" style={{ animationDelay: '0.3s' }}>
            We partner with ambitious brands to create digital ecosystems that drive growth, engagement, and lasting impact.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button size="lg" href="/contact">
              Start Your Project
            </Button>
            <Button size="lg" variant="secondary" href="/portfolio">
              View Our Work
            </Button>
          </div>
          
          <div className="mt-12 flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-body font-medium animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <svg className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Data-Driven
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <svg className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Results-Focused
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <svg className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Innovation-Led
            </div>
          </div>
        </div>
        <div className="relative h-[400px] lg:h-[500px] overflow-hidden rounded-[32px]">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
