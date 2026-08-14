import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function TeamGrid() {
  return (
    <section className="section-padding bg-gradient-to-br from-dark-green to-primary text-white">
      <div className="container-main text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Growing Team</h2>
        <p className="text-lg md:text-xl text-white/90 mb-10">
          We're always looking for talented strategists, developers, and creatives who share our passion for digital excellence.
        </p>
        <a 
          href="/contact" 
          className="inline-block bg-white text-dark-green font-semibold px-8 py-3 rounded-md hover:bg-gray-100 transition-colors shadow-lg"
        >
          Get In Touch
        </a>
      </div>
    </section>
  );
}
