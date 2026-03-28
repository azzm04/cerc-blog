// ─────────────────────────────────────────────────────────────────
// lib/db.ts
// BAB 4 — Database & ORM dengan Prisma
//
// Menggunakan singleton pattern agar koneksi database tidak
// dibuat ulang setiap kali module di-import (penting di dev mode)
// ─────────────────────────────────────────────────────────────────

import { PrismaClient } from '@prisma/client';

// Deklarasi global agar singleton tersimpan antar hot-reload
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// Simpan instance di global hanya di development
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}
