'use client';

import React from 'react';

export function ServicesHero() {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-gray-200">
      <div className="container-main max-w-4xl px-4 sm:px-6 text-center space-y-4 sm:space-y-5">
        <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#1E6F43]">
          Capabilities & Practice Areas
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading text-gray-900 tracking-tight leading-tight">
          Engineering, Storytelling &amp; Strategic Execution.
        </h1>
        <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          We partner with enterprises, agricultural ventures, and mission-driven initiatives to build high-performance digital platforms, produce authentic documentary cinema, and design systems for sustainable growth.
        </p>
      </div>
    </section>
  );
}
