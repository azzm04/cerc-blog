// ─────────────────────────────────────────────────────────────────
// types/index.ts
// Definisi TypeScript types yang dipakai di seluruh aplikasi
// ─────────────────────────────────────────────────────────────────

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  views: number;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: Author;
  tags: Tag[];
};

export type Author = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
};

// Props untuk halaman dengan dynamic route [slug]
// BAB 2 — params bersifat Promise di Next.js 15/16
export type SlugPageProps = {
  params: Promise<{ slug: string }>;
};

// Status form untuk Server Actions — BAB 4
export type FormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};
