'use client';

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Using margin: '0px' and once: true ensures it triggers reliably on mobile viewports
  const isInView = useInView(ref, { once: true, margin: '0px' });
  const shouldReduceMotion = useReducedMotion();

  const getDirectionOffset = () => {
    if (shouldReduceMotion) return {};
    switch (direction) {
      case 'up':
        return { y: 20 };
      case 'down':
        return { y: -20 };
      case 'left':
        return { x: -20 };
      case 'right':
        return { x: 20 };
      case 'none':
        return {};
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...getDirectionOffset() }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...getDirectionOffset() }}
      transition={{
        duration: shouldReduceMotion ? 0.1 : 0.45,
        delay: shouldReduceMotion ? 0 : Math.min(delay, 0.2),
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;
