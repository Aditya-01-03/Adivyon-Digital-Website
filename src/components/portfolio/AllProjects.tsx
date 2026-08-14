'use client';
import React, { useState } from 'react';
import { ProjectFilters } from './ProjectFilters';
import { ProjectCard } from './ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';

const PROJECTS = [
  { id: 1, title: 'TechNova Platform', category: 'Web Dev' },
  { id: 2, title: 'EcoLife Rebrand', category: 'Branding' },
  { id: 3, title: 'GrowthBoost SEO', category: 'Marketing' },
  { id: 4, title: 'FinSmart App', category: 'Web Dev' },
];

export function AllProjects() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <ProjectFilters categories={['All', 'Web Dev', 'Marketing', 'Branding']} active={active} onChange={setActive} />
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map(p => (
              <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
