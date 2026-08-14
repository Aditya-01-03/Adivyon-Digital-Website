import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Adivyon Digital',
  description: 'Learn about Adivyon Digital — a team of strategists, developers, and creatives building digital solutions that drive measurable business growth from Bhopal, India.',
};
import { AboutHero } from '@/components/about/AboutHero';
import { OurStory } from '@/components/about/OurStory';
import { MissionVision } from '@/components/about/MissionVision';
import { CoreValues } from '@/components/about/CoreValues';
import { TeamGrid } from '@/components/about/TeamGrid';
import { CTASection } from '@/components/home/CTASection';

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <MissionVision />
      <CoreValues />
      <TeamGrid />
      <CTASection />
    </>
  );
}
