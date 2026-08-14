'use client';

import React, { useState, useEffect } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StarRating } from '@/components/ui/StarRating';
import { motion, AnimatePresence } from 'framer-motion';

interface TestimonialData {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((t: any) => ({
            id: t.id,
            quote: t.review,
            author: t.clientName,
            role: `${t.designation || ''}${t.company ? ` at ${t.company}` : ''}`.trim() || 'Client',
            rating: t.rating || 5,
          }));
          setTestimonials(mapped);
          setCurrent(0);
        }
      })
      .catch(() => {
        // Fallback
      });
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1 || isHovered) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length, isHovered]);

  if (testimonials.length === 0) {
    return null;
  }

  const active = testimonials[current] || testimonials[0];

  return (
    <section className="section-padding bg-accent-light" aria-roledescription="carousel">
      <div className="container-main">
        <SectionHeading 
          badge="Testimonials"
          title="Client Success Stories"
        />
        
        <div 
          className="max-w-4xl mx-auto mt-12 min-h-[16rem] flex items-center justify-center text-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-live="polite"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id || current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center w-full"
            >
              <StarRating rating={active.rating} />
              <p className="text-2xl md:text-3xl font-medium mt-6 mb-8 text-heading italic break-words line-clamp-4 max-w-full">
                "{active.quote}"
              </p>
              <div>
                <div className="font-bold text-lg">{active.author}</div>
                <div className="text-body text-sm">{active.role}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {testimonials.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full transition-colors ${i === current ? 'bg-primary' : 'bg-primary/20'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
