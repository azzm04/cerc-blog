// ─────────────────────────────────────────────────────────────────
// middleware.ts  (di root project, sejajar dengan app/)
// BAB 5 — Proteksi route: redirect ke /login jika belum autentikasi
//          Middleware berjalan di Edge Runtime sebelum halaman dirender
// ─────────────────────────────────────────────────────────────────

import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Route yang membutuhkan login
const PROTECTED_ROUTES = ['/dashboard'];

export default auth(function middleware(req) {
  const { pathname } = req.nextUrl;

  // Cek apakah route saat ini termasuk protected route
  const isProtected = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

  // Jika protected dan belum login → redirect ke halaman login
  if (isProtected && !req.auth) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Jika sudah login tapi akses /login atau /register → redirect ke dashboard
  if (req.auth && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
});

// Konfigurasi: matcher menentukan route mana yang diproses middleware
export const config = {
  matcher: [
    // Proses semua route kecuali asset statis dan API auth
    '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
  ],
};
