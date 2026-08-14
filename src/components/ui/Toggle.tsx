'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label, disabled = false, className }) => {
  return (
    <label className={cn('inline-flex items-center gap-3 cursor-pointer', disabled && 'opacity-50 cursor-not-allowed', className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault();
          if (!disabled) onChange(!checked);
        }}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onChange(!checked);
          }
        }}
        className={cn(
          'w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none',
          checked ? 'bg-primary' : 'bg-border'
        )}
      >
        <div
          className={cn(
            'w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
      {label && <span className="text-sm font-medium text-heading">{label}</span>}
    </label>
  );
};

export default Toggle;
