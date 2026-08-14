'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription?: string | null;
  icon?: string | null;
  order: number;
  isActive: boolean;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    icon: 'code',
    order: 0,
    isActive: true,
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/services');
      if (!res.ok) throw new Error('Failed to load services');
      const data = await res.json();
      setServices(data);
    } catch (err: any) {
      toast(err.message || 'Error loading services', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      shortDescription: '',
      fullDescription: '',
      icon: 'code',
      order: services.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (service: ServiceItem) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      slug: service.slug,
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription || '',
      icon: service.icon || 'code',
      order: service.order,
      isActive: service.isActive,
    });
    setIsModalOpen(true);
  };

  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData((prev) => ({
      ...prev,
      title,
      slug: editingId ? prev.slug : slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const url = editingId ? `/api/admin/services/${editingId}` : '/api/admin/services';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Failed to save service');

      toast(editingId ? 'Service updated successfully' : 'Service created successfully', 'success');
      setIsModalOpen(false);
      fetchServices();
    } catch (err: any) {
      toast(err.message || 'Submission error', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete service');
      toast('Service deleted successfully', 'success');
      fetchServices();
    } catch (err: any) {
      toast(err.message || 'Error deleting service', 'error');
    }
  };

  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.slug.toLowerCase().includes(search.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-border shadow-xs">
        <div>
          <h2 className="text-2xl font-bold text-heading">Services Management</h2>
          <p className="text-xs text-body">Add, edit, or toggle public availability for digital services</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-primary text-white font-semibold text-sm rounded-xl hover:bg-secondary transition-colors shadow-sm flex items-center gap-2"
        >
          <span>➕</span> Add New Service
        </button>
      </div>

      {/* Search Filter */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search services by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:border-primary text-heading"
        />
        <span className="text-xs text-body font-medium">
          Showing {filteredServices.length} of {services.length}
        </span>
      </div>

      {/* Services Table */}
      <Card className="bg-white border border-border rounded-2xl shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-body animate-pulse">Loading services...</div>
        ) : filteredServices.length === 0 ? (
          <div className="p-8 text-center text-body">
            No services found. Click "Add New Service" to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface text-xs uppercase font-semibold text-body border-b border-border">
                <tr>
                  <th className="p-4">Order</th>
                  <th className="p-4">Title & Slug</th>
                  <th className="p-4">Short Description</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-surface/50 transition-colors">
                    <td className="p-4 font-mono text-xs text-body">{service.order}</td>
                    <td className="p-4">
                      <p className="font-bold text-heading">{service.title}</p>
                      <p className="text-xs text-primary font-mono">/services/{service.slug}</p>
                    </td>
                    <td className="p-4 text-body max-w-md line-clamp-2">
                      {service.shortDescription}
                    </td>
                    <td className="p-4">
                      {service.isActive ? (
                        <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full">
                          Active
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 text-xs font-semibold bg-gray-100 text-gray-600 rounded-full">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(service)}
                        className="px-3 py-1.5 bg-surface text-heading hover:bg-primary hover:text-white rounded-lg text-xs font-semibold transition-colors border border-border"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(service.id, service.title)}
                        className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg text-xs font-semibold transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-border pb-4">
              <h3 className="text-lg font-bold text-heading">
                {editingId ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-heading font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-heading uppercase mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                  placeholder="e.g. Website Development"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heading uppercase mb-1">URL Slug</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary font-mono text-xs"
                  placeholder="e.g. website-development"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heading uppercase mb-1">Short Description</label>
                <textarea
                  required
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                  placeholder="Brief 1-2 sentence summary for cards..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heading uppercase mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                  placeholder="Detailed description for the standalone service page..."
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
                    <option value="active">Active (Published)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-body hover:text-heading"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-secondary transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingId ? 'Update Service' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
