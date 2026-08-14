'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-white pt-24 px-6 pb-6 flex flex-col h-screen overflow-y-auto"
        >
          <nav className="flex flex-col gap-6 text-xl font-heading font-medium">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={onClose}
                className={cn(
                  'border-b border-border pb-4 transition-colors break-words',
                  pathname === link.href ? 'text-primary' : 'text-heading'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="mt-8">
            <Button variant="primary" className="w-full whitespace-nowrap" size="lg" href="/contact" onClick={onClose}>
              Book Consultation
            </Button>
          </div>

          <div className="mt-auto pt-12 flex justify-center gap-4">
             {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-heading hover:bg-primary hover:text-white transition-colors"
                >
                  <SocialIcon name={link.icon || link.label} className="w-5 h-5 fill-current" />
                </a>
             ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
