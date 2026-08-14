import React from 'react';
import { ServicesHero } from '@/components/services/ServicesHero';
import { AllServices } from '@/components/services/AllServices';
import { CTASection } from '@/components/home/CTASection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Services & Solutions | Adivyon Digital',
  description: 'Explore our full suite of digital services: Website Development, Digital Marketing, AI Automation, Brand Identity, Content Production, and Business Strategy.',
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <AllServices />
      <CTASection />
    </>
  );
}
