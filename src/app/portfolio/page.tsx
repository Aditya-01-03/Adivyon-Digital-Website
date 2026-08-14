import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Work & Case Studies | Adivyon Digital',
  description: 'Explore our portfolio of successful projects — from enterprise platforms to brand transformations. See the measurable results we deliver for our clients.',
};
import { PortfolioHero } from '@/components/portfolio/PortfolioHero';
import { AllProjects } from '@/components/portfolio/AllProjects';
import { ProjectResults } from '@/components/portfolio/ProjectResults';
import { CTASection } from '@/components/home/CTASection';

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <AllProjects />
      <ProjectResults />
      <CTASection />
    </>
  );
}
