import React from 'react';
import { Badge } from './Badge';
import { cn } from '@/lib/utils';

export interface SectionHeadingProps {
  badge?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeading({ badge, title, description, align = 'center', className }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-3xl mb-12', {
      'mx-auto text-center': align === 'center',
      'ml-auto text-right': align === 'right',
      'text-left': align === 'left',
    }, className)}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 break-words leading-tight tracking-tight">{title}</h2>
      {description && <p className="text-lg text-body break-words">{description}</p>}
    </div>
  );
}
