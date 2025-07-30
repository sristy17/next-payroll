import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabase } from '@/helpers/supabase';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET() {
  const cookieStore = await cookies(); // ✅ this is synchronous
  const token = cookieStore.get('token')?.value; // ✅ get() is valid here

  if (!token) {
    return NextResponse.json({ session: null }, { status: 200 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };

    const { data, error } = await supabase
      .from('users')
      .select('name, email')
      .eq('email', decoded.email)
      .single();

    if (error || !data) {
      return NextResponse.json({ session: null }, { status: 200 });
    }

    return NextResponse.json({ session: data }, { status: 200 });
  } catch {
    return NextResponse.json({ session: null }, { status: 200 });
  }
}
