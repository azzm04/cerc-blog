// components/Footer.tsx
// BAB 2 — Bagian dari Root Layout, muncul di semua halaman

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">
          © 2026 CERC Blog — Software Division Universitas Diponegoro
        </p>
        <div className="flex gap-6 text-sm text-gray-500">
          <Link href="/about"   className="hover:text-blue-600 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">Kontak</Link>
          <Link href="/blog"    className="hover:text-blue-600 transition-colors">Blog</Link>
        </div>
      </div>
    </footer>
  );
}
