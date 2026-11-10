import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SERVICES_DATA, getServiceBySlug } from '@/lib/services-data';
import { CTASection } from '@/components/home/CTASection';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.title} | Strategic Services — Adivyon Digital`,
    description: service.metaDescription,
    openGraph: {
      title: `${service.title} | Adivyon Digital`,
      description: service.metaDescription,
      url: `https://adivyondigital.com/services/${service.slug}`,
      siteName: 'Adivyon Digital',
      type: 'website',
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen text-gray-900">
      {/* Top Breadcrumb & Hero */}
      <section className="bg-gray-50 py-12 sm:py-20 border-b border-gray-200">
        <div className="container-main max-w-5xl px-4 sm:px-6">
          {/* Breadcrumb / Back link */}
          <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1E6F43] hover:underline transition-colors"
            >
              <svg className="w-4 h-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span>Back to All Capabilities</span>
            </Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-[#1E6F43] border border-emerald-200 text-xs font-semibold uppercase tracking-wider">
                {service.title}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black font-heading text-gray-900 leading-[1.15] tracking-tight">
                {service.headline}
              </h1>
              <p className="text-base sm:text-xl text-gray-700 leading-relaxed font-normal pt-1">
                {service.body}
              </p>
            </div>

            {/* Structured Practice Card (No cartoon illustrations) */}
            <div className="lg:col-span-4 w-full">
              <div className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Practice Profile
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1E6F43]" />
                </div>

                <div className="space-y-3.5 text-sm">
                  <div>
                    <span className="text-xs text-gray-500 block font-medium">Deliverables</span>
                    <span className="font-bold text-gray-900">{service.included.length} Core Deliverables</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block font-medium">Delivery Model</span>
                    <span className="font-bold text-gray-900">Direct In-House Execution</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block font-medium">Primary Goal</span>
                    <span className="font-bold text-gray-900">Verifiable Commercial Impact</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="block w-full py-3 px-4 text-center rounded-xl bg-[#1E6F43] hover:bg-[#0F3D2E] text-white font-bold text-sm transition-colors shadow-xs"
                  >
                    Consult on {service.title} &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables / What's Included */}
      <section className="py-14 sm:py-20 bg-white border-b border-gray-200">
        <div className="container-main max-w-5xl px-4 sm:px-6">
          <div className="mb-10 sm:mb-12">
            <span className="text-xs font-bold text-[#1E6F43] uppercase tracking-wider block mb-2">
              Deliverables
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-heading text-gray-900 tracking-tight">
              What We Deliver
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {service.included.map((item, index) => {
              const num = (index + 1).toString().padStart(2, '0');
              return (
                <div
                  key={index}
                  className="p-6 bg-gray-50 border border-gray-200 rounded-xl flex items-start gap-4 hover:border-[#1E6F43] transition-colors"
                >
                  <span className="font-mono text-xs font-bold text-[#1E6F43] px-2 py-1 rounded bg-emerald-50 border border-emerald-200 shrink-0 mt-0.5">
                    {num}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-bold font-heading text-gray-900">
                      {item}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-14 sm:py-20 bg-gray-50 border-b border-gray-200">
        <div className="container-main max-w-5xl px-4 sm:px-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6">
              <div className="w-12 h-12 rounded-xl bg-[#0F3D2E] text-white flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-gray-900">
                  Ideal Collaboration Fit
                </h2>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
                  {service.whoItsFor}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contextual Link to Real-World Impact Stories */}
      <section className="py-12 sm:py-16 bg-white border-b border-gray-200">
        <div className="container-main max-w-5xl px-4 sm:px-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0F3D2E] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-300">
                Real-World Applications
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading !text-white text-white">
                See these capabilities delivered on the ground.
              </h3>
              <p className="text-sm text-gray-200 leading-relaxed">
                Explore how we combined engineering, documentary storytelling, and brand systems for agricultural enterprises and grassroots organizations across India.
              </p>
            </div>
            <Link
              href="/impact-stories"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#0F3D2E] hover:bg-gray-100 font-bold text-sm shrink-0 transition-colors shadow-sm"
            >
              <span>Explore Impact Stories</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
