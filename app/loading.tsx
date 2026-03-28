// app/loading.tsx
// BAB 3 — Loading UI: ditampilkan otomatis saat halaman sedang dimuat

export default function RootLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Memuat...</p>
      </div>
    </div>
  );
}
