// app/dashboard/posts/page.tsx  →  URL: /dashboard/posts
// BAB 4 — Server Actions: tombol hapus & toggle publish memanggil Server Action
// BAB 5 — Auth: hanya tampilkan artikel milik user yang login

import Link from 'next/link';
import { getPostsByAuthor } from '@/lib/data';
import { deletePost, togglePublish } from '@/actions/post';
import { formatDate } from '@/lib/utils';

const DUMMY_AUTHOR_ID = 'dummy-user-id';

export default async function DashboardPostsPage() {
  // Uncomment setelah database terhubung:
  // const posts = await getPostsByAuthor(DUMMY_AUTHOR_ID);
  const posts: any[] = [];

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Artikel Saya</h1>
          <p className="text-gray-500 mt-1">{posts.length} artikel total</p>
        </div>
        <Link
          href="/dashboard/posts/new"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
        >
          + Tulis Artikel
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-100">
          <div className="text-5xl mb-4">📝</div>
          <p className="text-gray-500 mb-6">Belum ada artikel. Mulai menulis sekarang!</p>
          <Link
            href="/dashboard/posts/new"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Tulis Artikel Pertama
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post: any) => (
            <div key={post.id}
              className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
              <div className="flex-1 min-w-0 mr-4">
                <p className="font-semibold text-gray-900 truncate">{post.title}</p>
                <p className="text-xs text-gray-400 mt-1">{formatDate(post.createdAt)} · {post.views} views</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Status badge */}
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                  post.published ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {post.published ? 'Published' : 'Draft'}
                </span>

                {/* Lihat di blog */}
                <Link href={`/blog/${post.slug}`}
                  className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
                  Lihat
                </Link>

                {/* BAB 4 — Server Action: toggle publish dengan form */}
                <form action={togglePublish.bind(null, post.id, post.published)}>
                  <button type="submit"
                    className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 transition-colors font-medium">
                    {post.published ? 'Unpublish' : 'Publish'}
                  </button>
                </form>

                {/* BAB 4 — Server Action: hapus artikel */}
                <form action={deletePost.bind(null, post.id)}>
                  <button type="submit"
                    className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
                    onClick={e => { if (!confirm('Yakin ingin menghapus artikel ini?')) e.preventDefault(); }}>
                    Hapus
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
