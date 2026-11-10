import React from 'react';

interface CaseStudySectionProps {
  id?: string;
  badge?: string;
  title: string;
  children: React.ReactNode;
  variant?: 'cream' | 'white';
  className?: string;
}

export function CaseStudySection({
  id,
  badge,
  title,
  children,
  variant = 'cream',
  className = '',
}: CaseStudySectionProps) {
  const bgClass = variant === 'cream' ? 'bg-[#FAF8F5]' : 'bg-white';

  return (
    <section
      id={id}
      className={`py-12 sm:py-16 border-b border-gray-200 ${bgClass} ${className}`}
    >
      <div className="container-main max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-6 sm:mb-8">
          {badge && (
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#1E6F43] mb-2">
              {badge}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900 tracking-tight">
            {title}
          </h2>
        </div>
        <div className="text-gray-800 text-base sm:text-lg leading-relaxed space-y-4 sm:space-y-6">
          {children}
        </div>
      </div>
    </section>
  );
}

export default CaseStudySection;
