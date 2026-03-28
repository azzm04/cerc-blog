// ─────────────────────────────────────────────────────────────────
// actions/auth.ts
// BAB 5 — Autentikasi dengan NextAuth.js
// ─────────────────────────────────────────────────────────────────
'use server';

import { db }       from '@/lib/db';
import bcrypt       from 'bcryptjs';
import { redirect } from 'next/navigation';
import type { FormState } from '@/types';

// ── Registrasi user baru ─────────────────────────────────────────
export async function registerUser(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name     = formData.get('name') as string;
  const email    = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!name || !email || !password) {
    return { success: false, message: 'Semua field wajib diisi.' };
  }
  if (password.length < 8) {
    return { success: false, message: 'Password minimal 8 karakter.' };
  }

  try {
    // Cek apakah email sudah terdaftar
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return { success: false, message: 'Email sudah terdaftar.' };
    }

    // Hash password sebelum disimpan ke database
    const hashedPassword = await bcrypt.hash(password, 12);

    await db.user.create({
      data: { name, email, password: hashedPassword },
    });
  } catch {
    return { success: false, message: 'Terjadi kesalahan saat registrasi.' };
  }

  redirect('/login?registered=true');
}
