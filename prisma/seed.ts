// ─────────────────────────────────────────────────────────────────
// prisma/seed.ts
// BAB 4 — Seed data: isi database dengan data dummy untuk development
// Jalankan dengan: npx ts-node prisma/seed.ts
//                  atau: npx prisma db seed
// ─────────────────────────────────────────────────────────────────

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const db = new PrismaClient();

async function main() {
  console.log('🌱 Mulai seeding database...');

  // Hapus data lama
  await db.post.deleteMany();
  await db.user.deleteMany();
  await db.tag.deleteMany();

  // Buat tags
  const [tagNextjs, tagReact, tagTs, tagTailwind] = await Promise.all([
    db.tag.create({ data: { name: 'Next.js',    slug: 'nextjs'    } }),
    db.tag.create({ data: { name: 'React',      slug: 'react'     } }),
    db.tag.create({ data: { name: 'TypeScript', slug: 'typescript'} }),
    db.tag.create({ data: { name: 'Tailwind',   slug: 'tailwind'  } }),
  ]);

  // Buat user (password di-hash)
  const hashedPassword = await bcrypt.hash('password123', 12);

  const azzam = await db.user.create({
    data: {
      name:     'Azzam Syaiful Islam',
      email:    'azzamsyaifulislam@students.undip.ac.id',
      password: hashedPassword,
      role:     'ADMIN',
    },
  });

  const farel = await db.user.create({
    data: {
      name:     'Farel Razzan',
      email:    'farelrazzan@students.undip.ac.id',
      password: hashedPassword,
    },
  });

  // Buat artikel
  await db.post.createMany({
    data: [
      {
        title:     'Mengenal Next.js 16 dan App Router',
        slug:      'mengenal-nextjs-16-app-router',
        excerpt:   'Next.js 16 hadir dengan Turbopack stabil, directive use cache, dan banyak perubahan yang membuatnya jauh lebih powerful dari versi sebelumnya.',
        content:   '<h2>Apa itu Next.js?</h2><p>Next.js adalah framework berbasis React yang dikembangkan oleh Vercel. Versi 16 membawa banyak perubahan signifikan.</p><h2>Turbopack Stabil</h2><p>Turbopack kini menjadi bundler default dan sudah stable, memberikan kecepatan 5-10x lebih cepat dari Webpack.</p><h2>Directive use cache</h2><p>Model caching baru yang lebih eksplisit menggunakan directive <code>use cache</code> memudahkan developer mengontrol strategi caching.</p>',
        published: true,
        views:     142,
        likes:     28,
        authorId:  azzam.id,
      },
      {
        title:     'Memahami Server Component vs Client Component',
        slug:      'server-component-vs-client-component',
        excerpt:   'Perbedaan mendasar antara Server Component dan Client Component di Next.js App Router, serta kapan menggunakan masing-masing.',
        content:   '<h2>Server Component</h2><p>Server Component berjalan di server dan tidak menambah JavaScript bundle. Semua komponen di App Router adalah Server Component secara default.</p><h2>Client Component</h2><p>Client Component diperlukan saat kamu butuh interaktivitas seperti useState, useEffect, atau event handler.</p><h2>Composition Pattern</h2><p>Pola terbaik adalah membiarkan Server Component mengambil data, lalu kirimkan sebagai props ke Client Component yang membutuhkan interaktivitas.</p>',
        published: true,
        views:     98,
        likes:     19,
        authorId:  azzam.id,
      },
      {
        title:     'Setup Prisma dengan Neon PostgreSQL',
        slug:      'setup-prisma-neon-postgresql',
        excerpt:   'Panduan lengkap menghubungkan aplikasi Next.js dengan database PostgreSQL cloud menggunakan Prisma ORM dan Neon sebagai provider.',
        content:   '<h2>Mengapa Neon?</h2><p>Neon menyediakan PostgreSQL cloud dengan generous free tier yang cocok untuk project development dan produksi skala kecil.</p><h2>Instalasi Prisma</h2><p>Jalankan <code>npm install prisma @prisma/client</code> lalu <code>npx prisma init</code> untuk memulai.</p><h2>Konfigurasi Schema</h2><p>Definisikan model database di file schema.prisma, lalu jalankan <code>npx prisma db push</code> untuk sync ke database.</p>',
        published: true,
        views:     76,
        likes:     15,
        authorId:  farel.id,
      },
      {
        title:     'Tailwind CSS — Utility First yang Mengubah Cara Styling',
        slug:      'tailwind-css-utility-first',
        excerpt:   'Mengapa Tailwind CSS menjadi pilihan utama developer modern dan bagaimana cara efektif menggunakannya dalam project Next.js.',
        content:   '<h2>Utility-First CSS</h2><p>Tailwind berbeda dari framework CSS lain — alih-alih komponen siap pakai, ia menyediakan class utility kecil yang bisa dikombinasikan.</p><h2>Keunggulan Tailwind</h2><p>Tidak perlu berpindah antara file CSS dan HTML, tidak ada naming convention yang membingungkan, dan bundle size otomatis dioptimasi.</p>',
        published: true,
        views:     54,
        likes:     11,
        authorId:  farel.id,
      },
      {
        title:     'Draft: Authentication dengan NextAuth.js v5',
        slug:      'authentication-nextauth-v5',
        excerpt:   'Implementasi sistem autentikasi lengkap dengan NextAuth.js v5 di Next.js App Router.',
        content:   '<p>Artikel ini masih dalam proses penulisan...</p>',
        published: false,
        views:     0,
        likes:     0,
        authorId:  azzam.id,
      },
    ],
  });

  // Hubungkan tags ke post
  const posts = await db.post.findMany({ select: { id: true, slug: true } });

  for (const post of posts) {
    if (post.slug.includes('nextjs')) {
      await db.post.update({ where: { id: post.id }, data: { tags: { connect: [{ id: tagNextjs.id }, { id: tagReact.id }] } } });
    } else if (post.slug.includes('server')) {
      await db.post.update({ where: { id: post.id }, data: { tags: { connect: [{ id: tagNextjs.id }, { id: tagTs.id }] } } });
    } else if (post.slug.includes('prisma')) {
      await db.post.update({ where: { id: post.id }, data: { tags: { connect: [{ id: tagTs.id }] } } });
    } else if (post.slug.includes('tailwind')) {
      await db.post.update({ where: { id: post.id }, data: { tags: { connect: [{ id: tagTailwind.id }] } } });
    }
  }

  console.log('✅ Seeding selesai!');
  console.log(`   👤 2 user dibuat (password: password123)`);
  console.log(`   📝 5 artikel dibuat (4 published, 1 draft)`);
  console.log(`   🏷️  4 tag dibuat`);
}

main()
  .catch(e => { console.error('❌ Seed gagal:', e); process.exit(1); })
  .finally(() => db.$disconnect());
