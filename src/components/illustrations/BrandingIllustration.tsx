'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function BrandingIllustration() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background Glow */}
      <circle cx="100" cy="100" r="80" fill="#1E6F43" fillOpacity="0.05" />
      
      {/* Brand Palette Swatch Cards (Back Card) */}
      <motion.rect
        x="55" y="45" width="70" height="90" rx="12"
        fill="#E8F5E9" stroke="#6BBF73" strokeWidth="2"
        animate={{ rotate: [-6, -10, -6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: '90px 90px' }}
      />

      {/* Main Brand Design System Card */}
      <motion.g
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="75" y="55" width="80" height="100" rx="14" fill="#FFFFFF" stroke="#1E6F43" strokeWidth="2.5" className="shadow-lg" />
        
        {/* Brand Symbol / Diamond Emblem */}
        <path d="M115 70L135 90L115 110L95 90Z" fill="#1E6F43" />
        <path d="M115 78L127 90L115 102L103 90Z" fill="#6BBF73" />
        <circle cx="115" cy="90" r="4" fill="#0F3D2E" />

        {/* Color Palette Bubbles */}
        <circle cx="93" cy="128" r="7" fill="#0F3D2E" />
        <circle cx="115" cy="128" r="7" fill="#1E6F43" />
        <circle cx="137" cy="128" r="7" fill="#6BBF73" />
        
        {/* Brand Guideline Bar */}
        <rect x="93" y="142" width="44" height="4" rx="2" fill="#E9ECEB" />
      </motion.g>

      {/* Floating Sparkle / Credibility Badge */}
      <motion.g
        animate={{ scale: [1, 1.15, 1], rotate: [0, 15, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <circle cx="50" cy="70" r="18" fill="#0F3D2E" />
        <path d="M50 58L53 66L61 67L55 72L57 80L50 76L43 80L45 72L39 67L47 66Z" fill="#6BBF73" />
      </motion.g>

      {/* Creative Pen Cursor */}
      <motion.g
        animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M150 40L165 55L145 75L130 75L130 60Z" fill="#1E6F43" />
        <path d="M130 75L138 67" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}
