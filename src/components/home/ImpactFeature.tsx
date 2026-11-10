'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export function ImpactFeature() {
  return (
    <section className="py-16 sm:py-24 bg-[#0F3D2E] text-white">
      <div className="container-main px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Direct, human copy with 100% readable text */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading !text-white text-white leading-tight">
              Beyond Digital. Creating Real-World Impact.
            </h2>

            <p className="text-gray-100 text-base sm:text-lg leading-relaxed font-normal">
              Across India&apos;s agricultural and social sectors, individuals and organisations are working to create meaningful change. We partner with them through authentic storytelling, brand development, and strategic execution to help their work reach wider audiences and unlock new opportunities.
            </p>

            {/* Clear milestone list with high-contrast text */}
            <div className="space-y-4 pt-3 border-t border-white/15">
              <div className="pt-2">
                <h4 className="font-bold text-white text-base">
                  Farmer Success Storytelling
                </h4>
                <p className="text-sm text-gray-200 mt-1">
                  Field coverage, cinematography, and farmer documentary videos produced for Krishe Carbon.
                </p>
              </div>

              <div className="pt-2 border-t border-white/10">
                <h4 className="font-bold text-white text-base">
                  Rural Business Growth
                </h4>
                <p className="text-sm text-gray-200 mt-1">
                  Establishing digital identity and online visibility, supporting ~4–5x growth for Shree Ram Nursery.
                </p>
              </div>

              <div className="pt-2 border-t border-white/10">
                <h4 className="font-bold text-white text-base">
                  Farmer-Led Brand Launch
                </h4>
                <p className="text-sm text-gray-200 mt-1">
                  Guiding a smallholder family in value addition, packaging, and brand creation for Garv Masale.
                </p>
              </div>
            </div>

            <div className="pt-3">
              <Button
                size="lg"
                href="/impact-stories"
                className="w-full sm:w-auto bg-white text-[#0F3D2E] hover:bg-gray-100 font-bold"
              >
                Read All Impact Stories &rarr;
              </Button>
            </div>
          </div>

          {/* Right Column: Case study cards with high-contrast, perfectly visible text */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {/* Krishe Carbon Card */}
              <Link
                href="/impact-stories/krishe-carbon"
                className="group block relative rounded-2xl overflow-hidden aspect-[4/5] bg-gray-900 border border-white/15 hover:border-white transition-all shadow-md"
              >
                <Image
                  src="/images/impact-stories/krishe-carbon-hero.jpg"
                  alt="Krishe Carbon farmer storytelling documentary"
                  fill
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02] filter brightness-[0.7]"
                  sizes="(max-width: 768px) 100vw, 35vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white space-y-2">
                  <span className="text-xs font-bold text-white/90 uppercase tracking-wider block">
                    Krishe Carbon
                  </span>
                  <h3 className="font-heading font-bold text-lg sm:text-xl !text-white text-white leading-snug">
                    Documenting farmer success stories through field-level video production.
                  </h3>
                  <span className="text-xs font-semibold text-white underline underline-offset-4 inline-block pt-1">
                    Explore Story &rarr;
                  </span>
                </div>
              </Link>

              {/* Shree Ram Nursery Card */}
              <Link
                href="/impact-stories/shree-ram-nursery"
                className="group block relative rounded-2xl overflow-hidden aspect-[4/5] bg-gray-900 border border-white/15 hover:border-white transition-all shadow-md sm:translate-y-6"
              >
                <Image
                  src="/images/impact-stories/shree-ram-nursery-hero.jpg"
                  alt="Shree Ram High-Tech Nursery growth story"
                  fill
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02] filter brightness-[0.7]"
                  sizes="(max-width: 768px) 100vw, 35vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white space-y-2">
                  <span className="text-xs font-bold text-white/90 uppercase tracking-wider block">
                    Shree Ram High-Tech Nursery
                  </span>
                  <h3 className="font-heading font-bold text-lg sm:text-xl !text-white text-white leading-snug">
                    Helping a small agricultural entrepreneur establish digital reach and ~4–5x growth.
                  </h3>
                  <span className="text-xs font-semibold text-white underline underline-offset-4 inline-block pt-1">
                    Explore Story &rarr;
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImpactFeature;
