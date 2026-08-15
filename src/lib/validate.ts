import { z } from 'zod';

const noXss = (val: string) => !/<script|javascript:|on\w+=/i.test(val);

export const loginSchema = z.object({
  email: z.string().email().transform(val => val.toLowerCase().trim()),
  password: z.string().min(8).refine(val => {
    return /[A-Z]/.test(val) && /[a-z]/.test(val) && /[0-9]/.test(val) && /[^A-Za-z0-9]/.test(val);
  }, { message: "Password must contain uppercase, lowercase, number, and special character" }),
});

export const contactFormSchema = z.object({
  name: z.string().min(2).transform(val => val.trim()).refine(noXss, 'Invalid characters'),
  email: z.string().email().transform(val => val.toLowerCase().trim()).refine(noXss, 'Invalid characters'),
  phone: z.string().optional().transform(val => val ? val.trim() : val).refine(val => !val || noXss(val), 'Invalid characters'),
  company: z.string().optional().transform(val => val ? val.trim() : val).refine(val => !val || noXss(val), 'Invalid characters'),
  service: z.string().optional().transform(val => val ? val.trim() : val).refine(val => !val || noXss(val), 'Invalid characters'),
  message: z.string().min(2).transform(val => val.trim()).refine(noXss, 'Invalid characters'),
  website: z.string().max(0).optional(), // Honeypot
});

export const serviceSchema = z.object({
  title: z.string().min(2).transform(val => val.trim()).refine(noXss, 'Invalid characters'),
  slug: z.string().min(2).transform(val => val.trim()).refine(noXss, 'Invalid characters'),
  shortDescription: z.string().min(10).transform(val => val.trim()).refine(noXss, 'Invalid characters'),
  fullDescription: z.string().optional().transform(val => val ? val.trim() : val).refine(val => !val || noXss(val), 'Invalid characters'),
  icon: z.string().optional().transform(val => val ? val.trim() : val).refine(val => !val || noXss(val), 'Invalid characters'),
  isActive: z.boolean().default(true),
  order: z.number().default(0),
});

export const faqSchema = z.object({
  question: z.string().min(5).transform(val => val.trim()).refine(noXss, 'Invalid characters'),
  answer: z.string().min(5).transform(val => val.trim()).refine(noXss, 'Invalid characters'),
  isActive: z.boolean().default(true),
  order: z.number().default(0),
});

export const siteSettingsSchema = z.object({
  key: z.string().min(1).transform(val => val.trim()).refine(noXss, 'Invalid characters'),
  value: z.string().transform(val => val.trim()).refine(noXss, 'Invalid characters'),
});
