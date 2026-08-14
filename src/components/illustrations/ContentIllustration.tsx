'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function ContentIllustration() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Document Base */}
      <rect x="30" y="20" width="110" height="150" rx="10" fill="#E8F5E9" stroke="#1E6F43" strokeWidth="6" />
      
      {/* Image Placeholder */}
      <rect x="45" y="40" width="80" height="40" rx="6" fill="#6BBF73" fillOpacity="0.5" />
      {/* Play Button */}
      <path d="M78 50 L92 60 L78 70 Z" fill="#1E6F43" />
      
      {/* Text Lines */}
      <rect x="45" y="100" width="80" height="6" rx="3" fill="#2F8F5B" />
      <rect x="45" y="115" width="70" height="6" rx="3" fill="#2F8F5B" />
      <rect x="45" y="130" width="60" height="6" rx="3" fill="#2F8F5B" />
      <rect x="45" y="145" width="40" height="6" rx="3" fill="#2F8F5B" />
      
      {/* Floating Pen */}
      <motion.g 
        animate={{ y: [-5, 5, -5] }} 
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M120 120 L160 80 L170 90 L130 130 Z" fill="#1E6F43" />
        <path d="M120 120 L115 135 L130 130 Z" fill="#6BBF73" />
        <path d="M150 70 L160 80 L175 65 L165 55 Z" fill="#0F3D2E" />
      </motion.g>

      {/* Social Icons */}
      <motion.circle cx="160" cy="150" r="10" fill="#6BBF73" 
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.circle cx="130" cy="165" r="10" fill="#2F8F5B" 
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
    </svg>
  );
}
