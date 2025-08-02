import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { login } from '@/app/api/auth/auth';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const result = await login(email, password);
    const user = result.data;
    const error = result.error;

    if (error || !user) {
      return NextResponse.json({ error: error || 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // ✅ Await cookies()
    (await cookies()).set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return NextResponse.json({ message: 'Login successful', user });
  } catch (err) {
    console.error('Login error route:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
