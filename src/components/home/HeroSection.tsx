'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { HeroShowcase } from './HeroShowcase';

export function HeroSection() {
  return (
    <section className="bg-white py-12 sm:py-20 lg:py-24 border-b border-gray-200">
      <div className="container-main px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Natural, human, high-contrast headline & copy */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-gray-900 tracking-tight leading-[1.15]">
              Strategic communication, <br className="hidden sm:inline" />
              custom technology, and <br className="hidden sm:inline" />
              <span className="text-[#1E6F43]">measurable impact.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-xl leading-relaxed font-normal">
              We partner with businesses, agricultural enterprises, and social initiatives across India to build digital platforms, produce authentic documentary videos, and drive real-world growth.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Button size="lg" href="/contact" className="w-full sm:w-auto text-center justify-center">
                Start a Conversation
              </Button>
              <Button size="lg" variant="secondary" href="/impact-stories" className="w-full sm:w-auto text-center justify-center">
                View Impact Stories
              </Button>
            </div>
          </div>

          {/* Right Column: Work Preview (responsive on mobile) */}
          <div className="lg:col-span-5 w-full">
            <HeroShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
