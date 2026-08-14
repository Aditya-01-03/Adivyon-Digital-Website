'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  industry: string;
  challenge: string;
  solution: string;
  result: string;
  isFeatured: boolean;
  order: number;
}

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Web Dev',
    industry: 'Technology',
    challenge: '',
    solution: '',
    result: '',
    isFeatured: true,
    order: 0,
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/portfolio');
      if (!res.ok) throw new Error('Failed to load portfolio projects');
      const data = await res.json();
      setProjects(data);
    } catch (err: any) {
      toast(err.message || 'Error loading portfolio', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Web Dev',
      industry: 'Technology',
      challenge: '',
      solution: '',
      result: '',
      isFeatured: true,
      order: projects.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: ProjectItem) => {
    setEditingId(p.id);
    setFormData({
      title: p.title,
      slug: p.slug,
      category: p.category,
      industry: p.industry,
      challenge: p.challenge,
      solution: p.solution,
      result: p.result,
      isFeatured: p.isFeatured,
      order: p.order,
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
      const url = editingId ? `/api/admin/portfolio/${editingId}` : '/api/admin/portfolio';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Failed to save project');

      toast(editingId ? 'Project updated' : 'Project created', 'success');
      setIsModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      toast(err.message || 'Submission error', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete project "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/portfolio/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete project');
      toast('Project deleted', 'success');
      fetchProjects();
    } catch (err: any) {
      toast(err.message || 'Error deleting project', 'error');
    }
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-border shadow-xs">
        <div>
          <h2 className="text-2xl font-bold text-heading">Portfolio Projects</h2>
          <p className="text-xs text-body">Manage case studies and featured work showcased on the website</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-primary text-white font-semibold text-sm rounded-xl hover:bg-secondary transition-colors shadow-sm flex items-center gap-2"
        >
          <span>💼</span> Add New Project
        </button>
      </div>

      {/* Search Filter */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search portfolio by title, category, or industry..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:border-primary text-heading"
        />
        <span className="text-xs text-body font-medium">
          Showing {filteredProjects.length} of {projects.length}
        </span>
      </div>

      {/* Portfolio Table */}
      <Card className="bg-white border border-border rounded-2xl shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-body animate-pulse">Loading projects...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="p-8 text-center text-body">
            No projects found. Click "Add New Project" to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface text-xs uppercase font-semibold text-body border-b border-border">
                <tr>
                  <th className="p-4">Title & Slug</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Industry</th>
                  <th className="p-4">Key Result</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-surface/50 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-heading">{p.title}</p>
                      <p className="text-xs text-primary font-mono">/portfolio#{p.slug}</p>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-md">
                        {p.category}
                      </span>
                    </td>
                    <td className="p-4 text-body text-xs font-medium">{p.industry}</td>
                    <td className="p-4 text-body text-xs font-semibold text-emerald-700 max-w-xs truncate">
                      {p.result}
                    </td>
                    <td className="p-4">
                      {p.isFeatured ? (
                        <span className="px-2 py-0.5 text-xs font-bold bg-amber-100 text-amber-800 rounded-full">
                          Featured
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                          Standard
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="px-3 py-1.5 bg-surface text-heading hover:bg-primary hover:text-white rounded-lg text-xs font-semibold transition-colors border border-border"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.title)}
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

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-border pb-4">
              <h3 className="text-lg font-bold text-heading">
                {editingId ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-heading font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-heading uppercase mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                  placeholder="e.g. TechNova Enterprise Platform"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-heading uppercase mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                    placeholder="e.g. Web Dev / Branding / AI"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-heading uppercase mb-1">Industry</label>
                  <input
                    type="text"
                    required
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                    placeholder="e.g. Technology / Healthcare"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-heading uppercase mb-1">Challenge</label>
                <textarea
                  required
                  rows={2}
                  value={formData.challenge}
                  onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                  placeholder="What was the client's initial bottleneck..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heading uppercase mb-1">Solution Delivered</label>
                <textarea
                  required
                  rows={2}
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                  placeholder="What strategy/code was built..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heading uppercase mb-1">Measurable Result</label>
                <input
                  type="text"
                  required
                  value={formData.result}
                  onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                  placeholder="e.g. 127% increase in organic lead conversions"
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
                  <label className="block text-xs font-bold text-heading uppercase mb-1">Featured Showcase</label>
                  <select
                    value={formData.isFeatured ? 'yes' : 'no'}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.value === 'yes' })}
                    className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="yes">Yes (Featured on Home)</option>
                    <option value="no">Standard</option>
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
                  {submitting ? 'Saving...' : editingId ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
