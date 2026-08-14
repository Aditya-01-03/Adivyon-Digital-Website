import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adivyon Digital | Digital Growth Partner for Ambitious Businesses',
  description: 'We help businesses grow with custom web development, digital marketing, AI automation, brand identity, content production, and strategic consulting. Based in Bhopal, serving globally.',
  openGraph: {
    title: 'Adivyon Digital | Digital Growth Partner',
    description: 'Custom web development, digital marketing, AI automation & strategic consulting.',
    url: 'https://adivyondigital.com',
  },
};
import { HeroSection } from '@/components/home/HeroSection';
import { TrustStats } from '@/components/home/TrustStats';
import { GrowthEcosystem } from '@/components/home/GrowthEcosystem';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { WhyAdivyon } from '@/components/home/WhyAdivyon';
import { ProcessTimeline } from '@/components/home/ProcessTimeline';
import { FeaturedWork } from '@/components/home/FeaturedWork';
import { Industries } from '@/components/home/Industries';
import { Testimonials } from '@/components/home/Testimonials';
import { FAQ } from '@/components/home/FAQ';
import { CTASection } from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustStats />
      <GrowthEcosystem />
      <ServicesGrid />
      <WhyAdivyon />
      <ProcessTimeline />
      <FeaturedWork />
      <Industries />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  );
}
