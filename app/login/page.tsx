// ─────────────────────────────────────────────────────────────────
// app/login/page.tsx  →  URL: /login
// BAB 5 — Autentikasi: halaman login kustom untuk NextAuth.js
// ─────────────────────────────────────────────────────────────────

import type { Metadata } from 'next';
import LoginForm from './LoginForm';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Login' };

export default function LoginPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-extrabold text-blue-600">CERC Blog</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">Masuk ke Akun</h1>
          <p className="text-gray-500 text-sm">
            Belum punya akun?{' '}
            <Link href="/register" className="text-blue-600 font-semibold hover:underline">Daftar di sini</Link>
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
