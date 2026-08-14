import React from 'react';

export function MapEmbed() {
  return (
    <div className="w-full mt-12 bg-surface rounded-[32px] p-8 md:p-12 border border-border flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold font-heading mb-2">Adivyon Digital</h3>
      <p className="text-body text-lg mb-8 max-w-md">
        Bhopal, Madhya Pradesh<br />
        India
      </p>
      <a 
        href="https://www.google.com/maps/search/Bhopal+Madhya+Pradesh" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center font-heading font-medium rounded-xl transition-all duration-200 bg-primary text-white hover:bg-primary/90 shadow-sm px-7 py-3 text-base gap-2"
      >
        Get Directions
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
}
