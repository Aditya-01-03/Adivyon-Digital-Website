'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ImpactStory } from '@/lib/impact-stories-data';

interface ProjectCardProps {
  story: ImpactStory;
  index: number;
}

export function ProjectCard({ story, index }: ProjectCardProps) {
  const isEven = index % 2 === 1;

  return (
    <article className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-shadow">
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 items-stretch ${
          isEven ? 'lg:grid-flow-dense' : ''
        }`}
      >
        {/* Visual / Image Column - Responsive height */}
        <div
          className={`relative h-56 sm:h-72 lg:h-auto min-h-[220px] lg:col-span-5 overflow-hidden bg-gray-100 ${
            isEven ? 'lg:col-start-8' : ''
          }`}
        >
          <Image
            src={story.heroImage}
            alt={story.heroImageAlt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
        </div>

        {/* Editorial Content Column - 100% visible, high-contrast text */}
        <div
          className={`p-6 sm:p-8 lg:p-10 lg:col-span-7 flex flex-col justify-between ${
            isEven ? 'lg:col-start-1' : ''
          }`}
        >
          <div>
            {/* Header row: Number + Category */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="font-heading text-2xl sm:text-3xl font-black text-gray-400">
                {story.number}
              </span>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-[#1E6F43] border border-emerald-200 text-xs font-semibold">
                {story.category}
              </span>
            </div>

            {/* Client Logo / Identity */}
            <div className="h-12 flex items-center mb-4">
              {story.logoSrc ? (
                <div className="relative h-10 w-40">
                  <Image
                    src={story.logoSrc}
                    alt={story.logoAlt}
                    fill
                    className="object-contain object-left"
                  />
                </div>
              ) : (
                <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                  <span className="font-heading font-bold text-lg text-[#1E6F43]">
                    {story.title}
                  </span>
                </div>
              )}
            </div>

            {/* Headline - Deep high-contrast charcoal text */}
            <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold !text-gray-900 text-gray-900 leading-snug mb-3">
              {story.headline}
            </h3>

            {/* Short Description - High contrast dark gray */}
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
              {story.shortDescription}
            </p>
          </div>

          {/* Bottom Row / CTA */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs font-bold text-[#1E6F43] uppercase tracking-wider">
              {story.title}
            </span>
            <Link
              href={`/impact-stories/${story.slug}`}
              className="inline-flex items-center gap-1.5 font-heading font-bold text-[#1E6F43] hover:text-[#0F3D2E] text-sm sm:text-base"
            >
              <span>Explore Story</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
