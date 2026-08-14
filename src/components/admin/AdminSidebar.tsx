'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/services', label: 'Services', icon: '🛠️' },
    { href: '/admin/portfolio', label: 'Portfolio', icon: '💼' },
    { href: '/admin/testimonials', label: 'Testimonials', icon: '💬' },
    { href: '/admin/faqs', label: 'FAQs', icon: '❓' },
    { href: '/admin/leads', label: 'Leads', icon: '📥' },
    { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore error
    }
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 bg-dark-green text-white min-h-screen p-5 flex flex-col justify-between shrink-0 shadow-lg border-r border-white/10">
      <div>
        {/* Brand Header */}
        <Link href="/admin" className="flex items-center gap-3 pb-6 border-b border-white/10 mb-6">
          <Image src="/logo-icon.png" alt="Adivyon" width={32} height={32} className="h-8 w-8 object-contain" />
          <span className="font-heading font-bold text-lg tracking-tight text-white">
            Adivyon <span className="text-accent">Admin</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="space-y-1.5">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200',
                  isActive
                    ? 'bg-primary text-white shadow-md font-semibold'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                )}
              >
                <span className="text-base">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Info & Logout */}
      <div className="pt-6 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center font-bold text-sm text-white">
              A
            </div>
            <div className="text-xs overflow-hidden">
              <p className="font-semibold text-white truncate">Administrator</p>
              <p className="text-white/60 truncate">admin@adivyon.com</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Log out"
            className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            🚪
          </button>
        </div>
      </div>
    </aside>
  );
}
