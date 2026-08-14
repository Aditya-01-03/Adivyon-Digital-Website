'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function MarketingIllustration() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background Grid */}
      <path d="M30 160 H170" stroke="#0F3D2E" strokeWidth="4" strokeLinecap="round" />
      <path d="M30 160 V40" stroke="#0F3D2E" strokeWidth="4" strokeLinecap="round" />
      
      {/* Chart Bars */}
      <motion.rect x="50" y="120" width="20" height="40" rx="4" fill="#E8F5E9" 
        initial={{ height: 0, y: 160 }} animate={{ height: 40, y: 120 }} transition={{ duration: 1 }} />
      <motion.rect x="85" y="90" width="20" height="70" rx="4" fill="#6BBF73" 
        initial={{ height: 0, y: 160 }} animate={{ height: 70, y: 90 }} transition={{ duration: 1, delay: 0.2 }} />
      <motion.rect x="120" y="50" width="20" height="110" rx="4" fill="#1E6F43" 
        initial={{ height: 0, y: 160 }} animate={{ height: 110, y: 50 }} transition={{ duration: 1, delay: 0.4 }} />
      
      {/* Trend Line */}
      <motion.path d="M50 100 L90 70 L125 80 L160 30" stroke="#0F3D2E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1 }} />
      <motion.circle cx="160" cy="30" r="6" fill="#0F3D2E" 
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, delay: 2.5 }} />
      
      {/* Target/Bullseye */}
      <g transform="translate(140, 90)">
        <circle cx="0" cy="0" r="25" stroke="#1E6F43" strokeWidth="4" fill="#E8F5E9" />
        <circle cx="0" cy="0" r="15" stroke="#2F8F5B" strokeWidth="4" fill="none" />
        <circle cx="0" cy="0" r="5" fill="#0F3D2E" />
        <path d="M15 -15 L30 -30 M25 -30 L30 -30 L30 -25" stroke="#0F3D2E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      
      {/* Percentage Badge */}
      <rect x="25" y="40" width="55" height="30" rx="15" fill="#2F8F5B" />
      <text x="52" y="60" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">+125%</text>
    </svg>
  );
}
