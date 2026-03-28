// ─────────────────────────────────────────────────────────────────
// lib/utils.ts
// Fungsi utilitas yang dipakai di seluruh aplikasi
// ─────────────────────────────────────────────────────────────────

// Format tanggal ke bahasa Indonesia
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// Buat slug dari judul artikel
// Contoh: "Belajar Next.js 16" → "belajar-nextjs-16"
export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Potong teks untuk excerpt
export function truncate(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}

// Hitung estimasi waktu baca artikel
export function readingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} menit baca`;
}
