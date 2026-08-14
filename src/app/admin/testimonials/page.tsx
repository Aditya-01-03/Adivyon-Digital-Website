'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

interface TestimonialItem {
  id: string;
  clientName: string;
  company: string;
  designation: string;
  review: string;
  rating: number;
  photo?: string | null;
  isPublished: boolean;
  order: number;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    clientName: '',
    company: '',
    designation: '',
    review: '',
    rating: 5,
    isPublished: true,
    order: 0,
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/testimonials');
      if (!res.ok) throw new Error('Failed to load testimonials');
      const data = await res.json();
      setTestimonials(data);
    } catch (err: any) {
      toast(err.message || 'Error loading testimonials', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      clientName: '',
      company: '',
      designation: '',
      review: '',
      rating: 5,
      isPublished: true,
      order: testimonials.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (t: TestimonialItem) => {
    setEditingId(t.id);
    setFormData({
      clientName: t.clientName,
      company: t.company || '',
      designation: t.designation || '',
      review: t.review,
      rating: t.rating,
      isPublished: t.isPublished,
      order: t.order,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const url = editingId ? `/api/admin/testimonials/${editingId}` : '/api/admin/testimonials';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Failed to save testimonial');

      toast(editingId ? 'Testimonial updated' : 'Testimonial created', 'success');
      setIsModalOpen(false);
      fetchTestimonials();
    } catch (err: any) {
      toast(err.message || 'Submission error', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete testimonial from "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete testimonial');
      toast('Testimonial deleted', 'success');
      fetchTestimonials();
    } catch (err: any) {
      toast(err.message || 'Error deleting testimonial', 'error');
    }
  };

  const filteredTestimonials = testimonials.filter(
    (t) =>
      t.clientName.toLowerCase().includes(search.toLowerCase()) ||
      t.company.toLowerCase().includes(search.toLowerCase()) ||
      t.review.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-border shadow-xs">
        <div>
          <h2 className="text-2xl font-bold text-heading">Client Testimonials</h2>
          <p className="text-xs text-body">Manage customer reviews and client endorsements displayed on the website</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-primary text-white font-semibold text-sm rounded-xl hover:bg-secondary transition-colors shadow-sm flex items-center gap-2"
        >
          <span>💬</span> Add Testimonial
        </button>
      </div>

      {/* Search Filter */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search testimonials by client name, company, or text..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:border-primary text-heading"
        />
        <span className="text-xs text-body font-medium">
          Showing {filteredTestimonials.length} of {testimonials.length}
        </span>
      </div>

      {/* Testimonials Grid */}
      {loading ? (
        <div className="p-8 text-center text-body animate-pulse bg-white rounded-2xl border border-border">
          Loading testimonials...
        </div>
      ) : filteredTestimonials.length === 0 ? (
        <div className="p-8 text-center text-body bg-white rounded-2xl border border-border">
          No testimonials found. Click "Add Testimonial" to create one.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((t) => (
            <Card key={t.id} className="p-6 bg-white border border-border rounded-2xl shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-heading text-lg">{t.clientName}</h3>
                    <p className="text-xs text-body">{t.designation} {t.company ? `at ${t.company}` : ''}</p>
                  </div>
                  {t.isPublished ? (
                    <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full">
                      Published
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-xs font-semibold bg-gray-100 text-gray-600 rounded-full">
                      Draft
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 mb-3 text-amber-400">
                  {'★'.repeat(t.rating)}
                  {'☆'.repeat(5 - t.rating)}
                </div>

                <p className="text-sm text-body line-clamp-4 italic mb-6">"{t.review}"</p>
              </div>

              <div className="pt-4 border-t border-border flex justify-end gap-2">
                <button
                  onClick={() => openEditModal(t)}
                  className="px-3 py-1.5 bg-surface text-heading hover:bg-primary hover:text-white rounded-lg text-xs font-semibold transition-colors border border-border"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t.id, t.clientName)}
                  className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Delete
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-border pb-4">
              <h3 className="text-lg font-bold text-heading">
                {editingId ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-heading font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-heading uppercase mb-1">Client Name</label>
                <input
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                  placeholder="e.g. Jane Doe"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-heading uppercase mb-1">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                    placeholder="e.g. TechNova"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-heading uppercase mb-1">Designation</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                    placeholder="e.g. CMO"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-heading uppercase mb-1">Review Content</label>
                <textarea
                  required
                  rows={4}
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                  placeholder="Client review text..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-heading uppercase mb-1">Rating (1-5)</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                  >
                    <option value={5}>5 Stars (★★★★★)</option>
                    <option value={4}>4 Stars (★★★★☆)</option>
                    <option value={3}>3 Stars (★★★☆☆)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-heading uppercase mb-1">Status</label>
                  <select
                    value={formData.isPublished ? 'published' : 'draft'}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.value === 'published' })}
                    className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-body">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-secondary transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingId ? 'Update Testimonial' : 'Create Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
