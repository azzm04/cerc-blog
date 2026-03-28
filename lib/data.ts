// ─────────────────────────────────────────────────────────────────
// lib/data.ts
// BAB 3 — Data Fetching di Server Component
//
// Semua fungsi di sini dijalankan di SERVER, bukan di browser.
// Menggunakan 'use cache' directive (BAB 3 — Next.js 16)
// ─────────────────────────────────────────────────────────────────

import { db } from '@/lib/db';
import type { Post } from '@/types';

// ── Ambil semua post yang sudah dipublish (untuk halaman /blog) ──
// BAB 3: 'use cache' untuk caching data yang jarang berubah
export async function getAllPosts() {
  'use cache';
  return db.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: { id: true, name: true, image: true, email: true } },
      tags: true,
    },
  });
}

// ── Ambil satu post berdasarkan slug (untuk halaman /blog/[slug]) ──
// BAB 2: dipakai di Dynamic Route
// BAB 3: tidak pakai 'use cache' karena views harus selalu update
export async function getPostBySlug(slug: string) {
  return db.post.findUnique({
    where: { slug, published: true },
    include: {
      author: { select: { id: true, name: true, image: true, email: true } },
      tags: true,
    },
  });
}

// ── Ambil post terbaru untuk halaman home ──
export async function getRecentPosts(limit: number = 3) {
  'use cache';
  return db.post.findMany({
    where: { published: true },
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: { id: true, name: true, image: true, email: true } },
      tags: true,
    },
  });
}

// ── Ambil semua slug (untuk generateStaticParams) ──
// BAB 2: dipakai di generateStaticParams agar halaman di-SSG
export async function getAllPostSlugs() {
  const posts = await db.post.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts.map(p => ({ slug: p.slug }));
}

// ── Ambil semua post milik user tertentu (untuk dashboard) ──
// BAB 5: halaman dashboard yang membutuhkan auth
export async function getPostsByAuthor(authorId: string) {
  return db.post.findMany({
    where: { authorId },
    orderBy: { createdAt: 'desc' },
    include: {
      tags: true,
      author: { select: { id: true, name: true, image: true, email: true } },
    },
  });
}

// ── Statistik untuk dashboard ──
export async function getDashboardStats(authorId: string) {
  const [totalPosts, publishedPosts, totalViews] = await Promise.all([
    // BAB 3: Promise.all untuk parallel fetching
    db.post.count({ where: { authorId } }),
    db.post.count({ where: { authorId, published: true } }),
    db.post.aggregate({
      where: { authorId },
      _sum: { views: true },
    }),
  ]);

  return {
    totalPosts,
    publishedPosts,
    draftPosts: totalPosts - publishedPosts,
    totalViews: totalViews._sum.views ?? 0,
  };
}
