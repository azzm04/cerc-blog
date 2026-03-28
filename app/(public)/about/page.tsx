// ─────────────────────────────────────────────────────────────────
// app/(public)/about/page.tsx  →  URL: /about
// BAB 2 — Route Groups: folder (public) TIDAK muncul di URL
//          /about bukan /(public)/about
// ─────────────────────────────────────────────────────────────────

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description: 'Tentang CERC Blog dan Software Division Universitas Diponegoro.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Tentang Kami</h1>
      <p className="text-xl text-gray-500 mb-12">
        CERC Blog adalah platform berbagi ilmu milik Software Division
        Computer Engineering Research Club Universitas Diponegoro.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Apa itu CERC?</h2>
          <p className="text-gray-600 leading-relaxed">
            CERC (Computer Engineering Research Club) adalah organisasi mahasiswa di Teknik Komputer
            Universitas Diponegoro yang berfokus pada pengembangan riset dan keahlian teknis anggotanya.
            Software Division adalah divisi yang bertanggung jawab pada pengembangan perangkat lunak
            dan web development.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Tentang Blog Ini</h2>
          <p className="text-gray-600 leading-relaxed">
            Blog ini dibangun sebagai bagian dari Final Project kurikulum Next.js &amp; Fullstack Development.
            Setiap fitur dalam blog ini mencerminkan konsep yang dipelajari di setiap bab, mulai dari
            routing, layout system, data fetching, server actions, autentikasi, hingga deployment.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Teknologi yang Digunakan</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              ['Next.js 16', 'Framework fullstack'],
              ['React 19', 'UI library'],
              ['TypeScript', 'Type safety'],
              ['Tailwind CSS', 'Styling'],
              ['Prisma', 'ORM'],
              ['PostgreSQL', 'Database'],
              ['NextAuth.js', 'Authentication'],
              ['Vercel', 'Deployment'],
              ['Neon', 'Database cloud'],
            ].map(([tech, desc]) => (
              <div key={tech} className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                <p className="font-semibold text-gray-800 text-sm">{tech}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="pt-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Lihat Artikel →
          </Link>
        </div>
      </div>
    </div>
  );
}
