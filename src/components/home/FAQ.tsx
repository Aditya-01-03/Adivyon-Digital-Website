'use client';

import React, { useEffect, useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accordion, AccordionItem } from '@/components/ui/Accordion';
import { FAQ_ITEMS as FALLBACK_FAQS } from '@/lib/constants';

interface FAQData {
  id?: string;
  question: string;
  answer: string;
}

export function FAQ() {
  const [faqs, setFaqs] = useState<FAQData[]>(FALLBACK_FAQS);

  useEffect(() => {
    fetch('/api/faqs')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFaqs(data);
        }
      })
      .catch(() => {
        // Fallback
      });
  }, []);

  return (
    <section className="section-padding bg-surface">
      <div className="container-main max-w-4xl">
        <SectionHeading 
          badge="FAQ"
          title="Common Questions"
        />
        
        <Accordion className="mt-12">
          {faqs.map((item, i) => (
            <AccordionItem key={item.id || i} title={item.question}>
              {item.answer}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
