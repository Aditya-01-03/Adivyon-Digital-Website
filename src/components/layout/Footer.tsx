'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS, SOCIAL_LINKS, COMPANY_INFO, SERVICES } from '@/lib/constants';
import { SocialIcon } from '@/components/ui/SocialIcon';

export function Footer() {
  return (
    <footer className="bg-surface text-body pt-20 pb-10 border-t border-border mt-auto">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center mb-6 -ml-2">
              <Image 
                src="/logo-full.png" 
                alt="Adivyon Digital" 
                width={160} 
                height={48} 
                className="h-12 object-contain object-left"
                style={{ width: 'auto' }}
              />
            </Link>
            <div className="flex gap-3">
               {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary transition-colors text-primary hover:text-white hover:scale-105 transform duration-200"
                  >
                    <SocialIcon name={link.icon || link.label} className="w-5 h-5 fill-current" />
                  </a>
               ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-heading font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-heading font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link href={`/services/${service.id}`} className="text-sm hover:text-primary transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-heading font-semibold mb-6">Get in Touch</h4>
            <ul className="space-y-3 text-sm mb-6">
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-primary transition-colors break-all">{COMPANY_INFO.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-primary transition-colors">{COMPANY_INFO.phone}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-body/80">
          <p>© {new Date().getFullYear()} Adivyon Digital. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
