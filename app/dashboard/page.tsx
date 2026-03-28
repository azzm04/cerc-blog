// app/dashboard/page.tsx
import Link from 'next/link';
import { getDashboardStats, getPostsByAuthor } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  // Ambil session user yang sedang login
  const session = await auth();
  if (!session?.user?.id) redirect('/login');

  const authorId = session.user.id;

  // Promise.all: fetch stats & posts bersamaan
  const [stats, recentPosts] = await Promise.all([
    getDashboardStats(authorId),
    getPostsByAuthor(authorId),
  ]);

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Selamat datang, {session.user.name}!
        </p>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total Artikel', value: stats.totalPosts,     icon: '📝' },
          { label: 'Dipublish',     value: stats.publishedPosts, icon: '✅' },
          { label: 'Draft',         value: stats.draftPosts,     icon: '📋' },
          { label: 'Total Views',   value: stats.totalViews,     icon: '👁️' },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-extrabold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Aksi Cepat</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/posts/new"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm">
            ✏️ Tulis Artikel Baru
          </Link>
          <Link href="/dashboard/posts"
            className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm">
            📚 Lihat Semua Artikel
          </Link>
          <Link href="/blog"
            className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm">
            🌐 Lihat Blog Publik
          </Link>
        </div>
      </div>

      {/* Artikel Terbaru */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Artikel Terbaru Saya</h2>
        {recentPosts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-gray-400 mb-4">Kamu belum punya artikel.</p>
            <Link href="/dashboard/posts/new"
              className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm">
              + Tulis Artikel Pertama
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentPosts.slice(0, 5).map((post: any) => (
              <div key={post.id}
                className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 transition-colors">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{post.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{formatDate(post.createdAt)} · {post.views} views</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    post.published ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                  <Link href={`/blog/${post.slug}`}
                    className="text-xs text-blue-600 hover:underline">
                    Lihat →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}