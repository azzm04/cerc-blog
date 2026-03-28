// ─────────────────────────────────────────────────────────────────
// components/PostCard.tsx
// BAB 2 — Komponen reusable, menerima data via props
// BAB 3 — Server Component: tidak ada state atau event handler
// ─────────────────────────────────────────────────────────────────

import Link from 'next/link';
import { formatDate, readingTime } from '@/lib/utils';
import type { Post } from '@/types';

type PostCardProps = {
  post: Post;
};

// Server Component — tidak butuh 'use client'
export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-blue-200 transition-all duration-200 bg-white flex flex-col">
      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="flex gap-2 mb-3 flex-wrap">
          {post.tags.map(tag => (
            <span
              key={tag.id}
              className="text-xs font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded-full"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Judul */}
      <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
        {post.title}
      </h2>

      {/* Excerpt */}
      <p className="text-gray-500 text-sm line-clamp-3 flex-1 mb-4">
        {post.excerpt}
      </p>

      {/* Meta info */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">
            {post.author.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-xs font-medium text-gray-700">{post.author.name}</p>
            <p className="text-xs text-gray-400">{formatDate(post.createdAt)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span>{readingTime(post.content)}</span>
          <span>{post.views} views</span>
        </div>
      </div>

      {/* Link ke detail — BAB 2: Dynamic Route /blog/[slug] */}
      <Link
        href={`/blog/${post.slug}`}
        className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
      >
        Baca selengkapnya →
      </Link>
    </article>
  );
}
