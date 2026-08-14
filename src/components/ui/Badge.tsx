import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline';
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-colors whitespace-nowrap truncate max-w-full',
          variant === 'default' && 'bg-accent-light text-primary border border-primary/20',
          variant === 'outline' && 'bg-transparent text-heading border border-border',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Badge.displayName = 'Badge';

export default Badge;
