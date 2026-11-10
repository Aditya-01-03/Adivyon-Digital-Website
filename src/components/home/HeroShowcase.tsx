'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function HeroShowcase() {
  return (
    <div className="w-full">
      <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 sm:p-5 shadow-xs">
        {/* Simple, clean top bar */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-200 text-xs">
          <span className="font-semibold text-gray-900 uppercase tracking-wider">
            Featured Case Studies
          </span>
          <Link
            href="/impact-stories"
            className="text-[#1E6F43] font-semibold hover:underline"
          >
            All Stories &rarr;
          </Link>
        </div>

        {/* Featured Case 1: Krishe Carbon */}
        <Link
          href="/impact-stories/krishe-carbon"
          className="group block relative rounded-xl overflow-hidden border border-gray-200 hover:border-[#1E6F43] transition-colors"
        >
          <div className="relative h-44 sm:h-48 w-full bg-gray-900">
            <Image
              src="/images/impact-stories/krishe-carbon-hero.jpg"
              alt="Krishe Carbon farmer success story documentary"
              fill
              priority
              className="object-cover filter brightness-[0.7] contrast-[1.05] transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
              <span className="text-xs font-semibold text-white/90 block mb-1">
                Krishe Carbon
              </span>
              <h4 className="font-heading font-bold text-base sm:text-lg !text-white text-white leading-snug">
                Documenting farmer success stories through authentic field-level video production.
              </h4>
            </div>
          </div>
        </Link>

        {/* Dual secondary cards - clean, high-contrast, mobile-first */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          {/* Card A: Shree Ram Nursery */}
          <Link
            href="/impact-stories/shree-ram-nursery"
            className="group block p-3.5 rounded-xl bg-white border border-gray-200 hover:border-[#1E6F43] transition-colors"
          >
            <span className="text-xs font-bold text-[#1E6F43] block mb-1">
              Shree Ram Nursery
            </span>
            <div className="text-sm font-bold font-heading text-gray-900 line-clamp-1">
              ~4–5x Growth
            </div>
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
              Building online visibility from scratch to attract new customers.
            </p>
          </Link>

          {/* Card B: Garv Masale */}
          <Link
            href="/impact-stories/garv-masale"
            className="group block p-3.5 rounded-xl bg-white border border-gray-200 hover:border-[#1E6F43] transition-colors"
          >
            <span className="text-xs font-bold text-[#1E6F43] block mb-1">
              Garv Masale
            </span>
            <div className="text-sm font-bold font-heading text-gray-900 line-clamp-1">
              Farm to Brand
            </div>
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
              Chilli value addition, branding, packaging, and compliance.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroShowcase;
