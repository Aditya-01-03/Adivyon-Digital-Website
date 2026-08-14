export interface ServiceData {
  slug: string;
  title: string;
  headline: string;
  body: string;
  included: string[];
  whoItsFor: string;
  metaTitle: string;
  metaDescription: string;
}

export const SERVICES_DATA: ServiceData[] = [
  {
    slug: 'website-development',
    title: 'Website Development',
    headline: 'Websites built to convert, not just look good.',
    body: "A slow, confusing, or outdated website costs you customers before they ever call. We build fast, mobile-first sites designed around how your customers actually decide to buy.",
    included: [
      'Custom design & development',
      'Mobile-first performance',
      'SEO-ready structure',
      'CMS so your team can update it without calling us',
    ],
    whoItsFor: "Businesses whose website isn't generating leads, or that they're hesitant to send to a serious client.",
    metaTitle: 'Website Development Services | Adivyon Digital',
    metaDescription: 'Custom, high-converting, mobile-first websites designed around how your customers actually decide to buy. Built for speed and lead generation.',
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    headline: 'Marketing tied to revenue, not vanity metrics.',
    body: "More reach doesn't pay your bills — more customers does. We run paid, social, and search campaigns built around your actual sales funnel, not generic engagement targets.",
    included: [
      'Paid ads (Meta/Google)',
      'SEO & content strategy',
      'Monthly reporting tied to leads and revenue',
      'Ongoing campaign optimization',
    ],
    whoItsFor: "Businesses spending on ads without a clear read on what's actually working.",
    metaTitle: 'Digital Marketing Services | Adivyon Digital',
    metaDescription: 'Revenue-focused digital marketing campaigns. Paid ads, SEO, and sales funnel optimization with transparent reporting tied to real revenue.',
  },
  {
    slug: 'ai-automation',
    title: 'AI Automation',
    headline: 'Cut the manual work slowing your team down.',
    body: 'Every hour your team spends on repetitive admin is an hour not spent growing the business. We find where AI can take over — from lead follow-up to reporting — and build it in.',
    included: [
      'Process audit to find automation opportunities',
      'Custom AI workflows (chatbots, lead routing, reporting)',
      'Integration with your existing tools',
      'Team training',
    ],
    whoItsFor: 'Businesses where the same manual task eats hours every week.',
    metaTitle: 'AI Automation & Workflows | Adivyon Digital',
    metaDescription: 'Eliminate repetitive manual tasks with custom AI workflows, automated lead routing, and tool integrations that save hours every week.',
  },
  {
    slug: 'brand-identity',
    title: 'Brand Identity',
    headline: 'A brand that earns trust before you say a word.',
    body: 'Inconsistent logos, colors, and messaging make an established business look unproven. We build a brand system that signals credibility the moment someone sees it.',
    included: [
      'Logo & visual identity',
      'Brand guidelines',
      'Messaging & positioning',
      'Applied assets (business cards, social templates, etc.)',
    ],
    whoItsFor: 'Businesses that have outgrown their original branding.',
    metaTitle: 'Brand Identity & Strategy | Adivyon Digital',
    metaDescription: 'Build an authoritative brand system that earns trust instantly. Complete visual identity, logo design, guidelines, and positioning.',
  },
  {
    slug: 'content-production',
    title: 'Content Production',
    headline: 'Content that looks like it belongs to a bigger company.',
    body: "Low-quality photos and video quietly signal a small operation, even when the business behind them isn't. We produce content that matches how established your business actually is.",
    included: [
      'Photography & videography',
      'Short-form video for social',
      'Product / catalogue content',
      'AI-assisted content pipelines where they speed things up without cutting quality',
    ],
    whoItsFor: "Businesses whose visual content doesn't match the quality of what they actually sell.",
    metaTitle: 'High-Impact Content Production | Adivyon Digital',
    metaDescription: 'Professional photography, video production, and social content pipelines that elevate your brand image to match the true quality of your business.',
  },
  {
    slug: 'business-strategy',
    title: 'Business Strategy',
    headline: "Strategy that starts with what's actually broken.",
    body: "Most growth problems aren't a marketing problem at the surface — they're a process, pricing, or positioning problem underneath. We diagnose that first, then build the plan.",
    included: [
      'Business & operations audit',
      'Growth roadmap',
      'Pricing & positioning review',
      'Ongoing advisory',
    ],
    whoItsFor: "Businesses that have tried marketing fixes and still aren't seeing results.",
    metaTitle: 'Strategic Business Consulting | Adivyon Digital',
    metaDescription: 'Diagnostic business strategy focusing on positioning, pricing, and process optimization to fix underlying bottlenecks and unlock real growth.',
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug);
}
