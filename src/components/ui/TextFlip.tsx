'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface TextFlipProps {
  words: string[];
  interval?: number;
}

export function TextFlip({ words, interval = 3000 }: TextFlipProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <div className="relative inline-block overflow-hidden h-[1.2em] min-w-[6em] text-primary align-bottom" aria-live="polite" aria-atomic="true">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
          className="absolute inset-0 block font-bold"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
