// ─────────────────────────────────────────────────────────────────
// app/layout.tsx
// BAB 1 — File wajib: Root Layout membungkus seluruh aplikasi
// BAB 2 — Layout System: state dipertahankan saat navigasi
//          Navbar & Footer cukup ditulis SEKALI di sini
// ─────────────────────────────────────────────────────────────────

import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// BAB 1 — Metadata untuk SEO
export const metadata: Metadata = {
  title: {
    default: 'CERC Blog',
    template: '%s | CERC Blog',
  },
  description: 'Blog Software Division CERC Universitas Diponegoro — tempat berbagi ilmu seputar web development.',
  keywords: ['Next.js', 'React', 'TypeScript', 'CERC', 'Undip'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="flex flex-col min-h-screen">
        {/* Navbar muncul di SEMUA halaman — tidak re-render saat navigasi */}
        <Navbar />

        {/* Konten halaman dirender di sini */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer muncul di SEMUA halaman */}
        <Footer />
      </body>
    </html>
  );
}
