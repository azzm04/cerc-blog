// app/not-found.tsx — Halaman 404 kustom
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <div className="text-8xl font-black text-blue-100 mb-4 select-none">404</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Halaman Tidak Ditemukan</h2>
      <p className="text-gray-500 mb-8">Halaman yang kamu cari tidak ada atau sudah dihapus.</p>
      <Link href="/" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
        ← Kembali ke Home
      </Link>
    </div>
  );
}
