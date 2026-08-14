'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

interface LeadItem {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const { toast } = useToast();

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/leads');
      if (!res.ok) throw new Error('Failed to load leads');
      const data = await res.json();
      setLeads(data);
    } catch (err: any) {
      toast(err.message || 'Error loading leads', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: 'PATCH' });
      if (!res.ok) throw new Error('Failed to mark lead as read');
      toast('Lead status updated', 'success');
      fetchLeads();
    } catch (err: any) {
      toast(err.message || 'Error updating lead', 'error');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete lead enquiry from "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete lead');
      toast('Lead deleted', 'success');
      if (selectedLead?.id === id) setSelectedLead(null);
      fetchLeads();
    } catch (err: any) {
      toast(err.message || 'Error deleting lead', 'error');
    }
  };

  const viewLead = (lead: LeadItem) => {
    setSelectedLead(lead);
    if (!lead.isRead) {
      markAsRead(lead.id);
    }
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      (l.company && l.company.toLowerCase().includes(search.toLowerCase())) ||
      (l.service && l.service.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-border shadow-xs">
        <div>
          <h2 className="text-2xl font-bold text-heading">Contact Lead Enquiries</h2>
          <p className="text-xs text-body">Manage customer inquiries submitted via public contact forms</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
            {leads.filter((l) => !l.isRead).length} Unread
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
            {leads.length} Total
          </span>
        </div>
      </div>

      {/* Search Filter */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search leads by name, email, company, or service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:border-primary text-heading"
        />
        <span className="text-xs text-body font-medium">
          Showing {filteredLeads.length} of {leads.length}
        </span>
      </div>

      {/* Leads Table */}
      <Card className="bg-white border border-border rounded-2xl shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-body animate-pulse">Loading leads...</div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-8 text-center text-body">
            No contact leads found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface text-xs uppercase font-semibold text-body border-b border-border">
                <tr>
                  <th className="p-4">Status</th>
                  <th className="p-4">Client Name & Email</th>
                  <th className="p-4">Company & Phone</th>
                  <th className="p-4">Service Requested</th>
                  <th className="p-4">Date Received</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-surface/50 transition-colors">
                    <td className="p-4">
                      {lead.isRead ? (
                        <span className="px-2.5 py-1 text-xs font-semibold bg-gray-100 text-gray-600 rounded-full">
                          Read
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 text-xs font-bold bg-amber-100 text-amber-800 rounded-full">
                          New
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-heading">{lead.name}</p>
                      <a href={`mailto:${lead.email}`} className="text-xs text-primary hover:underline">
                        {lead.email}
                      </a>
                    </td>
                    <td className="p-4 text-xs text-body">
                      <p className="font-medium text-heading">{lead.company || 'N/A'}</p>
                      <p>{lead.phone || 'N/A'}</p>
                    </td>
                    <td className="p-4 text-xs font-semibold text-heading">
                      {lead.service || 'General Inquiry'}
                    </td>
                    <td className="p-4 text-xs text-body">
                      {new Date(lead.createdAt).toLocaleDateString()} {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => viewLead(lead)}
                        className="px-3 py-1.5 bg-primary text-white hover:bg-secondary rounded-lg text-xs font-semibold transition-colors"
                      >
                        View Message
                      </button>
                      <button
                        onClick={() => handleDelete(lead.id, lead.name)}
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

      {/* View Message Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-heading">{selectedLead.name}</h3>
                <p className="text-xs text-body">{selectedLead.email} • {selectedLead.phone || 'No phone'}</p>
              </div>
              <button onClick={() => setSelectedLead(null)} className="text-gray-400 hover:text-heading font-bold">
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4 bg-surface p-3 rounded-xl border border-border text-xs">
                <div>
                  <p className="text-body font-semibold">Company:</p>
                  <p className="text-heading font-bold">{selectedLead.company || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-body font-semibold">Service Interest:</p>
                  <p className="text-primary font-bold">{selectedLead.service || 'General Inquiry'}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-heading uppercase mb-2">Message Body</p>
                <div className="p-4 bg-surface rounded-xl border border-border text-heading leading-relaxed whitespace-pre-wrap">
                  {selectedLead.message}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex justify-between items-center">
              <a
                href={`mailto:${selectedLead.email}?subject=Re:%20Inquiry%20with%20Adivyon%20Digital`}
                className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-secondary transition-colors"
              >
                ✉ Reply via Email
              </a>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 text-xs font-semibold text-body hover:text-heading"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
