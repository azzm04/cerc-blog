// app/register/page.tsx  →  URL: /register
// BAB 5 — Registrasi: Server Action registerUser

import type { Metadata } from 'next';
import Link from 'next/link';
import RegisterForm from './RegisterForm';

export const metadata: Metadata = { title: 'Daftar Akun' };

export default function RegisterPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-extrabold text-blue-600">CERC Blog</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">Buat Akun Baru</h1>
          <p className="text-gray-500 text-sm">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-blue-600 font-semibold hover:underline">Masuk di sini</Link>
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
