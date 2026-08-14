'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function HeroIllustration() {
  return (
    <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent-light/30 rounded-[32px] overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 600 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" className="text-primary/10" strokeWidth="1" />
          </pattern>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6BBF73" />
            <stop offset="100%" stopColor="#1E6F43" />
          </linearGradient>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E6F43" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1E6F43" stopOpacity="0" />
          </linearGradient>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="10" stdDeviation="15" floodOpacity="0.05" />
          </filter>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Central Dashboard Card */}
        <motion.g 
          animate={{ y: [0, -10, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="150" y="120" width="300" height="220" rx="16" fill="white" filter="url(#shadow)" />
          {/* Header */}
          <rect x="170" y="140" width="120" height="12" rx="6" fill="#E9ECEB" />
          <rect x="170" y="160" width="80" height="8" rx="4" fill="#F8FAF9" />
          
          {/* Chart Area */}
          <path d="M 170 290 L 170 220 C 200 220 220 250 240 230 C 260 210 280 230 300 180 C 320 130 340 160 360 140 C 380 120 400 130 430 110 L 430 290 Z" fill="url(#areaGrad)" />
          <path d="M 170 220 C 200 220 220 250 240 230 C 260 210 280 230 300 180 C 320 130 340 160 360 140 C 380 120 400 130 430 110" stroke="url(#lineGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          
          {/* Points */}
          <circle cx="240" cy="230" r="4" fill="white" stroke="#1E6F43" strokeWidth="2" />
          <circle cx="300" cy="180" r="4" fill="white" stroke="#1E6F43" strokeWidth="2" />
          <circle cx="360" cy="140" r="4" fill="white" stroke="#1E6F43" strokeWidth="2" />
        </motion.g>

        {/* Floating Metric 1 - Growth */}
        <motion.g 
          animate={{ y: [0, -8, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <rect x="80" y="160" width="120" height="60" rx="12" fill="white" filter="url(#shadow)" />
          <rect x="95" y="175" width="24" height="24" rx="6" fill="#E8F5E9" />
          <path d="M 102 192 L 107 182 L 112 187 L 116 179" stroke="#1E6F43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 112 179 L 116 179 L 116 183" stroke="#1E6F43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="128" y="186" fill="#1B1F1D" fontSize="14" fontWeight="bold" fontFamily="sans-serif">↑ 127%</text>
          <text x="128" y="202" fill="#5F6B67" fontSize="10" fontFamily="sans-serif">Growth</text>
        </motion.g>

        {/* Floating Metric 2 - Rating */}
        <motion.g 
          animate={{ y: [0, 8, 0] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <rect x="420" y="100" width="110" height="60" rx="12" fill="white" filter="url(#shadow)" />
          <rect x="435" y="115" width="24" height="24" rx="6" fill="#FFF3E0" />
          <path d="M 447 119 L 449.5 124 L 455 125 L 451 129 L 452 134.5 L 447 132 L 442 134.5 L 443 129 L 439 125 L 444.5 124 Z" fill="#F59E0B" />
          <text x="468" y="126" fill="#1B1F1D" fontSize="14" fontWeight="bold" fontFamily="sans-serif">4.9</text>
          <text x="468" y="142" fill="#5F6B67" fontSize="10" fontFamily="sans-serif">Reviews</text>
        </motion.g>

        {/* Floating Metric 3 - Users */}
        <motion.g 
          animate={{ y: [0, -6, 0] }} 
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        >
          <rect x="380" y="300" width="130" height="60" rx="12" fill="white" filter="url(#shadow)" />
          <rect x="395" y="315" width="24" height="24" rx="6" fill="#E8F5E9" />
          <circle cx="407" cy="323" r="4" fill="#1E6F43" />
          <path d="M 401 333 C 401 330 404 328 407 328 C 410 328 413 330 413 333" stroke="#1E6F43" strokeWidth="2" strokeLinecap="round" fill="none" />
          <text x="428" y="326" fill="#1B1F1D" fontSize="14" fontWeight="bold" fontFamily="sans-serif">2.4k</text>
          <text x="428" y="342" fill="#5F6B67" fontSize="10" fontFamily="sans-serif">Active Users</text>
        </motion.g>
      </svg>
    </div>
  );
}
