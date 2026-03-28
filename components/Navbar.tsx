// ─────────────────────────────────────────────────────────────────
// components/Navbar.tsx
// BAB 1 — Komponen <Link> untuk navigasi tanpa full reload
// BAB 2 — Komponen reusable yang dipakai di Root Layout
// BAB 5 — Menampilkan status login / tombol logout
// ─────────────────────────────────────────────────────────────────

import Link from 'next/link';

// Daftar navigasi — mudah diubah tanpa menyentuh JSX
const navLinks = [
  { href: '/',       label: 'Home'    },
  { href: '/blog',   label: 'Blog'    },
  { href: '/about',  label: 'About'   },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo — BAB 1: gunakan <Link> bukan <a> */}
        <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-700">
          CERC Blog
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Tombol Tulis & Dashboard */}
          <Link
            href="/dashboard"
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/posts/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg
                       hover:bg-blue-700 transition-colors text-sm font-semibold"
          >
            + Tulis Artikel
          </Link>
        </div>
      </nav>
    </header>
  );
}
