import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Adivyon Digital',
  description: 'Ready to grow your business? Get in touch with Adivyon Digital. Based in Bhopal, Madhya Pradesh. Email: manager@adivyondigital.com',
};
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { MapEmbed } from '@/components/contact/MapEmbed';

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <section className="section-padding bg-white">
        <div className="container-main grid md:grid-cols-2 gap-12">
          <ContactForm />
          <ContactInfo />
        </div>
        <div className="container-main">
          <MapEmbed />
        </div>
      </section>
    </>
  );
}
