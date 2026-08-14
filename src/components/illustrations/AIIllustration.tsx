'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function AIIllustration() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Central Brain/Network Shape */}
      <motion.path 
        d="M100 40 C130 40 150 60 150 90 C150 120 130 140 100 150 C70 140 50 120 50 90 C50 60 70 40 100 40 Z"
        stroke="#1E6F43" strokeWidth="6" fill="#E8F5E9" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Data flow lines */}
      <motion.path d="M100 40 L100 20 M150 90 L170 90 M50 90 L30 90 M100 150 L100 170" stroke="#2F8F5B" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 6" 
        animate={{ strokeDashoffset: [0, 24] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      {/* Network Nodes */}
      <circle cx="100" cy="70" r="8" fill="#1E6F43" />
      <circle cx="75" cy="100" r="6" fill="#6BBF73" />
      <circle cx="125" cy="100" r="6" fill="#6BBF73" />
      <circle cx="100" cy="125" r="8" fill="#0F3D2E" />
      
      {/* Connecting internal lines */}
      <path d="M100 70 L75 100 L100 125 L125 100 Z" stroke="#2F8F5B" strokeWidth="3" />
      <path d="M100 70 L100 125" stroke="#2F8F5B" strokeWidth="3" />
      <path d="M75 100 L125 100" stroke="#2F8F5B" strokeWidth="3" />

      {/* Pulsing rings */}
      <motion.circle cx="100" cy="70" r="8" stroke="#6BBF73" strokeWidth="2" fill="none"
        animate={{ scale: [1, 2], opacity: [1, 0] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.circle cx="100" cy="125" r="8" stroke="#6BBF73" strokeWidth="2" fill="none"
        animate={{ scale: [1, 2], opacity: [1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />

      {/* AI Label Badge */}
      <rect x="80" y="85" width="40" height="30" rx="8" fill="#1E6F43" />
      <text x="100" y="105" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">AI</text>
      
      {/* Floating Gear */}
      <motion.g 
        animate={{ rotate: 360 }} 
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: '155px 45px' }}
      >
        <circle cx="155" cy="45" r="10" stroke="#0F3D2E" strokeWidth="4" fill="none" />
        <path d="M155 30 L155 35 M155 55 L155 60 M140 45 L145 45 M165 45 L170 45" stroke="#0F3D2E" strokeWidth="4" strokeLinecap="round" />
        <path d="M144 34 L148 38 M162 52 L166 56 M166 34 L162 38 M148 52 L144 56" stroke="#0F3D2E" strokeWidth="4" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}
