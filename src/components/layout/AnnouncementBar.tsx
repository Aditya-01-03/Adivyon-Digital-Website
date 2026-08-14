'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-primary text-white text-sm py-2 px-4 text-center relative overflow-hidden"
      >
        <span className="mr-2">🎉</span>
        <span className="font-medium">Special Offer:</span> Get a free digital audit for your business this month! 
        <a href="/contact" className="underline ml-2 font-bold hover:text-accent-light">Claim now</a>
        
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Dismiss"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
