'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
}

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    order: 0,
    isActive: true,
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/faqs');
      if (!res.ok) throw new Error('Failed to load FAQs');
      const data = await res.json();
      setFaqs(data);
    } catch (err: any) {
      toast(err.message || 'Error loading FAQs', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      question: '',
      answer: '',
      order: faqs.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (faq: FAQItem) => {
    setEditingId(faq.id);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      order: faq.order,
      isActive: faq.isActive,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const url = editingId ? `/api/admin/faqs/${editingId}` : '/api/admin/faqs';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Failed to save FAQ');

      toast(editingId ? 'FAQ updated successfully' : 'FAQ created successfully', 'success');
      setIsModalOpen(false);
      fetchFaqs();
    } catch (err: any) {
      toast(err.message || 'Submission error', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, question: string) => {
    if (!confirm(`Delete FAQ "${question}"?`)) return;

    try {
      const res = await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete FAQ');
      toast('FAQ deleted successfully', 'success');
      fetchFaqs();
    } catch (err: any) {
      toast(err.message || 'Error deleting FAQ', 'error');
    }
  };

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-border shadow-xs">
        <div>
          <h2 className="text-2xl font-bold text-heading">Frequently Asked Questions</h2>
          <p className="text-xs text-body">Manage questions & answers displayed in website accordion sections</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-primary text-white font-semibold text-sm rounded-xl hover:bg-secondary transition-colors shadow-sm flex items-center gap-2"
        >
          <span>❓</span> Add New FAQ
        </button>
      </div>

      {/* Search Filter */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search FAQs by question or answer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:border-primary text-heading"
        />
        <span className="text-xs text-body font-medium">
          Showing {filteredFaqs.length} of {faqs.length}
        </span>
      </div>

      {/* FAQs List */}
      {loading ? (
        <div className="p-8 text-center text-body animate-pulse bg-white rounded-2xl border border-border">
          Loading FAQs...
        </div>
      ) : filteredFaqs.length === 0 ? (
        <div className="p-8 text-center text-body bg-white rounded-2xl border border-border">
          No FAQs found. Click "Add New FAQ" to create one.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <Card key={faq.id} className="p-6 bg-white border border-border rounded-2xl shadow-xs">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                      #{faq.order}
                    </span>
                    <h3 className="font-bold text-heading text-base">{faq.question}</h3>
                    {faq.isActive ? (
                      <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-xs font-semibold bg-gray-100 text-gray-600 rounded-full">
                        Draft
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-body leading-relaxed pl-8">{faq.answer}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openEditModal(faq)}
                    className="px-3 py-1.5 bg-surface text-heading hover:bg-primary hover:text-white rounded-lg text-xs font-semibold transition-colors border border-border"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id, faq.question)}
                    className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    Delete
                  </button>
                </div>
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
                {editingId ? 'Edit FAQ' : 'Add New FAQ'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-heading font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-heading uppercase mb-1">Question</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                  placeholder="e.g. What services do you offer?"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heading uppercase mb-1">Answer</label>
                <textarea
                  required
                  rows={4}
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                  placeholder="Detailed answer text..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-heading uppercase mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-heading uppercase mb-1">Status</label>
                  <select
                    value={formData.isActive ? 'active' : 'draft'}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })}
                    className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="active">Active (Visible)</option>
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
                  {submitting ? 'Saving...' : editingId ? 'Update FAQ' : 'Create FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
