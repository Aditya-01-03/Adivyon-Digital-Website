'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

interface DashboardStats {
  totalServices: number;
  totalProjects: number;
  totalLeads: number;
  unreadLeads: number;
  totalTestimonials: number;
  totalFaqs: number;
  recentLeads: Array<{
    id: string;
    name: string;
    email: string;
    service: string | null;
    message: string;
    isRead: boolean;
    createdAt: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/dashboard');
      if (!res.ok) throw new Error('Failed to load dashboard stats');
      const data = await res.json();
      setStats(data);
    } catch (err: any) {
      toast(err.message || 'Failed to load stats', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const markLeadAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: 'PATCH' });
      if (!res.ok) throw new Error('Failed to update lead');
      toast('Lead marked as read', 'success');
      fetchDashboard();
    } catch (err: any) {
      toast(err.message || 'Error updating lead', 'error');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-dark-green via-primary to-dark-green rounded-2xl p-6 text-white shadow-md flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-1">Welcome Back, Admin 👋</h2>
          <p className="text-sm opacity-90">Manage your website services, projects, FAQs, and client leads in real time.</p>
        </div>
        <Link
          href="/admin/services"
          className="px-4 py-2 bg-white text-primary font-semibold text-sm rounded-xl shadow-sm hover:bg-accent-light transition-colors hidden sm:block"
        >
          Manage Services →
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-white border border-border rounded-2xl shadow-xs">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-semibold text-body uppercase tracking-wider">Active Services</p>
              <h3 className="text-3xl font-extrabold text-heading mt-1">{stats?.totalServices ?? 0}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl font-bold">
              🛠️
            </div>
          </div>
          <Link href="/admin/services" className="text-xs font-medium text-primary hover:underline">
            View all services →
          </Link>
        </Card>

        <Card className="p-6 bg-white border border-border rounded-2xl shadow-xs">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-semibold text-body uppercase tracking-wider">Portfolio Projects</p>
              <h3 className="text-3xl font-extrabold text-heading mt-1">{stats?.totalProjects ?? 0}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold">
              💼
            </div>
          </div>
          <Link href="/admin/portfolio" className="text-xs font-medium text-blue-600 hover:underline">
            View portfolio →
          </Link>
        </Card>

        <Card className="p-6 bg-white border border-border rounded-2xl shadow-xs">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-semibold text-body uppercase tracking-wider">Contact Leads</p>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-3xl font-extrabold text-heading">{stats?.totalLeads ?? 0}</h3>
                {(stats?.unreadLeads ?? 0) > 0 && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-amber-100 text-amber-800 rounded-full">
                    {stats?.unreadLeads} unread
                  </span>
                )}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl font-bold">
              📥
            </div>
          </div>
          <Link href="/admin/leads" className="text-xs font-medium text-amber-600 hover:underline">
            View leads →
          </Link>
        </Card>

        <Card className="p-6 bg-white border border-border rounded-2xl shadow-xs">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-semibold text-body uppercase tracking-wider">Testimonials / FAQs</p>
              <h3 className="text-3xl font-extrabold text-heading mt-1">
                {stats?.totalTestimonials ?? 0} / {stats?.totalFaqs ?? 0}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl font-bold">
              💬
            </div>
          </div>
          <div className="flex gap-3 text-xs font-medium">
            <Link href="/admin/testimonials" className="text-purple-600 hover:underline">Testimonials</Link>
            <span className="text-gray-300">•</span>
            <Link href="/admin/faqs" className="text-purple-600 hover:underline">FAQs</Link>
          </div>
        </Card>
      </div>

      {/* Recent Leads Section */}
      <Card className="p-6 bg-white border border-border rounded-2xl shadow-xs">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-bold text-heading">Recent Contact Enquiries</h3>
            <p className="text-xs text-body">Latest leads submitted through the contact form</p>
          </div>
          <Link href="/admin/leads" className="text-xs font-semibold text-primary hover:underline">
            View all leads →
          </Link>
        </div>

        {(!stats?.recentLeads || stats.recentLeads.length === 0) ? (
          <div className="py-8 text-center text-body text-sm border border-dashed border-border rounded-xl">
            No incoming leads found yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface text-xs uppercase font-semibold text-body border-b border-border">
                <tr>
                  <th className="p-3">Status</th>
                  <th className="p-3">Name & Email</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {stats.recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-surface/50 transition-colors">
                    <td className="p-3">
                      {lead.isRead ? (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md">Read</span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-bold bg-amber-100 text-amber-800 rounded-md">New</span>
                      )}
                    </td>
                    <td className="p-3">
                      <p className="font-semibold text-heading">{lead.name}</p>
                      <p className="text-xs text-body">{lead.email}</p>
                    </td>
                    <td className="p-3 text-body">{lead.service || 'General Inquiry'}</td>
                    <td className="p-3 text-body text-xs">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-right">
                      {!lead.isRead && (
                        <button
                          onClick={() => markLeadAsRead(lead.id)}
                          className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-lg hover:bg-secondary transition-colors"
                        >
                          Mark Read
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
