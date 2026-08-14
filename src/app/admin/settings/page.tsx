'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

interface SettingPair {
  key: string;
  value: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({
    site_name: 'Adivyon Digital',
    site_description: 'Digital agency providing web development, marketing, and strategy.',
    contact_email: 'manager@adivyondigital.com',
    contact_phone: '+91 62683 97386',
    address: 'Bhopal, Madhya Pradesh',
    twitter_url: 'https://twitter.com/adivyon',
    linkedin_url: 'https://linkedin.com/company/adivyon',
    instagram_url: 'https://instagram.com/adivyon',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/settings');
      if (!res.ok) throw new Error('Failed to load settings');
      const data: SettingPair[] = await res.json();
      
      const map: Record<string, string> = { ...settings };
      data.forEach((s) => {
        map[s.key] = s.value;
      });
      setSettings(map);
    } catch (err: any) {
      toast(err.message || 'Error loading settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const payload = Object.entries(settings).map(([key, value]) => ({ key, value }));

      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save settings');
      toast('Website settings updated successfully', 'success');
      fetchSettings();
    } catch (err: any) {
      toast(err.message || 'Error saving settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-border shadow-xs">
        <div>
          <h2 className="text-2xl font-bold text-heading">Website Settings</h2>
          <p className="text-xs text-body">Manage global brand information, contact details, and social links</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || loading}
          className="px-5 py-2.5 bg-primary text-white font-semibold text-sm rounded-xl hover:bg-secondary transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
        >
          <span>💾</span> {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-body animate-pulse bg-white rounded-2xl border border-border">
          Loading settings...
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* General Branding */}
          <Card className="p-6 bg-white border border-border rounded-2xl shadow-xs space-y-4">
            <h3 className="text-base font-bold text-heading border-b border-border pb-3">General Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-heading uppercase mb-1">Company / Site Name</label>
                <input
                  type="text"
                  required
                  value={settings.site_name || ''}
                  onChange={(e) => handleChange('site_name', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-heading uppercase mb-1">Default Tagline</label>
                <input
                  type="text"
                  value={settings.site_description || ''}
                  onChange={(e) => handleChange('site_description', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </Card>

          {/* Contact Details */}
          <Card className="p-6 bg-white border border-border rounded-2xl shadow-xs space-y-4">
            <h3 className="text-base font-bold text-heading border-b border-border pb-3">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-heading uppercase mb-1">Primary Email</label>
                <input
                  type="email"
                  required
                  value={settings.contact_email || ''}
                  onChange={(e) => handleChange('contact_email', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-heading uppercase mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={settings.contact_phone || ''}
                  onChange={(e) => handleChange('contact_phone', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-heading uppercase mb-1">Physical Address</label>
              <input
                type="text"
                value={settings.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </Card>

          {/* Social Links */}
          <Card className="p-6 bg-white border border-border rounded-2xl shadow-xs space-y-4">
            <h3 className="text-base font-bold text-heading border-b border-border pb-3">Social Media Profiles</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-heading uppercase mb-1">Twitter / X URL</label>
                <input
                  type="url"
                  value={settings.twitter_url || ''}
                  onChange={(e) => handleChange('twitter_url', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-heading uppercase mb-1">LinkedIn URL</label>
                <input
                  type="url"
                  value={settings.linkedin_url || ''}
                  onChange={(e) => handleChange('linkedin_url', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-heading uppercase mb-1">Instagram URL</label>
                <input
                  type="url"
                  value={settings.instagram_url || ''}
                  onChange={(e) => handleChange('instagram_url', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-primary text-white font-semibold text-sm rounded-xl hover:bg-secondary transition-colors shadow-md disabled:opacity-50"
            >
              {saving ? 'Saving Changes...' : 'Save All Settings'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
