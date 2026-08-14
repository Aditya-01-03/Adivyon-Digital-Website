import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';


export function ProjectCard({ project }: { project: any }) {
  return (
    <Card padding="none" hoverable className="overflow-hidden group h-full flex flex-col cursor-pointer">
      <div className="h-64 bg-gradient-to-br from-primary/20 to-accent-light relative overflow-hidden flex items-center justify-center p-6 text-center">
         <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
         <h4 className="relative z-10 text-2xl font-bold text-dark-green/50 group-hover:scale-110 transition-transform duration-500 break-words line-clamp-2">{project.title}</h4>
      </div>
      <div className="p-6 overflow-hidden flex-1 flex flex-col items-start">
        <Badge className="mb-3">{project.category}</Badge>
        <h3 className="text-xl font-bold break-words w-full truncate">{project.title}</h3>
      </div>
    </Card>
  );
}
