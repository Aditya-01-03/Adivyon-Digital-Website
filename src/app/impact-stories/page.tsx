import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { IMPACT_STORIES } from '@/lib/impact-stories-data';
import { ProjectCard } from '@/components/impact-stories/ProjectCard';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Impact Stories | Beyond Digital. Creating Real-World Impact — Adivyon Digital',
  description:
    'Stories of people, businesses and initiatives moving forward across India’s agricultural and social sectors. Explore our work in impact storytelling, digital transformation, and rural entrepreneurship.',
  alternates: {
    canonical: 'https://adivyondigital.com/impact-stories',
  },
  openGraph: {
    title: 'Impact Stories | Beyond Digital. Creating Real-World Impact — Adivyon Digital',
    description:
      'Stories of people, businesses and initiatives moving forward across India’s agricultural and social sectors.',
    url: 'https://adivyondigital.com/impact-stories',
    siteName: 'Adivyon Digital',
    images: [
      {
        url: '/images/impact-stories/hero.jpg',
        width: 1200,
        height: 675,
        alt: 'Agricultural field documentary — Adivyon Digital Impact Stories',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function ImpactStoriesPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen text-gray-900">
      {/* 1. HERO SECTION - Deep rich forest green background, 100% text readability */}
      <section className="relative min-h-[50vh] sm:min-h-[58vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0B2A1E] via-[#0E3828] to-[#0A2218]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/impact-stories/hero.jpg"
            alt="Agricultural landscape in rural India"
            fill
            priority
            className="object-cover object-center filter brightness-[0.4] opacity-50"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Hero Content - Solid, high-contrast, fully visible on all mobile & desktop screens */}
        <div className="container-main relative z-10 py-16 sm:py-24 px-4 sm:px-6 text-center text-white">
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-5">
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-emerald-300">
              Impact Stories
            </span>

            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl !text-white text-white tracking-tight leading-tight">
              Beyond Digital. Creating Real-World Impact.
            </h1>

            <p className="text-base sm:text-xl text-gray-200 font-medium max-w-2xl mx-auto">
              Stories of people, businesses and initiatives moving forward.
            </p>

            <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed pt-1">
              Every meaningful initiative has a story. We help bring those stories to life through communication, creativity, technology and strategic execution.
            </p>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION - High-contrast text on clean canvas */}
      <section className="py-12 sm:py-20 border-b border-gray-200 bg-white">
        <div className="container-main max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-base sm:text-xl md:text-2xl font-heading text-gray-900 leading-relaxed font-semibold">
            Across India&apos;s agricultural and social sectors, individuals and organisations are working to create meaningful change. We partner with them through storytelling, digital transformation, brand development and strategic execution to help their work reach wider audiences and unlock new opportunities.
          </p>
        </div>
      </section>

      {/* 3. CASE STUDIES LIST - 100% visible on mobile, no layout cuts */}
      <section className="py-12 sm:py-20">
        <div className="container-main max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-gray-900 tracking-tight">
              Collaborations on the Ground
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              Explore our work documenting farmer journeys, establishing digital presence, and incubating rural brands.
            </p>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {IMPACT_STORIES.map((story, index) => (
              <ProjectCard key={story.slug} story={story} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. CLOSING CTA */}
      <section className="bg-[#0F3D2E] text-white py-16 sm:py-20 text-center">
        <div className="container-main max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <blockquote className="font-heading text-xl sm:text-3xl font-semibold italic !text-white text-white leading-snug">
            &ldquo;Every initiative has the potential to create change. Every story deserves to be heard.&rdquo;
          </blockquote>

          <h3 className="text-xl sm:text-2xl font-bold font-heading !text-white text-white">
            Have a Story Worth Telling? Let&apos;s Talk.
          </h3>

          <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-3">
            <Button
              variant="primary"
              size="lg"
              href="/contact"
              className="w-full sm:w-auto bg-white text-[#0F3D2E] hover:bg-gray-100 font-bold px-8"
            >
              Start a Conversation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
