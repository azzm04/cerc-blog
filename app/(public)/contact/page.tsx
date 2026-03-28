// app/(public)/contact/page.tsx  →  URL: /contact
// BAB 2 — Route Group: folder (public) tidak muncul di URL

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Kontak' };

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Kontak</h1>
      <p className="text-gray-500 mb-10">
        Punya pertanyaan atau ingin berkolaborasi? Hubungi kami melalui saluran berikut.
      </p>
      <div className="space-y-4">
        {[
          { icon: '📧', label: 'Email', value: 'azzmsyaifull@gmail.com' },
          { icon: '🐙', label: 'GitHub', value: 'github.com/azzm04' },
          { icon: '📍', label: 'Lokasi', value: 'Teknik Komputer, Universitas Diponegoro, Semarang' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-2xl">{item.icon}</span>
            <div>
              <p className="text-xs text-gray-400 font-medium">{item.label}</p>
              <p className="text-gray-800 font-semibold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
