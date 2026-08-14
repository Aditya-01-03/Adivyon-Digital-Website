'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function StrategyIllustration() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background Target Grid */}
      <circle cx="100" cy="100" r="85" fill="#F8FAF9" stroke="#E9ECEB" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="60" stroke="#1E6F43" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4" />
      <circle cx="100" cy="100" r="35" stroke="#2F8F5B" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.6" />
      
      {/* Crosshair Axes */}
      <line x1="100" y1="15" x2="100" y2="185" stroke="#E9ECEB" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="15" y1="100" x2="185" y2="100" stroke="#E9ECEB" strokeWidth="1" strokeDasharray="4 4" />

      {/* Strategic Growth Pathway (Path connecting Milestone Nodes) */}
      <motion.path
        d="M45 140 L80 115 L115 125 L155 55"
        fill="none"
        stroke="#1E6F43"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
      />

      {/* Strategic Milestone Node 1 (Audit & Diagnosis) */}
      <circle cx="45" cy="140" r="10" fill="#0F3D2E" />
      <circle cx="45" cy="140" r="5" fill="#E8F5E9" />

      {/* Strategic Milestone Node 2 (Positioning & Pricing) */}
      <circle cx="80" cy="115" r="8" fill="#2F8F5B" />
      <circle cx="80" cy="115" r="4" fill="#FFFFFF" />

      {/* Strategic Milestone Node 3 (Roadmap Execution) */}
      <circle cx="115" cy="125" r="8" fill="#2F8F5B" />
      <circle cx="115" cy="125" r="4" fill="#FFFFFF" />

      {/* Goal Peak Node & Flag */}
      <motion.g
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="155" cy="55" r="14" fill="#1E6F43" />
        <circle cx="155" cy="55" r="7" fill="#6BBF73" />
        
        {/* Goal Target Flag */}
        <path d="M155 41V65" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <path d="M155 42L168 48L155 54Z" fill="#6BBF73" />
      </motion.g>

      {/* Diagnostic Compass Needle Floating Overlay */}
      <motion.g
        animate={{ rotate: [-8, 8, -8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: '100px 100px' }}
      >
        <polygon points="100,75 106,100 100,125 94,100" fill="#6BBF73" opacity="0.85" />
        <polygon points="100,75 106,100 100,100" fill="#1E6F43" opacity="0.9" />
        <circle cx="100" cy="100" r="4" fill="#0F3D2E" />
      </motion.g>

      {/* ROI / Revenue Growth Tag */}
      <motion.g
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <rect x="125" y="130" width="50" height="24" rx="12" fill="#0F3D2E" />
        <text x="150" y="146" textAnchor="middle" fill="#6BBF73" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
          ROI ↗
        </text>
      </motion.g>
    </svg>
  );
}
