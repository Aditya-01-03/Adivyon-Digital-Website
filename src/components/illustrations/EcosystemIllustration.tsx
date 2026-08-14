'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function EcosystemIllustration() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square">
      <svg width="100%" height="100%" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="250" cy="250" r="180" stroke="#1E6F43" strokeWidth="1" strokeDasharray="5 5" />
        <circle cx="250" cy="250" r="120" stroke="#2F8F5B" strokeWidth="1" strokeDasharray="5 5" />
        <circle cx="250" cy="250" r="60" fill="#E8F5E9" />
        <text x="250" y="255" textAnchor="middle" fill="#0F3D2E" fontSize="16" fontWeight="bold">Adivyon</text>
        
        <motion.g animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} style={{ originX: '250px', originY: '250px' }}>
          <circle cx="250" cy="70" r="20" fill="#6BBF73" />
          <circle cx="250" cy="430" r="20" fill="#6BBF73" />
          <circle cx="70" cy="250" r="20" fill="#6BBF73" />
          <circle cx="430" cy="250" r="20" fill="#6BBF73" />
        </motion.g>

        <motion.g animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} style={{ originX: '250px', originY: '250px' }}>
          <circle cx="335" cy="165" r="15" fill="#2F8F5B" />
          <circle cx="165" cy="335" r="15" fill="#2F8F5B" />
          <circle cx="165" cy="165" r="15" fill="#2F8F5B" />
          <circle cx="335" cy="335" r="15" fill="#2F8F5B" />
        </motion.g>
      </svg>
    </div>
  );
}
