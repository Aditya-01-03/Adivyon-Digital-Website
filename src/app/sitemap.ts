import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { IMPACT_STORIES } from '@/lib/impact-stories-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const impactRoutes: MetadataRoute.Sitemap = IMPACT_STORIES.map((story) => ({
    url: `${SITE_CONFIG.url}/impact-stories/${story.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${SITE_CONFIG.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_CONFIG.url}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_CONFIG.url}/impact-stories`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...impactRoutes,
    {
      url: `${SITE_CONFIG.url}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
