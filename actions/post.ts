// ─────────────────────────────────────────────────────────────────
// actions/post.ts
// BAB 4 — Server Function & Server Action
//
// Directive 'use server' menjadikan fungsi-fungsi ini sebagai
// Server Action yang bisa dipanggil langsung dari form/komponen.
// Tidak perlu membuat API endpoint terpisah!
// ─────────────────────────────────────────────────────────────────
'use server';

import { revalidatePath } from 'next/cache';
import { redirect }       from 'next/navigation';
import { db }             from '@/lib/db';
import { createSlug }     from '@/lib/utils';
import type { FormState } from '@/types';

// ── Buat artikel baru ────────────────────────────────────────────
export async function createPost(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Ambil data dari FormData
  const title     = formData.get('title') as string;
  const excerpt   = formData.get('excerpt') as string;
  const content   = formData.get('content') as string;
  const published = formData.get('published') === 'true';
  const authorId  = formData.get('authorId') as string;

  // Validasi sederhana
  if (!title || title.length < 5) {
    return { success: false, message: 'Judul minimal 5 karakter.' };
  }
  if (!content || content.length < 20) {
    return { success: false, message: 'Konten minimal 20 karakter.' };
  }

  try {
    const slug = createSlug(title);

    // Cek apakah slug sudah dipakai
    const existing = await db.post.findUnique({ where: { slug } });
    if (existing) {
      return { success: false, message: 'Judul terlalu mirip dengan artikel yang ada.' };
    }

    // Simpan ke database — langsung akses DB tanpa API!
    await db.post.create({
      data: { title, slug, excerpt, content, published, authorId },
    });

    // Revalidasi cache halaman blog agar data terbaru tampil
    revalidatePath('/blog');
    revalidatePath('/dashboard/posts');
  } catch (error) {
    return { success: false, message: 'Terjadi kesalahan. Coba lagi.' };
  }

  // Redirect setelah sukses (harus di luar try/catch)
  redirect('/dashboard/posts');
}

// ── Update artikel ───────────────────────────────────────────────
export async function updatePost(
  id: string,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const title     = formData.get('title') as string;
  const excerpt   = formData.get('excerpt') as string;
  const content   = formData.get('content') as string;
  const published = formData.get('published') === 'true';

  if (!title || !content) {
    return { success: false, message: 'Judul dan konten wajib diisi.' };
  }

  try {
    await db.post.update({
      where: { id },
      data: { title, excerpt, content, published, updatedAt: new Date() },
    });

    revalidatePath('/blog');
    revalidatePath(`/blog/${id}`);
    revalidatePath('/dashboard/posts');
  } catch {
    return { success: false, message: 'Gagal mengupdate artikel.' };
  }

  redirect('/dashboard/posts');
}

// ── Hapus artikel ────────────────────────────────────────────────
export async function deletePost(id: string, formData: FormData) {
  try {
    await db.post.delete({ where: { id } });

    // Revalidasi semua halaman yang menampilkan list post
    revalidatePath('/blog');
    revalidatePath('/dashboard/posts');
  } catch {
    console.error('Gagal menghapus artikel.');
  }
}

// ── Toggle publish/unpublish ─────────────────────────────────────
export async function togglePublish(id: string, currentState: boolean, formData: FormData) {
  try {
    await db.post.update({
      where: { id },
      data: { published: !currentState },
    });

    revalidatePath('/blog');
    revalidatePath('/dashboard/posts');
  } catch {
    console.error('Gagal mengubah status publikasi.');
  }
}

// ── Tambah view count (dipanggil saat halaman detail dibuka) ─────
export async function incrementView(slug: string) {
  await db.post.update({
    where: { slug },
    data: { views: { increment: 1 } },
  });
}
