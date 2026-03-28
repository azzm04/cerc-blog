// app/api/auth/[...nextauth]/route.ts
// BAB 5 — NextAuth.js v5: handler untuk semua endpoint auth
//          /api/auth/signin, /api/auth/signout, /api/auth/session, dll

import { handlers } from '@/lib/auth';

export const { GET, POST } = handlers;
