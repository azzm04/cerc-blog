// ─────────────────────────────────────────────────────────────────
// app/dashboard/posts/new/page.tsx  →  URL: /dashboard/posts/new
// BAB 4 — Server Action: form langsung terhubung ke createPost()
//          tanpa API endpoint! Gunakan useFormState untuk feedback
// ─────────────────────────────────────────────────────────────────

import type { Metadata } from 'next';
import { db } from '@/lib/db';
import PostForm from './PostForm';

export const metadata: Metadata = { title: 'Tulis Artikel Baru' };

// Halaman ini adalah Server Component
// Form interaktifnya dipisah ke PostForm.tsx (Client Component)
export default async function NewPostPage() {
  // Ambil user pertama sebagai author (BAB 5: ganti dengan session.user.id setelah setup auth)
  const user = await db.user.findFirst();
  const authorId = user?.id || 'unknown';

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Tulis Artikel Baru</h1>
        <p className="text-gray-500 mt-1">Artikel akan tersimpan ke database via Server Action.</p>
      </div>
      {/* BAB 4 — PostForm adalah Client Component karena pakai useFormState */}
      <PostForm authorId={authorId} />
    </div>
  );
}
