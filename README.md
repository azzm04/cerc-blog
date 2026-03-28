# CERC Blog — Next.js Fullstack Project

Blog fullstack yang dibangun sebagai **Penugasan** Course Next.js & Fullstack Concept Software Division CERC 

---

## Peta Konsep per Bab

| Bab | Topik | File Utama |
|-----|-------|-----------|
| Bab 1 | Fondasi Next.js, file-based routing, `<Link>` | `app/layout.tsx`, `app/page.tsx`, `components/Navbar.tsx` |
| Bab 2 | Layout System, Dynamic Route, Route Groups, Reusable Component | `app/blog/[slug]/page.tsx`, `app/dashboard/layout.tsx`, `app/(public)/about/`, `components/` |
| Bab 3 | Server Component, Client Component, Data Fetching, Caching, Loading/Error UI | `lib/data.ts`, `components/LikeButton.tsx`, `app/blog/loading.tsx`, `app/error.tsx` |
| Bab 4 | Server Action, CRUD, Route Handler, Prisma | `actions/post.ts`, `prisma/schema.prisma`, `lib/db.ts`, `app/api/` |
| Bab 5 | Autentikasi, Middleware, Deployment | `lib/auth.ts`, `middleware.ts`, `actions/auth.ts`, `app/login/`, `app/register/` |

---

## Cara Menjalankan di lokal

### Prasyarat
- Node.js 18.18.0 ke atas
- Akun [Neon](https://neon.tech) (database PostgreSQL gratis)

### Langkah 1 — Install Dependencies
```bash
npm install
```

### Langkah 2 — Setup Environment Variable
```bash
# Salin file contoh
cp .env.example .env.local
cp .env.example .env

# Isi nilai berikut di .env.local:
# DATABASE_URL  → connection string dari Neon
# AUTH_SECRET   → generate dengan: openssl rand -base64 32
# AUTH_URL      → http://localhost:3000
```

### Langkah 3 — Setup Database
```bash
# Generate Prisma Client
npx prisma generate

# Push schema ke database
npx prisma db push

# Isi data dummy (opsional tapi disarankan)
npx ts-node prisma/seed.ts
```

### Langkah 4 — Jalankan Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Akun Default (setelah seed)
| Email | Password | Role |
|-------|----------|------|
| azzamsyaifulislam@students.undip.ac.id  | password123 | Admin |
| farelrazzan@students.undip.ac.id | password123 | User  |

---

## Struktur Folder

```
cerc-blog/
├── app/                          # App Router (BAB 1)
│   ├── layout.tsx                # Root Layout — BAB 2
│   ├── page.tsx                  # Halaman home /
│   ├── loading.tsx               # Loading UI — BAB 3
│   ├── error.tsx                 # Error UI — BAB 3
│   ├── not-found.tsx             # Halaman 404
│   ├── blog/
│   │   ├── page.tsx              # /blog — list artikel
│   │   ├── loading.tsx           # Skeleton loading
│   │   └── [slug]/
│   │       └── page.tsx          # /blog/:slug — detail (Dynamic Route BAB 2)
│   ├── (public)/                 # Route Group — BAB 2 (tidak muncul di URL)
│   │   ├── about/page.tsx        # /about
│   │   └── contact/page.tsx      # /contact
│   ├── dashboard/
│   │   ├── layout.tsx            # Nested Layout + Sidebar — BAB 2
│   │   ├── page.tsx              # /dashboard — overview
│   │   ├── posts/
│   │   │   ├── page.tsx          # /dashboard/posts — list artikel
│   │   │   └── new/
│   │   │       ├── page.tsx      # /dashboard/posts/new
│   │   │       └── PostForm.tsx  # Client Component — BAB 3
│   │   └── settings/page.tsx     # /dashboard/settings
│   ├── login/
│   │   ├── page.tsx              # /login — BAB 5
│   │   └── LoginForm.tsx
│   ├── register/
│   │   ├── page.tsx              # /register — BAB 5
│   │   └── RegisterForm.tsx
│   └── api/
│       ├── auth/[...nextauth]/   # NextAuth handler — BAB 5
│       └── posts/[id]/like/      # Route Handler — BAB 4
├── components/                   # Komponen reusable — BAB 2
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Sidebar.tsx               # Untuk Nested Layout dashboard
│   ├── Button.tsx
│   ├── PostCard.tsx
│   └── LikeButton.tsx            # Client Component — BAB 3
├── lib/
│   ├── db.ts                     # Prisma client singleton — BAB 4
│   ├── data.ts                   # Data fetching functions — BAB 3
│   ├── auth.ts                   # NextAuth config — BAB 5
│   └── utils.ts                  # Helper functions
├── actions/
│   ├── post.ts                   # Server Actions CRUD — BAB 4
│   └── auth.ts                   # Server Actions auth — BAB 5
├── types/
│   └── index.ts                  # TypeScript types
├── prisma/
│   ├── schema.prisma             # Database schema — BAB 4
│   └── seed.ts                   # Data dummy
├── middleware.ts                  # Route protection — BAB 5
├── next.config.ts
├── tailwind.config.ts
└── .env.example
```

---

## Teknologi yg digunakan

- **Next.js 16** — Framework fullstack dengan App Router
- **React 19** — UI library
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling
- **Prisma** — ORM untuk database
- **Neon PostgreSQL** — Database cloud
- **NextAuth.js v5** — Autentikasi
- **bcryptjs** — Hash password
- **Vercel** — Deployment

---

