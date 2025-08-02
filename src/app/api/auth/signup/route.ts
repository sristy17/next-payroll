import { NextResponse } from 'next/server';
import { signup as createUser } from '@/app/api/auth/auth';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

interface User {
  id: string;
  name: string;
  email: string;
}

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (password.length < 8 || !/\d/.test(password)) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters and contain at least one number' },
        { status: 400 }
      );
    }

    const { data, error } = await createUser(name, email, password);

    if (error || !data) {
      return NextResponse.json({ error: error || 'Signup failed' }, { status: 400 });
    }

    const user = data as User;

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // ✅ Use response object to set cookie
    const response = NextResponse.json({ message: 'Signup successful', user });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('Signup error route:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
