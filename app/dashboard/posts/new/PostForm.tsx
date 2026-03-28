// ─────────────────────────────────────────────────────────────────
// app/dashboard/posts/new/PostForm.tsx
// BAB 3 — Client Component: butuh useFormState (hook)
// BAB 4 — Server Action: form action={createPost}
//          Composition Pattern: halaman (server) → form (client)
// ─────────────────────────────────────────────────────────────────
'use client';

import { useActionState } from 'react';
import { createPost }     from '@/actions/post';
import type { FormState } from '@/types';

const initialState: FormState = { success: false, message: '' };

interface PostFormProps {
  authorId: string;
}

export default function PostForm({ authorId }: PostFormProps) {
  // BAB 4 — useActionState: hook untuk menangani status Server Action
  const [state, formAction, isPending] = useActionState(createPost, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {/* Hidden field: author ID */}
      <input type="hidden" name="authorId" value={authorId} />

      {/* Feedback dari Server Action */}
      {state.message && (
        <div className={`p-4 rounded-lg text-sm font-medium ${
          state.success
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {state.success ? '✅ ' : '❌ '}{state.message}
        </div>
      )}

      {/* Judul */}
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
          Judul Artikel <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="Contoh: Belajar Next.js dari Nol"
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     placeholder:text-gray-300"
        />
      </div>

      {/* Excerpt */}
      <div>
        <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-700 mb-2">
          Ringkasan <span className="text-red-500">*</span>
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={2}
          placeholder="Ringkasan singkat artikel yang akan tampil di card blog..."
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     placeholder:text-gray-300 resize-none"
        />
      </div>

      {/* Konten */}
      <div>
        <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
          Konten <span className="text-red-500">*</span>
          <span className="font-normal text-gray-400 ml-2">(mendukung HTML dasar)</span>
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={14}
          placeholder="<h2>Pendahuluan</h2>&#10;<p>Tulis konten artikel di sini...</p>"
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900
                     font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-transparent placeholder:text-gray-300 resize-y"
        />
      </div>

      {/* Status publish */}
      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
        <input
          id="published"
          name="published"
          type="checkbox"
          value="true"
          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
        <label htmlFor="published" className="text-sm font-medium text-gray-700 cursor-pointer">
          Publish sekarang
          <span className="block text-xs text-gray-400 font-normal">
            Jika tidak dicentang, artikel tersimpan sebagai draft
          </span>
        </label>
      </div>

      {/* Submit */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-semibold
                     hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? '⏳ Menyimpan...' : '💾 Simpan Artikel'}
        </button>
        <a
          href="/dashboard/posts"
          className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg font-semibold
                     hover:bg-gray-200 transition-colors"
        >
          Batal
        </a>
      </div>
    </form>
  );
}
