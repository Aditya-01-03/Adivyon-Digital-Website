import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  IMPACT_STORIES,
  getStoryBySlug,
  getRelatedStories,
} from '@/lib/impact-stories-data';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { YouTubeEmbed } from '@/components/impact-stories/YouTubeEmbed';
import { RelatedProjects } from '@/components/impact-stories/RelatedProjects';
import { CaseStudySection } from '@/components/impact-stories/CaseStudySection';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return IMPACT_STORIES.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    return {
      title: 'Story Not Found | Adivyon Digital',
    };
  }

  const title = `${story.title} — ${story.headline} | Impact Stories`;
  const description = story.shortDescription;
  const url = `https://adivyondigital.com/impact-stories/${story.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Adivyon Digital',
      images: [
        {
          url: story.heroImage,
          width: 1200,
          height: 800,
          alt: story.heroImageAlt,
        },
      ],
      type: 'article',
      locale: 'en_IN',
    },
  };
}

export default async function ImpactStoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const relatedStories = getRelatedStories(story.relatedSlugs);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://adivyondigital.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Impact Stories',
            item: 'https://adivyondigital.com/impact-stories',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: story.title,
            item: `https://adivyondigital.com/impact-stories/${story.slug}`,
          },
        ],
      },
      {
        '@type': 'Article',
        headline: story.headline,
        name: `${story.title} Case Study`,
        description: story.shortDescription,
        image: story.heroImage,
        publisher: {
          '@type': 'Organization',
          name: 'Adivyon Digital',
          url: 'https://adivyondigital.com',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://adivyondigital.com/impact-stories/${story.slug}`,
        },
      },
    ],
  };

  return (
    <article className="bg-white min-h-screen text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO - Dark background for 100% text readability on any mobile screen */}
      <header className="relative min-h-[50vh] sm:min-h-[60vh] flex items-end overflow-hidden pb-12 sm:pb-16 bg-gray-950">
        <div className="absolute inset-0 z-0">
          <Image
            src={story.heroImage}
            alt={story.heroImageAlt}
            fill
            priority
            className="object-cover object-center filter brightness-[0.3]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container-main relative z-10 text-white w-full px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6 font-medium"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/impact-stories" className="hover:text-white transition-colors">
              Impact Stories
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">
              {story.title}
            </span>
          </nav>

          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-heading font-black text-lg sm:text-xl text-emerald-300 tracking-wider">
                PROJECT {story.number}
              </span>
              <span className="text-white/40">|</span>
              <Badge className="bg-white/15 text-white border-white/20 text-xs sm:text-sm">
                {story.category}
              </Badge>
            </div>

            <h1 className="font-heading font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl !text-white text-white leading-tight">
              {story.headline}
            </h1>

            {/* Logo / Brand attribution */}
            <div className="pt-2 flex items-center gap-4">
              {story.logoSrc ? (
                <div className="inline-flex items-center px-4 py-2 rounded-xl bg-white/95 backdrop-blur-sm shadow-sm">
                  <div className="relative h-9 w-36">
                    <Image
                      src={story.logoSrc}
                      alt={story.logoAlt}
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                </div>
              ) : (
                <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-white font-heading font-semibold text-base border border-white/20">
                  {story.title}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 2. OVERVIEW */}
      <CaseStudySection
        variant="white"
        title="Context & Collaboration"
      >
        <p className="text-lg sm:text-xl md:text-2xl font-heading font-semibold text-gray-900 leading-relaxed">
          {story.introduction}
        </p>
      </CaseStudySection>

      {/* Client Portrait & Testimonial for Shree Ram Nursery */}
      {story.slug === 'shree-ram-nursery' && (
        <section className="py-12 sm:py-16 bg-white border-b border-gray-200">
          <div className="container-main max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8">
              <div className="md:col-span-5 relative aspect-[4/5] rounded-xl overflow-hidden shadow-sm bg-gray-200">
                <Image
                  src={story.heroImage}
                  alt={story.heroImageAlt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
              <div className="md:col-span-7 space-y-4">
                <span className="text-xs font-bold text-[#1E6F43] uppercase tracking-wider block">
                  Client Perspective &bull; Founder Testimonial
                </span>
                <blockquote className="text-base sm:text-lg text-gray-800 italic leading-relaxed">
                  &ldquo;We had no online presence at all before Adivyon — No logo, no real social media, nothing. They built it from scratch, and now customers actually find us online before they ever visit. If you run a nursery or agri-business and you&apos;re still invisible online, this is exactly the kind of gap they can fix.&rdquo;
                </blockquote>
                <div className="pt-2 border-t border-gray-200">
                  <div className="font-heading font-bold text-gray-900 text-lg">Ritik Mori</div>
                  <div className="text-sm text-gray-600">Founder, Shree Ram High-Tech Nursery</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Brand Identity & Founder Perspective for Kheyti Talks */}
      {story.slug === 'kheyti-talks' && (
        <section className="py-12 sm:py-16 bg-white border-b border-gray-200">
          <div className="container-main max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8">
              <div className="md:col-span-5 relative aspect-[16/10] sm:aspect-square rounded-xl overflow-hidden bg-white border border-gray-200 p-6 flex items-center justify-center shadow-2xs">
                <div className="relative w-full h-28 sm:h-36">
                  <Image
                    src="/images/impact-stories/kheyti-talks-logo.png"
                    alt="Kheyti Talks official brand logo designed by Adivyon Digital"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                </div>
              </div>
              <div className="md:col-span-7 space-y-4">
                <span className="text-xs font-bold text-[#1E6F43] uppercase tracking-wider block">
                  Client Perspective &bull; Brand &amp; Production Partner
                </span>
                <blockquote className="text-base sm:text-lg text-gray-800 italic leading-relaxed">
                  &ldquo;As a news and information company, video and content are our core product — but we didn&apos;t have the branding, online setup, or video production pipeline to produce at the pace or quality we needed. Adivyon built our logo, set up our online presence, and now handles our video production end-to-end. It freed us up to focus on the content itself instead of the production behind it.&rdquo;
                </blockquote>
                <div className="pt-2 border-t border-gray-200">
                  <div className="font-heading font-bold text-gray-900 text-lg">Ankit Kose</div>
                  <div className="text-sm text-gray-600">Founder, Kheyti Talks</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. YOUTUBE VIDEO SECTION */}
      {story.youtubeVideoIds && story.youtubeVideoIds.length > 0 && (
        <section className="py-12 sm:py-20 bg-gray-50 border-b border-gray-200">
          <div className="container-main max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900">
                Farmer Success Story Films
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-xl mx-auto">
                Watch documentary films produced on location by Adivyon Digital for {story.title}.
              </p>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {story.youtubeVideoIds.map((id, index) => (
                <YouTubeEmbed
                  key={id}
                  videoId={id}
                  title={`Field Documentary Chapter 0${index + 1}`}
                  caption={`Field documentary produced on-location with farming communities by Adivyon Digital for ${story.title}.`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. THE CHALLENGE */}
      <CaseStudySection
        variant="cream"
        title="The Challenge"
      >
        <p className="text-gray-800 text-base sm:text-lg leading-relaxed">{story.challenge}</p>
      </CaseStudySection>

      {/* 5. OUR APPROACH */}
      <CaseStudySection
        variant="white"
        title="Our Approach & Strategy"
      >
        <p className="text-gray-800 text-base sm:text-lg leading-relaxed">{story.approach}</p>
      </CaseStudySection>

      {/* 6. SERVICES DELIVERED */}
      <section className="py-12 sm:py-20 bg-gray-50 border-b border-gray-200">
        <div className="container-main max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900 tracking-tight">
              Services & Contributions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {story.services.map((service, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 sm:p-5 rounded-xl bg-white border border-gray-200 shadow-2xs"
              >
                <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 text-[#1E6F43] flex items-center justify-center font-bold text-xs shrink-0">
                  ✓
                </div>
                <span className="text-sm sm:text-base font-medium text-gray-900">
                  {service}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. OUTCOMES */}
      <section className="py-12 sm:py-20 bg-white border-b border-gray-200">
        <div className="container-main max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900 tracking-tight">
              Outcomes & Value Created
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {story.outcomes.map((outcome, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-xl bg-gray-50 border border-gray-200 flex items-start gap-4"
              >
                <span className="font-heading font-bold text-lg text-[#1E6F43] shrink-0 mt-0.5">
                  0{idx + 1}
                </span>
                <p className="text-base sm:text-lg text-gray-900 font-medium leading-relaxed">
                  {outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. RELATED CASE STUDIES */}
      <RelatedProjects stories={relatedStories} />

      {/* 9. BOTTOM CTA */}
      <section className="bg-[#0F3D2E] text-white py-16 sm:py-20 text-center">
        <div className="container-main max-w-3xl mx-auto px-4 sm:px-6 space-y-5">
          <h2 className="text-2xl sm:text-4xl font-bold font-heading !text-white text-white">
            Have a Story or Initiative Worth Elevating?
          </h2>
          <p className="text-gray-200 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            We partner with agricultural organisations, rural entrepreneurs, and businesses to build digital presence and communicate real change.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-3">
            <Button
              variant="primary"
              size="lg"
              href="/contact"
              className="w-full sm:w-auto bg-white text-[#0F3D2E] hover:bg-gray-100 font-bold px-8"
            >
              Start a Conversation
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/impact-stories"
              className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10"
            >
              All Impact Stories
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
