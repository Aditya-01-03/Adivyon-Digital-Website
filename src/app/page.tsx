import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adivyon Digital | Strategic Communications, Technology & Growth',
  description:
    'We partner with ambitious enterprises, agricultural innovators, and grassroots organisations across India to deliver custom web engineering, brand identity, and documentary storytelling.',
  openGraph: {
    title: 'Adivyon Digital | Strategic Communications, Technology & Growth',
    description:
      'Custom web development, documentary storytelling, brand identity & strategic consulting.',
    url: 'https://adivyondigital.com',
  },
};

import { HeroSection } from '@/components/home/HeroSection';
import { TrustStats } from '@/components/home/TrustStats';
import { ClientLogos } from '@/components/home/ClientLogos';
import { GrowthEcosystem } from '@/components/home/GrowthEcosystem';
import { ImpactFeature } from '@/components/home/ImpactFeature';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { WhyAdivyon } from '@/components/home/WhyAdivyon';
import { ProcessTimeline } from '@/components/home/ProcessTimeline';
import { Industries } from '@/components/home/Industries';
import { Testimonials } from '@/components/home/Testimonials';
import { FAQ } from '@/components/home/FAQ';
import { CTASection } from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustStats />
      <ClientLogos />
      <GrowthEcosystem />
      <ImpactFeature />
      <ServicesGrid />
      <WhyAdivyon />
      <ProcessTimeline />
      <Industries />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  );
}
