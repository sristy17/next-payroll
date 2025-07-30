import { supabase } from '@/helpers/supabase';
import bcrypt from 'bcryptjs';

// Define expected user return type
export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  is_email_verified: boolean;
}

interface AuthResult {
  data?: User;
  error?: string;
}

export async function signup(name: string, email: string, password: string): Promise<AuthResult> {
  try {
    // Check if user already exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (fetchError) {
      return { error: fetchError.message };
    }

    if (existingUser) {
      return { error: 'User already exists with this email' };
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          name,
          email,
          password_hash: passwordHash,
          is_email_verified: false,
        },
      ])
      .select('*')
      .single();

    if (insertError) {
      return { error: insertError.message };
    }

    return { data: newUser };
  } catch (err) {
    console.error('Unexpected signup error:', err);
    return { error: 'Unexpected error occurred during signup' };
  }
}

export async function login(email: string, password: string): Promise<AuthResult> {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, password_hash, is_email_verified')
      .eq('email', email)
      .maybeSingle();

    if (error) {
      return { error: error.message };
    }

    if (!user) {
      return { error: 'User not found' };
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return { error: 'Invalid password' };
    }

    return { data: user };
  } catch (err) {
    console.error('Unexpected login error:', err);
    return { error: 'Unexpected error occurred during login' };
  }
}

