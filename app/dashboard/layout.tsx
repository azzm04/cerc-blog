// ─────────────────────────────────────────────────────────────────
// app/dashboard/layout.tsx
// BAB 2 — Nested Layout: layout khusus untuk semua halaman /dashboard/*
//          Sidebar HANYA muncul di area dashboard, tidak di halaman publik
//          Di-wrap oleh Root Layout (Navbar + Footer tetap ada)
// BAB 5 — Auth check: redirect jika belum login
// ─────────────────────────────────────────────────────────────────

import type { Metadata } from 'next';
import { redirect }  from 'next/navigation';
import { auth }      from '@/lib/auth';
import Sidebar       from '@/components/Sidebar';

export const metadata: Metadata = { title: 'Dashboard' };

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // BAB 5 — Protect route: cek session di server
  // Uncomment baris ini setelah setup database & NextAuth
  // const session = await auth();
  // if (!session) redirect('/login');

  return (
    // BAB 2 — Nested Layout: Sidebar + konten halaman berdampingan
    <div className="flex flex-1">
      {/* Sidebar — komponen dari BAB 2 */}
      <Sidebar />

      {/* Konten halaman dashboard dirender di sini */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
