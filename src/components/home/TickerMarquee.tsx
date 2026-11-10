'use client';

import React from 'react';

const ITEMS = [
  'Full-Stack Web Architecture',
  'Documentary Video Production',
  'Agricultural Growth & Branding',
  'AI-Powered Business Automations',
  'Field-Level Storytelling',
  'Performance Marketing',
  'Consumer Product Packaging',
  'Rural Enterprise Transformation',
];

export function TickerMarquee() {
  return (
    <div className="relative w-full overflow-hidden bg-[#0F3D2E] text-white py-4 sm:py-5 border-y border-[#1E6F43]/30">
      {/* Side gradient masks for smooth fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#0F3D2E] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#0F3D2E] to-transparent z-10" />

      <div className="flex w-max animate-marquee">
        {/* Render twice for continuous infinite loop */}
        {[...ITEMS, ...ITEMS].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-6 px-6 sm:px-8 whitespace-nowrap"
          >
            <span className="font-heading text-xs sm:text-sm font-bold tracking-widest uppercase text-white/90">
              {item}
            </span>
            <span className="w-2 h-2 rounded-full bg-[#86EFAC] shrink-0 opacity-80" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TickerMarquee;
