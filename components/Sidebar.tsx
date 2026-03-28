// ─────────────────────────────────────────────────────────────────
// components/Sidebar.tsx
// BAB 2 — Nested Layout: Sidebar khusus untuk area /dashboard
// Komponen ini HANYA muncul di halaman /dashboard/* karena
// dipasang di app/dashboard/layout.tsx (bukan root layout)
// ─────────────────────────────────────────────────────────────────

import Link from 'next/link';

const sidebarLinks = [
  { href: '/dashboard',          label: 'Overview',       icon: '📊' },
  { href: '/dashboard/posts',    label: 'Artikel Saya',   icon: '📝' },
  { href: '/dashboard/posts/new',label: 'Tulis Baru',     icon: '✏️' },
  { href: '/dashboard/settings', label: 'Pengaturan',     icon: '⚙️' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-50 border-r border-gray-200 p-4 flex-shrink-0">
      {/* Header sidebar */}
      <div className="mb-6 px-3 py-2">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Dashboard Menu
        </p>
      </div>

      {/* Navigation links */}
      <nav className="space-y-1">
        {sidebarLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      {/* Kembali ke blog publik */}
      <div className="mt-8 pt-4 border-t border-gray-200">
        <Link
          href="/blog"
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
        >
          ← Kembali ke Blog
        </Link>
      </div>
    </aside>
  );
}
