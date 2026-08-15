'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        toast('Message sent successfully!', 'success');
        setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
      } else {
        const errorData = await res.json().catch(() => null);
        const errorMsg = errorData?.error || 'Failed to send message';
        throw new Error(errorMsg);
      }
    } catch (error) {
      toast('Failed to send message. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Name" name="name" value={formData.name} onChange={handleChange} required />
        <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
        <Input label="Company" name="company" value={formData.company} onChange={handleChange} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-heading">Service</label>
        <select 
          name="service" 
          value={formData.service} 
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
        >
          <option value="">Select a service...</option>
          <option value="Web Development">Web Development</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="AI Automation">AI Automation</option>
          <option value="Branding">Branding</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <Textarea label="Message" name="message" value={formData.message} onChange={handleChange} required />
      <Button type="submit" loading={loading} className="whitespace-nowrap">
        {loading ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
