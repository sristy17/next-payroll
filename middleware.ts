// src/middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers/nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // 👇 Attaches Supabase session info to the request (important!)
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();

  return res;
}

export const config = {
  matcher: [
    /*
     * Run middleware on all protected routes
     * Adjust these paths as needed
     */
    '/dashboard/:path*',
  ],
};
