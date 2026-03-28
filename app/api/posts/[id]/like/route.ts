// ─────────────────────────────────────────────────────────────────
// app/api/posts/[id]/like/route.ts  →  URL: POST /api/posts/:id/like
// BAB 4 — Route Handler: endpoint REST untuk fitur like
//          Dipanggil oleh LikeButton.tsx (Client Component)
//          Berbeda dari Server Action — ini adalah API publik
// ─────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

type Params = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    // Increment likes di database
    const post = await db.post.update({
      where: { id },
      data: { likes: { increment: 1 } },
      select: { likes: true },
    });

    return NextResponse.json({ success: true, likes: post.likes });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal menambah like' },
      { status: 500 }
    );
  }
}
