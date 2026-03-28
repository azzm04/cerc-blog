// ─────────────────────────────────────────────────────────────────
// app/blog/page.tsx  →  URL: /blog
// BAB 1 — Static Route: folder blog/ + page.tsx = /blog
// BAB 3 — Server Component: fetch data dari database langsung
//          'use cache' agar data di-cache (Next.js 16)
// ─────────────────────────────────────────────────────────────────

import type { Metadata } from 'next';
import PostCard from '@/components/PostCard';
import { getAllPosts } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Semua artikel dari Software Division CERC Undip.',
};

// BAB 3 — async Server Component
export default async function BlogPage() {
  // fetch langsung di Server Component — tidak butuh useEffect!
  const posts = await getAllPosts();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Blog</h1>
        <p className="text-gray-500 text-lg">
          {posts.length} artikel dari Software Division CERC Undip
        </p>
      </div>

      {/* Grid Artikel */}
      {posts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">📝</div>
          <p className="text-lg font-medium">Belum ada artikel dipublish.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            // BAB 2 — PostCard adalah komponen reusable
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
