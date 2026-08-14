import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, padding = 'md', hoverable = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[20px] bg-white border border-border overflow-hidden transition-all duration-300',
          {
            'p-0': padding === 'none',
            'p-4': padding === 'sm',
            'p-6': padding === 'md',
            'p-8': padding === 'lg',
            'hover:-translate-y-1 hover:shadow-xl': hoverable,
          },
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

export { Card };
