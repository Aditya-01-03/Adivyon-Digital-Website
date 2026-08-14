const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const salt = crypto.getRandomValues(new Uint8Array(16));
  
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    data,
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );
  
  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 310000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'HMAC', hash: 'SHA-256', length: 256 },
    true,
    ['sign']
  );
  
  const exportedKey = await crypto.subtle.exportKey('raw', key);
  const hashBuffer = new Uint8Array(exportedKey);
  
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
  const hashHex = Array.from(hashBuffer).map(b => b.toString(16).padStart(2, '0')).join('');
  
  return `${saltHex}:${hashHex}`;
}

async function main() {
  console.log('Seeding database with full production data...');

  // 1. Admin User
  const email = 'admin@adivyon.com';
  const hashedPassword = await hashPassword('Admin@2026');
  await prisma.user.upsert({
    where: { email },
    update: { password: hashedPassword, name: 'System Admin', role: 'admin' },
    create: { email, password: hashedPassword, name: 'System Admin', role: 'admin' },
  });

  // 2. Services
  const servicesData = [
    {
      title: 'Website Development',
      slug: 'website-development',
      shortDescription: 'Custom web solutions built to convert, not just look good.',
      fullDescription: "A slow, confusing, or outdated website costs you customers before they ever call. We build fast, mobile-first sites designed around how your customers actually decide to buy.",
      icon: 'code',
      order: 1,
      isActive: true,
    },
    {
      title: 'Digital Marketing',
      slug: 'digital-marketing',
      shortDescription: 'Revenue-focused digital marketing campaigns.',
      fullDescription: "More reach doesn't pay your bills — more customers does. We run paid, social, and search campaigns built around your actual sales funnel, not generic engagement targets.",
      icon: 'trending-up',
      order: 2,
      isActive: true,
    },
    {
      title: 'AI Automation',
      slug: 'ai-automation',
      shortDescription: 'Streamline processes and cut repetitive admin with custom AI.',
      fullDescription: 'Every hour your team spends on repetitive admin is an hour not spent growing the business. We find where AI can take over — from lead follow-up to reporting — and build it in.',
      icon: 'cpu',
      order: 3,
      isActive: true,
    },
    {
      title: 'Brand Identity',
      slug: 'brand-identity',
      shortDescription: 'A brand system that signals credibility the moment someone sees it.',
      fullDescription: 'Inconsistent logos, colors, and messaging make an established business look unproven. We build a brand system that signals credibility the moment someone sees it.',
      icon: 'palette',
      order: 4,
      isActive: true,
    },
    {
      title: 'Content Production',
      slug: 'content-production',
      shortDescription: 'High-impact visual content that elevates your brand image.',
      fullDescription: "Low-quality photos and video quietly signal a small operation, even when the business behind them isn't. We produce content that matches how established your business actually is.",
      icon: 'video',
      order: 5,
      isActive: true,
    },
    {
      title: 'Business Strategy',
      slug: 'business-strategy',
      shortDescription: 'Diagnostic business strategy focusing on positioning, pricing, and process.',
      fullDescription: "Most growth problems aren't a marketing problem at the surface — they're a process, pricing, or positioning problem underneath. We diagnose that first, then build the plan.",
      icon: 'compass',
      order: 6,
      isActive: true,
    },
  ];

  for (const s of servicesData) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }

  // 3. Portfolio Projects
  const projectsData = [
    {
      title: 'TechNova Enterprise Platform',
      slug: 'technova-platform',
      category: 'Web Dev',
      industry: 'Technology',
      challenge: 'Outdated portal with slow load times and low mobile conversion rates.',
      solution: 'Rebuilt using Next.js App Router, Tailwind CSS, and optimized database queries.',
      result: '127% increase in organic lead conversions within 90 days.',
      isFeatured: true,
      order: 1,
    },
    {
      title: 'EcoLife Global Rebrand',
      slug: 'ecolife-rebrand',
      category: 'Branding',
      industry: 'Sustainability',
      challenge: 'Inconsistent brand elements across 4 regional markets.',
      solution: 'Developed unified brand architecture, design system, and global guidelines.',
      result: 'Unified brand presence across 4 continents and 45% increase in brand recall.',
      isFeatured: true,
      order: 2,
    },
    {
      title: 'GrowthBoost Performance Campaign',
      slug: 'growthboost-campaign',
      category: 'Marketing',
      industry: 'E-commerce',
      challenge: 'High cost per acquisition across Meta & Google ad channels.',
      solution: 'Full funnel restructuring, AI lead routing, and dynamic creative testing.',
      result: '3.8x ROAS and 42% reduction in customer acquisition cost.',
      isFeatured: true,
      order: 3,
    },
    {
      title: 'FinSmart Automated Portal',
      slug: 'finsmart-app',
      category: 'AI Automation',
      industry: 'Finance',
      challenge: 'Manual customer onboarding taking 48+ hours per client.',
      solution: 'Custom AI document verification & automated workflow integration.',
      result: 'Onboarding reduced from 48 hours to under 3 minutes.',
      isFeatured: true,
      order: 4,
    },
  ];

  for (const p of projectsData) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }

  // 4. Testimonials
  const testimonialsData = [
    {
      clientName: 'Jane Doe',
      company: 'TechNova Solutions',
      designation: 'Chief Marketing Officer',
      review: 'Adivyon completely transformed our online presence. Our conversion rates doubled within 60 days of launching the new portal.',
      rating: 5,
      isPublished: true,
      order: 1,
    },
    {
      clientName: 'John Smith',
      company: 'EcoLife Global',
      designation: 'Chief Executive Officer',
      review: 'The strategic clarity and flawless execution from Adivyon exceeded our highest expectations. Their team is world-class.',
      rating: 5,
      isPublished: true,
      order: 2,
    },
    {
      clientName: 'Sarah Lee',
      company: 'FinSmart Financial',
      designation: 'Founder & CEO',
      review: 'AI automation implemented by Adivyon saved our team 25+ hours every week. It allowed us to scale 3x without hiring extra staff.',
      rating: 5,
      isPublished: true,
      order: 3,
    },
  ];

  for (const t of testimonialsData) {
    const existing = await prisma.testimonial.findFirst({ where: { clientName: t.clientName } });
    if (existing) {
      await prisma.testimonial.update({ where: { id: existing.id }, data: t });
    } else {
      await prisma.testimonial.create({ data: t });
    }
  }

  // 5. FAQs
  const faqsData = [
    {
      question: 'What services do you offer?',
      answer: 'We provide a comprehensive suite of digital services including Website Development, Digital Marketing, AI Automation, Brand Identity, Content Production, and Business Strategy.',
      order: 1,
      isActive: true,
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on scope and complexity. A standard website might take 4-8 weeks, while full digital transformations can span several months.',
      order: 2,
      isActive: true,
    },
    {
      question: 'Do you work with startups or established enterprises?',
      answer: 'Both! We scale our solutions to meet the needs of ambitious startups looking to make an impact, as well as established enterprises aiming to modernize their digital presence.',
      order: 3,
      isActive: true,
    },
    {
      question: 'How do you measure project success?',
      answer: "We establish clear KPIs during the Discovery phase. Success is measured through hard data—whether it's increased traffic, higher conversion rates, or improved user engagement metrics.",
      order: 4,
      isActive: true,
    },
    {
      question: 'What is your ongoing support and maintenance policy?',
      answer: 'We offer flexible retainer packages for continuous optimization, security updates, content management, and strategic consulting to ensure your digital assets grow with your business.',
      order: 5,
      isActive: true,
    },
    {
      question: 'How do we get started?',
      answer: 'Simply reach out via our contact form to book a free consultation. We will discuss your goals, analyze your current digital presence, and propose a tailored strategy.',
      order: 6,
      isActive: true,
    },
  ];

  for (const f of faqsData) {
    const existing = await prisma.fAQ.findFirst({ where: { question: f.question } });
    if (existing) {
      await prisma.fAQ.update({ where: { id: existing.id }, data: f });
    } else {
      await prisma.fAQ.create({ data: f });
    }
  }

  // 6. Sample Leads
  const leadsData = [
    {
      name: 'Michael Vance',
      email: 'm.vance@techcorp.com',
      phone: '+1 (555) 234-5678',
      company: 'TechCorp Industries',
      service: 'Website Development',
      message: 'Looking to overhaul our enterprise SaaS platform website before Q4 investor launch.',
      isRead: false,
    },
    {
      name: 'Elena Rostova',
      email: 'elena@biopure.io',
      phone: '+1 (555) 987-6543',
      company: 'BioPure Health',
      service: 'AI Automation',
      message: 'We want to automate patient appointment intake and lead follow-up emails.',
      isRead: false,
    },
    {
      name: 'David Miller',
      email: 'david@apexcapital.com',
      phone: '+1 (555) 456-7890',
      company: 'Apex Capital Partners',
      service: 'Brand Identity',
      message: 'Need a complete brand identity refresh for our private equity firm.',
      isRead: true,
    },
  ];

  for (const l of leadsData) {
    const existing = await prisma.lead.findFirst({ where: { email: l.email } });
    if (!existing) {
      await prisma.lead.create({ data: l });
    }
  }

  // 7. Site Settings
  const settingsData = [
    { key: 'site_name', value: 'Adivyon Digital' },
    { key: 'site_description', value: 'Digital agency providing web development, marketing, and strategy.' },
    { key: 'contact_email', value: 'manager@adivyondigital.com' },
    { key: 'contact_phone', value: '+91 62683 97386' },
    { key: 'address', value: 'Bhopal, Madhya Pradesh' },
    { key: 'twitter_url', value: 'https://twitter.com/adivyon' },
    { key: 'linkedin_url', value: 'https://linkedin.com/company/adivyon' },
    { key: 'instagram_url', value: 'https://instagram.com/adivyon' },
  ];

  for (const st of settingsData) {
    await prisma.siteSetting.upsert({
      where: { key: st.key },
      update: { value: st.value },
      create: st,
    });
  }

  console.log('Database seeding finished successfully!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
