'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function WebDevIllustration() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Browser Window */}
      <rect x="20" y="30" width="160" height="130" rx="12" fill="#E8F5E9" stroke="#1E6F43" strokeWidth="6" />
      
      {/* Browser Chrome */}
      <path d="M20 60 H180" stroke="#1E6F43" strokeWidth="6" />
      <circle cx="40" cy="45" r="6" fill="#6BBF73" />
      <circle cx="60" cy="45" r="6" fill="#2F8F5B" />
      <circle cx="80" cy="45" r="6" fill="#0F3D2E" />
      
      {/* Code Lines */}
      <rect x="40" y="80" width="80" height="8" rx="4" fill="#2F8F5B" />
      <motion.rect x="40" y="100" width="60" height="8" rx="4" fill="#6BBF73" 
        animate={{ width: [60, 90, 60] }} transition={{ duration: 3, repeat: Infinity }} />
      <rect x="60" y="120" width="50" height="8" rx="4" fill="#0F3D2E" />
      <rect x="40" y="140" width="70" height="8" rx="4" fill="#1E6F43" />
      
      {/* Cursor */}
      <motion.rect x="115" y="138" width="4" height="12" fill="#1E6F43"
        animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
        
      {/* Responsive Layout Preview */}
      <rect x="130" y="80" width="30" height="40" rx="4" stroke="#1E6F43" strokeWidth="4" fill="none" />
      <rect x="130" y="130" width="30" height="20" rx="4" stroke="#1E6F43" strokeWidth="4" fill="none" />
    </svg>
  );
}
