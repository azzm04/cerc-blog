// ─────────────────────────────────────────────────────────────────
// lib/auth.ts
// BAB 5 — Setup NextAuth.js v5 dengan Credentials Provider
// ─────────────────────────────────────────────────────────────────

import NextAuth            from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db }              from '@/lib/db';
import bcrypt              from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email'    },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Cari user di database berdasarkan email
        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });
        if (!user) return null;

        // Bandingkan password yang diinput dengan hash di database
        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
        if (!passwordMatch) return null;

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  callbacks: {
    // Tambahkan user ID ke dalam session
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.sub = user.id;
      return token;
    },
  },
  pages: {
    signIn: '/login',   // Gunakan halaman login kustom kita
  },
  session: { strategy: 'jwt' },
});
