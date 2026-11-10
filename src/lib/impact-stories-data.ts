export interface ImpactStory {
  slug: string;
  number: string;
  title: string;
  headline: string;
  category: string;
  shortDescription: string;
  logoSrc: string;
  logoAlt: string;
  heroImage: string;
  heroImageAlt: string;
  introduction: string;
  challenge: string;
  approach: string;
  services: string[];
  outcomes: string[];
  youtubeVideoIds?: string[];
  relatedSlugs: string[];
}

export const IMPACT_STORIES: ImpactStory[] = [
  {
    slug: 'krishe-carbon',
    number: '01',
    title: 'Krishe Carbon',
    headline: 'Every Farmer Has a Story Worth Telling.',
    category: 'Impact Storytelling / Video Production',
    shortDescription:
      'Documenting farmer success stories through authentic field-level storytelling and complete video production.',
    logoSrc: '/images/impact-stories/krishe-carbon-logo.png',
    logoAlt: 'Krishe Carbon logo',
    heroImage: '/images/impact-stories/krishe-carbon-hero.jpg',
    heroImageAlt:
      'A farmer sharing their story in a green agricultural field during golden hour',
    introduction:
      'Krishe Carbon works with farming communities to create positive environmental and economic outcomes. As part of their mission, it was important to document the real experiences and success stories of the farmers they work with — in their own words, from their own fields. Adivyon Digital partnered with Krishe Carbon to bring these stories to life through professional video production.',
    challenge:
      'Farmer success stories are often untold or poorly documented. The challenge was to capture authentic, field-level narratives that convey the real impact of sustainable agricultural practices — without losing the human connection. The stories needed to feel genuine, not scripted, and had to be produced at a quality level suitable for organisational communications and public-facing campaigns.',
    approach:
      'We took an on-the-ground, documentary-style approach. Our team visited farming communities, spent time understanding each farmer\'s journey, and captured their stories through professional cinematography. Every aspect of production — from pre-production planning and scripting to field coverage, camera work, editing, colour grading, and post-production — was handled in-house by Adivyon Digital. The focus was on authenticity: letting the farmers speak for themselves, with visuals that do justice to their work and their environment.',
    services: [
      'Story research and pre-production planning',
      'Field-level video coverage and cinematography',
      'Farmer interviews and narrative development',
      'Professional video editing and post-production',
      'Colour grading and audio mixing',
      'Final delivery in multiple formats',
    ],
    outcomes: [
      'Multiple farmer success story videos produced and delivered',
      'Authentic, documentary-quality content ready for organisational communications',
      'Farmers\' real experiences captured in their own voices and environments',
      'A repeatable storytelling framework for future farmer documentation',
    ],
    youtubeVideoIds: ['v8zjMd6gDb4', 'wGHinpGE8z8', '8farR2hU9ho'],
    relatedSlugs: ['shree-ram-nursery', 'garv-masale', 'gramya'],
  },
  {
    slug: 'shree-ram-nursery',
    number: '02',
    title: 'Shree Ram High-Tech Nursery',
    headline: 'Helping a Small Agricultural Entrepreneur Think Bigger.',
    category: 'Digital Transformation / Rural Entrepreneurship',
    shortDescription:
      'Helping a small nursery establish its digital presence, reach new customers and achieve approximately 4–5x business growth during our engagement.',
    logoSrc: '/images/impact-stories/shree-ram-nursery-logo.png',
    logoAlt: 'Shree Ram High-Tech Nursery logo',
    heroImage: '/images/impact-stories/shree-ram-nursery-hero.jpg',
    heroImageAlt:
      'Ritik Mori, founder of Shree Ram High-Tech Nursery, standing in the nursery sapling greenhouse',
    introduction:
      'Shree Ram High-Tech Nursery is a small agricultural enterprise based in rural India, specialising in plant saplings and nursery products. When we first connected, the nursery had no digital presence — no logo, no social media, and no online visibility. Customers could only find them through word of mouth. Adivyon Digital partnered with them to change that.',
    challenge:
      'For small agricultural businesses, the digital world can feel distant and inaccessible. Shree Ram Nursery had a strong local reputation, but zero online presence. There was no logo, no website, no social media — nothing that would help potential customers discover them beyond their immediate geography. The challenge was to build a complete digital identity from scratch and translate it into real customer growth.',
    approach:
      'We started with the fundamentals: creating a professional brand identity, including a logo that reflects the nursery\'s values. From there, we established and managed their social media presence, creating consistent content that showcased their products and expertise. We executed targeted online campaigns to reach new customer segments and drive footfall. Throughout the engagement, we worked closely with the nursery owner to ensure every digital initiative aligned with their business goals.',
    services: [
      'Brand identity and logo design',
      'Social media setup and management',
      'Content creation and creative design',
      'Targeted online marketing campaigns',
      'Customer acquisition strategy',
      'Ongoing digital presence management',
    ],
    outcomes: [
      'Complete digital presence built from scratch — logo, social media, content',
      'Approximately 4–5x business growth reported by the client during our engagement',
      'New customers discovering the nursery through online channels before visiting in person',
      'A sustainable digital foundation for continued independent growth',
    ],
    relatedSlugs: ['krishe-carbon', 'garv-masale', 'gramya'],
  },
  {
    slug: 'garv-masale',
    number: '03',
    title: 'Garv Masale',
    headline: 'From Farm Produce to a Farmer-Led Brand.',
    category: 'Farmer Entrepreneurship / Brand Development',
    shortDescription:
      'Supporting a smallholder farming family in exploring value addition, processing chillies into powder and building their own consumer-facing brand.',
    logoSrc: '/images/impact-stories/garv-masale-logo.png',
    logoAlt: 'Garv Masale logo',
    heroImage: '/images/impact-stories/garv-masale-hero.jpg',
    heroImageAlt:
      'Vibrant red chilli peppers drying in the sun at an Indian farm',
    introduction:
      'Garv Masale is a farmer-led initiative from Khargone, Madhya Pradesh, where a smallholder farming family decided to move beyond selling raw produce. Instead of selling chillies as a commodity, they wanted to explore value addition — processing their harvest into chilli powder and creating their own consumer-facing brand. Adivyon Digital partnered with them to make this vision a reality.',
    challenge:
      'Smallholder farmers in India often sell raw produce at commodity prices, with little control over the final value chain. The family behind Garv Masale wanted to break this cycle by creating their own brand — but had no experience in branding, packaging, regulatory compliance, or digital marketing. The challenge was to help them navigate every step of the journey from farm produce to a packaged consumer product.',
    approach:
      'We took a holistic, hands-on approach. Starting with brand strategy, we created a complete brand identity — including the name, logo, and visual language that reflects the product\'s roots in authentic farming. We designed product packaging that communicates quality and trust. Beyond branding, we provided guidance on the necessary licensing and compliance requirements for food products. We set up their social media presence and helped them begin building a customer base. Throughout, we worked alongside the family, supporting their entrepreneurial journey at every step.',
    services: [
      'Brand identity and naming',
      'Logo design and visual language',
      'Product packaging design',
      'Guidance on licensing and compliance requirements',
      'Social media setup and initial content',
      'Entrepreneurship guidance and strategic support',
    ],
    outcomes: [
      'A complete brand identity created for Garv Masale — name, logo, packaging',
      'Chilli powder production initiated by the farming family',
      'Consumer-facing brand positioning established',
      'Social media presence set up for customer engagement',
      'A model for farmer-led value addition and rural entrepreneurship',
    ],
    relatedSlugs: ['krishe-carbon', 'shree-ram-nursery', 'gramya'],
  },
  {
    slug: 'gramya',
    number: '04',
    title: 'Gramya',
    headline: 'Growing Millets. Empowering Rural Entrepreneurs.',
    category: 'Millet Promotion / Rural Entrepreneurship',
    shortDescription:
      'Promoting millet cultivation, supporting fair-price procurement from farmers, and strengthening rural entrepreneurship and market access.',
    logoSrc: '/images/impact-stories/gramya-logo.png',
    logoAlt: 'Gramya logo',
    heroImage: '/images/impact-stories/gramya-hero.jpg',
    heroImageAlt:
      'Golden millet crops growing in an agricultural field, ready for harvest',
    introduction:
      'Gramya is an organisation that promotes millet cultivation and supports rural social entrepreneurship across India. The organisation encourages farmers to grow millets and procures their produce at fair prices, helping create better market opportunities for farming communities. Its approach goes beyond agriculture — Gramya aims to strengthen rural livelihoods, encourage entrepreneurship within villages, and create opportunities for farmers through better market access.',
    challenge:
      'Millet farming, despite its nutritional and environmental benefits, often faces challenges in market access and fair pricing. Farmers who grow millets need reliable buyers, and rural communities need support to transition from subsistence farming to entrepreneurial ventures. Gramya addresses this gap by creating a bridge between millet-growing farmers and markets — but communicating this mission and expanding its reach required digital storytelling and brand support.',
    approach:
      'We worked with Gramya to understand their mission, their impact on farming communities, and the stories that needed to be told. Our approach focused on communicating Gramya\'s work authentically — highlighting the farmers they support, the millets they promote, and the rural entrepreneurship they enable. We supported their communication needs to help their mission reach a wider audience.',
    services: [
      'Brand communication support',
      'Story development and content strategy',
      'Visual communication and design',
      'Digital presence guidance',
    ],
    outcomes: [
      'Gramya\'s mission and impact communicated to a wider audience',
      'Authentic representation of millet farming communities',
      'Strengthened organisational communication for outreach and partnerships',
      'A foundation for continued digital storytelling and engagement',
    ],
    relatedSlugs: ['krishe-carbon', 'shree-ram-nursery', 'kheyti-talks'],
  },
  {
    slug: 'kheyti-talks',
    number: '05',
    title: 'Kheyti Talks',
    headline: 'Educating Farmers, Demystifying Agriculture, and Scaling Reach.',
    category: 'Agri Media / Video Production & Tech Infrastructure',
    shortDescription:
      'Empowering an agriculture news and content enterprise with brand identity, digital infrastructure, YouTube video production pipelines, and continuous tech support.',
    logoSrc: '/images/impact-stories/kheyti-talks-logo.png',
    logoAlt: 'Kheyti Talks logo',
    heroImage: '/images/impact-stories/krishe-carbon-hero.jpg',
    heroImageAlt:
      'Agricultural field documentary and knowledge sharing with farming communities',
    introduction:
      'Kheyti Talks is a dedicated agricultural news, media, and knowledge platform committed to farmer education. Through practical blogs, guides, and educational YouTube videos, Kheyti Talks breaks down complex agricultural trends, crop diseases, modern cultivation techniques, and government support schemes. Adivyon Digital partnered with Kheyti Talks to handle their complete technical and creative foundation — engineering their brand identity, establishing their online publishing systems, and delivering end-to-end video production.',
    challenge:
      'As an agri-information enterprise, producing timely, accurate, and high-quality video content is paramount. However, without dedicated in-house design, online infrastructure, or an organized post-production pipeline, their team was bogged down by technical overhead instead of focusing on investigative agri-journalism, field research, and farmer outreach.',
    approach:
      'Adivyon Digital stepped in as Kheyti Talks\' comprehensive technology and production partner. We designed their official brand logo, built their digital web presence, and created a streamlined, high-output video production pipeline for their YouTube channel and editorial articles. From motion graphics and sound design to thumbnail packaging, SEO optimization, and continuous technical support, we removed every technical bottleneck so their editorial team could focus on storytelling and farmer awareness.',
    services: [
      'Brand identity and logo design',
      'Digital publishing platform and website setup',
      'End-to-end video production and post-production for YouTube',
      'Motion graphics, title cards, and thumbnail packaging',
      'Video SEO and distribution optimization',
      'Ongoing technical maintenance and IT support',
    ],
    outcomes: [
      'Consistent, high-quality video production pipeline established',
      'Farmer awareness videos reaching thousands of agricultural producers',
      'Distinct brand identity recognized across digital and agricultural channels',
      'Streamlined editorial workflow allowing rapid coverage of government schemes and crop alerts',
    ],
    relatedSlugs: ['krishe-carbon', 'shree-ram-nursery', 'delta-insights'],
  },
  {
    slug: 'reaching-root-foundation',
    number: '06',
    title: 'Reaching Root Foundation',
    headline: 'Documenting Grassroots Public Welfare and Humanitarian Drives.',
    category: 'Public Welfare / Documentary Video & Tech Support',
    shortDescription:
      'Supporting a non-governmental organization in documenting humanitarian welfare drives, donation campaigns, and grassroots public impact through cinema-grade video production.',
    logoSrc: '/images/impact-stories/reaching-roots-logo.png',
    logoAlt: 'Reaching Root Foundation logo',
    heroImage: '/images/impact-stories/hero.jpg',
    heroImageAlt:
      'Community outreach and public welfare drive organized by Reaching Root Foundation',
    introduction:
      'Reaching Root Foundation is a public welfare non-governmental organisation dedicated to community upliftment, relief work, and grassroots social change. Across multiple regions, the foundation organizes donation drives, essential aid distribution, educational support, and community welfare initiatives. Adivyon Digital partners with Reaching Root Foundation to document their humanitarian efforts on film and provide complete technical assistance.',
    challenge:
      'Public welfare initiatives rely on community trust and donor transparency. Ground-level donation drives and welfare activities are intensely emotional and impactful, yet without professional documentation, the true scope of their relief work often remained unseen. The challenge was to capture these community drives respectfully and powerfully without disrupting the ongoing humanitarian aid.',
    approach:
      'We implemented an unobtrusive, documentary-first filming method. Our team covered on-ground distribution drives and community interactions, producing compelling short documentaries, donor transparency reels, and campaign videos. In addition, Adivyon Digital provided technical support across digital assets to ensure their volunteer drives and donation appeals reached wider supporter networks.',
    services: [
      'Humanitarian field documentary and on-ground filming',
      'Campaign and donation drive video production',
      'Post-production, narrative editing, and subtitling',
      'Digital media assets for fundraising and transparency',
      'Technical consulting and digital coordination',
    ],
    outcomes: [
      'High-impact documentary videos verifying aid distribution and welfare initiatives',
      'Enhanced donor confidence and community engagement through transparent media',
      'Expanded digital reach for annual donation and volunteer recruitment drives',
      'A cohesive digital archive of the foundation\'s humanitarian milestones',
    ],
    relatedSlugs: ['gramya', 'kheyti-talks', 'shree-ram-nursery'],
  },
  {
    slug: 'delta-insights',
    number: '07',
    title: 'Delta Insights',
    headline: 'Translating Market Intelligence into Digital Authority.',
    category: 'Market Research / Web Engineering & Creative Media',
    shortDescription:
      'Partnering with a market research firm to architect high-performance web systems, creative media, and executive video production.',
    logoSrc: '/images/impact-stories/delta-insights-logo.png',
    logoAlt: 'Delta Insights logo',
    heroImage: '/images/impact-stories/garv-masale-hero.jpg',
    heroImageAlt:
      'Analytical market research and commercial intelligence briefing',
    introduction:
      'Delta Insights is an independent market research and business intelligence consultancy. The firm conducts rigorous qualitative and quantitative industry analysis, equipping emerging and established enterprises with actionable data to make informed commercial decisions. Adivyon Digital collaborated with Delta Insights across their technical ecosystem — engineering their corporate web platform, producing executive video presentations, and crafting creative digital assets.',
    challenge:
      'Market research firms handle intricate, dense data that can easily overwhelm prospective corporate clients. Delta Insights needed a sophisticated digital platform that reflects analytical rigor, alongside dynamic visual communication that translates complex market trends into compelling, digestible executive narratives.',
    approach:
      'We developed a modern, high-speed corporate web platform built for analytical clarity and lead generation. Furthermore, we produced polished data-driven video presentations, motion-graphic explainers, and corporate creative collateral that elevated their brand authority during client pitches and public research report releases.',
    services: [
      'Corporate web platform engineering and UI/UX architecture',
      'Executive video production and insight summaries',
      'Data visualization and motion graphic asset creation',
      'Digital branding and interactive report design',
      'Technical maintenance and performance optimization',
    ],
    outcomes: [
      'Modern digital platform establishing credibility with institutional clients',
      'Clear visual translation of dense industry reports into engaging video briefings',
      'Streamlined client onboarding and research inquiry funnels',
      'Integrated creative and technical architecture supporting ongoing research publications',
    ],
    relatedSlugs: ['kheyti-talks', 'krishe-carbon', 'gramya'],
  },
  {
    slug: 'kisan-hit-nursery',
    number: '08',
    title: 'Kisan Hit Nursery',
    headline: 'Redesigning Digital Presence & Driving 40 Lakh+ Incremental Sapling Sales.',
    category: 'Digital Transformation / Organic Growth',
    shortDescription:
      'Revamping digital identity and search visibility to drive qualified farmer leads, helping an agricultural nursery achieve an additional 40 lakh sapling sales year-on-year.',
    logoSrc: '/images/impact-stories/kisan-hit-nursery-logo.png',
    logoAlt: 'Kisan Hit Nursery logo',
    heroImage: '/images/impact-stories/shree-ram-nursery-hero.jpg',
    heroImageAlt:
      'Healthy sapling cultivation and high-tech nursery operations at Kisan Hit Nursery',
    introduction:
      'Kisan Hit Nursery is an established agricultural nursery specializing in high-yielding horticultural and crop saplings for farming communities. Despite their strong product quality and regional reputation among local growers, their outdated digital presence limited their reach to word-of-mouth referrals. Adivyon Digital partnered with Kisan Hit Nursery to overhaul their digital presence, engineer organic search visibility, and build a high-conversion inquiry channel for commercial farmers.',
    challenge:
      'Agricultural growers and commercial orchardists increasingly use mobile search to source certified, high-grade saplings months ahead of planting seasons. Kisan Hit Nursery had no modern, search-optimized web platform, meaning high-intent inquiries were going to competitors. They needed an authoritative online presence capable of establishing trust, showcasing sapling varieties, and turning search traffic into direct phone and WhatsApp orders.',
    approach:
      'We executed a comprehensive digital transformation: redesigning their brand presentation, launching a fast, mobile-first product catalogue, and implementing hyper-targeted organic SEO tailored to regional farming search queries. In addition, we optimized direct WhatsApp and phone lead pathways, allowing farmers to inquire directly about variety availability, bulk pricing, and seasonal dispatch schedules.',
    services: [
      'Digital presence and web platform redesign',
      'Mobile-first catalog architecture and UI/UX',
      'Regional agri-SEO and organic search lead strategy',
      'Direct farmer conversion funnel (WhatsApp and click-to-call)',
      'Performance analytics and lead tracking',
      'Brand positioning and digital trust assets',
    ],
    outcomes: [
      'Over 40 Lakh (4,000,000+) additional saplings sold compared to the previous year',
      'Substantial surge in organic, high-intent inbound inquiries across target agricultural districts',
      'Established as a premier digital destination for commercial sapling buyers',
      'Streamlined inquiry-to-dispatch workflow via direct mobile channels',
    ],
    relatedSlugs: ['shree-ram-nursery', 'krishe-carbon', 'gramya'],
  },
];

export function getStoryBySlug(slug: string): ImpactStory | undefined {
  return IMPACT_STORIES.find((story) => story.slug === slug);
}

export function getRelatedStories(slugs: string[]): ImpactStory[] {
  return IMPACT_STORIES.filter((story) => slugs.includes(story.slug));
}
