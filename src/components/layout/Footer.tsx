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
                <span className="mt-1">📍</span>
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <span>✉️</span>
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-primary transition-colors break-all">{COMPANY_INFO.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <span>📞</span>
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
