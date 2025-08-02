// src/app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.redirect('/login');
  response.cookies.set('token', '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
  });
  return response;
}
