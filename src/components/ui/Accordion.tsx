'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

export function Accordion({ children, className }: AccordionProps) {
  return <div className={cn('space-y-4', className)}>{children}</div>;
}

export interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export function AccordionItem({ title, children, isOpen: controlledIsOpen, onToggle, className }: AccordionItemProps) {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = React.useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;
  
  const triggerId = React.useId();
  const panelId = React.useId();

  const handleToggle = () => {
    if (isControlled && onToggle) {
      onToggle();
    } else {
      setUncontrolledIsOpen(!uncontrolledIsOpen);
    }
  };

  return (
    <div className={cn('border border-border rounded-lg overflow-hidden', className)}>
      <button
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
        onClick={handleToggle}
      >
        <span className="font-semibold text-heading text-left break-words">{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-500 shrink-0 ml-4"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className="px-6 pb-4 pt-0 text-body bg-white border-t border-border/50 break-words"
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
