'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const getPageTitle = () => {
    switch (pathname) {
      case '/admin': return 'Dashboard Overview';
      case '/admin/services': return 'Services Management';
      case '/admin/portfolio': return 'Portfolio Projects';
      case '/admin/testimonials': return 'Client Testimonials';
      case '/admin/faqs': return 'Frequently Asked Questions';
      case '/admin/leads': return 'Contact Leads';
      case '/admin/settings': return 'Website Settings';
      default: return 'Admin Management';
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  };

  return (
    <header className="bg-white border-b border-border px-8 py-4 flex justify-between items-center sticky top-0 z-30 shadow-xs">
      <div>
        <h1 className="text-xl font-bold text-heading">{getPageTitle()}</h1>
        <p className="text-xs text-body">Manage site content, security settings, and incoming leads</p>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          className="text-xs font-semibold text-primary hover:text-secondary px-3 py-1.5 rounded-lg border border-primary/20 bg-primary/5 transition-colors flex items-center gap-1.5"
        >
          <span>🌐</span> View Public Site ↗
        </Link>

        <button
          onClick={handleLogout}
          className="text-xs font-medium text-red-600 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
