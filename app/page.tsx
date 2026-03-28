// ─────────────────────────────────────────────────────────────────
// app/page.tsx  →  URL: /
// BAB 1 — File-based routing: page.tsx = halaman yang bisa diakses
// BAB 3 — Server Component: fetch data langsung tanpa useEffect
//          Promise.all untuk parallel fetching
// ─────────────────────────────────────────────────────────────────

import Link from 'next/link';
import { Suspense } from 'react';
import PostCard from '@/components/PostCard';
import { getRecentPosts } from '@/lib/data';

// BAB 3 — Komponen yang dirender dengan Suspense terpisah
async function RecentPostsSection() {
  // BAB 3 — fetch langsung di Server Component
  const posts = await getRecentPosts(3);

  if (posts.length === 0) {
    return (
      <p className="text-gray-400 col-span-3 text-center py-12">
        Belum ada artikel. Jadilah yang pertama menulis!
      </p>
    );
  }

  return (
    <>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}

// Skeleton loading untuk Suspense fallback
function PostsSkeleton() {
  return (
    <>
      {[1, 2, 3].map(i => (
        <div key={i} className="border border-gray-100 rounded-xl p-6 space-y-3 animate-pulse">
          <div className="h-4 bg-gray-100 rounded w-1/4" />
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded" />
          <div className="h-4 bg-gray-100 rounded w-5/6" />
        </div>
      ))}
    </>
  );
}

// BAB 3 — async Server Component, tidak perlu useEffect
export default async function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            Software Division — CERC Undip
          </span>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Belajar, Berbagi,<br />
            <span className="text-blue-600">Berkembang Bersama</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            Platform blog untuk anggota Software Division CERC berbagi pengetahuan
            seputar web development, dari fundamental hingga fullstack.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/blog"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold
                         hover:bg-blue-700 transition-colors shadow-md"
            >
              Baca Artikel →
            </Link>
            <Link
              href="/dashboard/posts/new"
              className="bg-white text-gray-700 px-8 py-3 rounded-xl font-semibold
                         border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Tulis Artikel
            </Link>
          </div>
        </div>
      </section>

      {/* Artikel Terbaru */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Artikel Terbaru</h2>
          <Link href="/blog" className="text-blue-600 hover:underline text-sm font-medium">
            Lihat semua →
          </Link>
        </div>

        {/* BAB 3 — Suspense: tampilkan skeleton saat data dimuat */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Suspense fallback={<PostsSkeleton />}>
            <RecentPostsSection />
          </Suspense>
        </div>
      </section>

      {/* Topik Populer */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Topik yang Dipelajari</h2>
          <p className="text-gray-500 mb-8">Kurikulum Software Division — dari fundamental hingga deployment</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {['HTML & CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Deployment', 'Authentication'].map(topic => (
              <span key={topic}
                className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:border-blue-300 hover:text-blue-600 transition-colors cursor-default">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
