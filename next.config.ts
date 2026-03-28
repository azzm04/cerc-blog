import type { NextConfig } from 'next';

// ─────────────────────────────────────────────────────────────────
// next.config.ts
// Konfigurasi Next.js untuk project CERC Blog
// ─────────────────────────────────────────────────────────────────
const nextConfig: NextConfig = {
  experimental: {
    cacheComponents: true, // BAB 3: caching untuk Server Components
  },
  images: {
    // Izinkan gambar dari domain eksternal
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ],
  },
};

export default nextConfig;
