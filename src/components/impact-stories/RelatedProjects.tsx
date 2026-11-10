import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ImpactStory } from '@/lib/impact-stories-data';
import { Badge } from '@/components/ui/Badge';

interface RelatedProjectsProps {
  stories: ImpactStory[];
}

export function RelatedProjects({ stories }: RelatedProjectsProps) {
  if (!stories || stories.length === 0) return null;

  return (
    <section className="py-14 sm:py-20 bg-gray-50 border-t border-gray-200">
      <div className="container-main max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900">
            More Impact Stories
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {stories.map((story) => (
            <Link
              key={story.slug}
              href={`/impact-stories/${story.slug}`}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#1E6F43] transition-colors shadow-2xs"
            >
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-gray-100">
                <Image
                  src={story.heroImage}
                  alt={story.heroImageAlt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <Badge className="mb-2 bg-emerald-50 text-[#1E6F43] border-emerald-200 text-xs">
                    {story.category}
                  </Badge>
                  <h3 className="font-heading font-bold text-lg text-gray-900 group-hover:text-[#1E6F43] transition-colors line-clamp-2 mb-2">
                    {story.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 mb-4">
                    {story.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#1E6F43]">
                  <span>Explore Story</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedProjects;
