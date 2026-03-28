// ─────────────────────────────────────────────────────────────────
// components/LikeButton.tsx
// BAB 3 — Client Component: contoh Composition Pattern
//
// Server Component (PostDetailPage) fetch data jumlah likes dari DB,
// lalu kirimkan ke sini via props.
// Client Component ini hanya bertugas mengelola interaksi UI.
// ─────────────────────────────────────────────────────────────────
'use client';

import { useState } from 'react';

type LikeButtonProps = {
  postId: string;
  initialLikes: number;
};

export default function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    if (liked || isLoading) return;
    setIsLoading(true);

    try {
      // Optimistic update: UI berubah dulu sebelum server selesai
      setLiked(true);
      setLikes(prev => prev + 1);

      // Panggil API untuk simpan ke database
      await fetch(`/api/posts/${postId}/like`, { method: 'POST' });
    } catch {
      // Rollback jika gagal
      setLiked(false);
      setLikes(prev => prev - 1);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={liked || isLoading}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold
                  transition-all duration-200
                  ${liked
                    ? 'bg-red-50 border-red-200 text-red-500 cursor-default'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-500'
                  }`}
    >
      <span className="text-lg">{liked ? '❤️' : '🤍'}</span>
      <span>{likes}</span>
    </button>
  );
}
