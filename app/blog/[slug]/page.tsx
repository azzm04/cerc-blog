// ─────────────────────────────────────────────────────────────────
// app/blog/[slug]/page.tsx  →  URL: /blog/judul-artikel
// BAB 2 — Dynamic Route: [slug] menangkap nilai dari URL
//          params bersifat Promise di Next.js 15/16 → wajib await
//          generateStaticParams untuk SSG halaman dinamis
// BAB 3 — Composition Pattern: Server Component fetch data,
//          kirim ke Client Component (LikeButton) via props
// ─────────────────────────────────────────────────────────────────

import type { Metadata } from 'next';
import { notFound }       from 'next/navigation';
import Link               from 'next/link';
import LikeButton         from '@/components/LikeButton';
import { getPostBySlug, getAllPostSlugs } from '@/lib/data';
import { incrementView }  from '@/actions/post';
import { formatDate, readingTime } from '@/lib/utils';
import type { SlugPageProps } from '@/types';

// ── generateStaticParams: pre-build semua halaman artikel (SSG) ──
// BAB 2 — pengganti getStaticPaths dari Pages Router
export async function generateStaticParams() {
  return getAllPostSlugs();
}

// ── Dynamic metadata berdasarkan konten artikel ──
export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Artikel Tidak Ditemukan' };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

// ── Halaman Detail Artikel ──
export default async function BlogPostPage({ params }: SlugPageProps) {
  // BAB 2 — params adalah Promise di Next.js 16, wajib await!
  const { slug } = await params;

  // BAB 3 — fetch data langsung di Server Component
  const post = await getPostBySlug(slug);

  // Jika artikel tidak ditemukan, tampilkan halaman 404
  if (!post) notFound();

  // Catat view (Server Action — BAB 4)
  await incrementView(slug);

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-blue-600">Blog</Link>
        <span>/</span>
        <span className="text-gray-600 truncate max-w-xs">{post.title}</span>
      </nav>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {post.tags.map(tag => (
            <span key={tag.id} className="text-xs bg-blue-50 text-blue-600 font-medium px-3 py-1 rounded-full">
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Judul */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 pb-6 border-b border-gray-100 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">
            {post.author.name.charAt(0).toUpperCase()}
          </div>
          <span className="font-medium text-gray-700">{post.author.name}</span>
        </div>
        <span>{formatDate(post.createdAt)}</span>
        <span>{readingTime(post.content)}</span>
        <span>{post.views} views</span>
      </div>

      {/* Konten artikel */}
      <div
        className="prose-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Footer artikel */}
      <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
        {/* BAB 3 — Composition Pattern:
            Server Component (di sini) fetch data likes dari database,
            lalu kirimkan ke Client Component (LikeButton) via props */}
        <LikeButton postId={post.id} initialLikes={post.likes} />

        <Link
          href="/blog"
          className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
        >
          ← Kembali ke Blog
        </Link>
      </div>

      {/* Info penulis */}
      <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
            {post.author.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{post.author.name}</p>
            <p className="text-sm text-gray-500">{post.author.email}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
