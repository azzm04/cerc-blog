// app/dashboard/settings/page.tsx  →  URL: /dashboard/settings
// BAB 5 — Pengaturan akun user (nama, email)

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Pengaturan' };

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Pengaturan</h1>
      <p className="text-gray-500 mb-10">Kelola informasi akun kamu.</p>

      <div className="space-y-6">
        {/* Profil */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Informasi Profil</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nama</label>
              <input type="text" defaultValue="" placeholder="Nama kamu"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input type="email" defaultValue="" placeholder="email@example.com" disabled
                className="w-full border border-gray-100 bg-gray-50 rounded-lg px-4 py-2.5 text-sm text-gray-400 cursor-not-allowed" />
              <p className="text-xs text-gray-400 mt-1">Email tidak bisa diubah.</p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
              Simpan Perubahan
            </button>
          </div>
        </section>

        {/* Ganti Password */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Ganti Password</h2>
          <div className="space-y-4">
            {['Password Lama', 'Password Baru', 'Konfirmasi Password Baru'].map(label => (
              <div key={label}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
                <input type="password" placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            ))}
            <button className="bg-gray-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-900 transition-colors">
              Ganti Password
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
