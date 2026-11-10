'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IMPACT_STORIES } from '@/lib/impact-stories-data';

export function ClientLogos() {
  return (
    <section className="py-12 sm:py-16 bg-gray-50 border-b border-gray-200">
      <div className="container-main px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-gray-900">
            Organisations and Businesses We&apos;ve Worked With
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Agricultural enterprises, farmer-led brands, and rural initiatives.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch justify-center">
          {IMPACT_STORIES.map((story) => (
            <Link
              key={story.slug}
              href={`/impact-stories/${story.slug}`}
              className="group flex flex-col items-center justify-center p-4 sm:p-6 bg-white rounded-xl border border-gray-200 hover:border-[#1E6F43] transition-colors min-h-[120px] text-center"
            >
              <div className="h-12 w-full flex items-center justify-center relative">
                {story.logoSrc ? (
                  <div className="relative h-10 w-full max-w-[150px]">
                    <Image
                      src={story.logoSrc}
                      alt={story.logoAlt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 120px, 150px"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                    <span className="font-heading font-bold text-base sm:text-lg text-[#1E6F43]">
                      {story.title}
                    </span>
                  </div>
                )}
              </div>
              <span className="text-xs font-semibold text-gray-500 group-hover:text-[#1E6F43] transition-colors mt-2">
                Case Study &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClientLogos;
