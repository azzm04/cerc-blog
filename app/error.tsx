// app/error.tsx
// BAB 3 — Error UI: menangkap error agar aplikasi tidak crash total
// WAJIB 'use client' karena menggunakan error boundary React
'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Root Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="text-6xl mb-6">😵</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Terjadi Kesalahan</h2>
      <p className="text-gray-500 mb-8 max-w-md">{error.message || 'Sesuatu yang tidak terduga terjadi.'}</p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Coba Lagi
        </button>
        <Link
          href="/"
          className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
        >
          Kembali ke Home
        </Link>
      </div>
    </div>
  );
}
