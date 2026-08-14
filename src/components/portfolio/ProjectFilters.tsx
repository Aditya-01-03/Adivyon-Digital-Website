'use client';
import React from 'react';

export function ProjectFilters({ categories, active, onChange }: any) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {categories.map((cat: string) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
            active === cat ? 'bg-primary text-white' : 'bg-white text-heading border border-border hover:border-primary'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
