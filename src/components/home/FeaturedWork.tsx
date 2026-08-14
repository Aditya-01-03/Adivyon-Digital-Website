'use client';

import React, { useEffect, useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const CATEGORIES = ['All', 'Web Dev', 'Marketing', 'Branding', 'AI Automation'];


interface ProjectData {
  id: string;
  title: string;
  category: string;
  slug?: string;
  result?: string;
}

export function FeaturedWork() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects, setProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(() => {
        // Fallback
      });
  }, []);

  if (projects.length === 0) {
    return null;
  }

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section className="section-padding bg-surface">
      <div className="container-main">
        <SectionHeading 
          badge="Portfolio"
          title="Featured Work"
          description="A selection of our recent success stories."
        />
        
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                activeCategory === cat ? 'bg-primary text-white shadow-sm' : 'bg-white text-heading border border-border hover:border-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <motion.div layout className="grid md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id || idx}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Link href="/portfolio">
                  <Card padding="none" hoverable className="overflow-hidden group h-full flex flex-col border border-border bg-white rounded-2xl">
                    <div className="h-64 bg-gradient-to-br from-primary/20 via-accent-light to-primary/10 relative overflow-hidden flex items-center justify-center p-6 text-center">
                       <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                       <div className="relative z-10 space-y-2">
                         <h4 className="text-2xl font-bold text-dark-green group-hover:scale-105 transition-transform duration-500 break-words line-clamp-2">
                           {project.title}
                         </h4>
                         {project.result && (
                           <span className="inline-block px-3 py-1 bg-white/90 text-primary text-xs font-bold rounded-full shadow-xs">
                             {project.result}
                           </span>
                         )}
                       </div>
                    </div>
                    <div className="p-6 overflow-hidden flex-1 flex flex-col items-start justify-between">
                      <div>
                        <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">{project.category}</Badge>
                        <h3 className="text-xl font-bold text-heading break-words w-full truncate">{project.title}</h3>
                      </div>
                      <span className="text-xs font-semibold text-primary mt-4 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        View Case Study →
                      </span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
