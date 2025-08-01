import { supabase } from "@/helpers/supabase";
import { UserSession } from "./types";
import { User } from "@supabase/supabase-js";

/**
 * Registers a new user with email and password using Supabase Auth.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's chosen password.
 * @param {object} [options] - Optional options for signing up.
 * @param {object} [options.data] - Optional data to associate with the user (e.g., name, profilePic).
 * @returns {Promise<{ user: User | null, session: UserSession | null, error: { message: string } | null }>} An object containing the user data, session, or an error.
 */
export async function signUpWithEmailAndPassword(
  email: string,
  password: string,
  options?: { data?: object }
): Promise<{
  user: User | null;
  session: UserSession | null;
  error: { message: string } | null;
}> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options,
  });

  if (error) {
    return { user: null, session: null, error: { message: error.message } };
  }

  // Supabase signUp with email and password automatically creates a user and session
  return { user: data.user, session: { userId: data.user?.id as string, email: data.user?.email as string}, error: null };
}

/**
 * Logs in a user with email and password using Supabase Auth.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<{ user: User | null, session: UserSession | null, error: { message: string } | null }>} An object containing the user data, session, or an error.
 */
export async function signInWithEmailAndPassword(
  email: string,
  password: string
): Promise<{
  user: User | null;
  session: UserSession | null;
  error: { message: string } | null;
}> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { user: null, session: null, error: { message: error.message } };
  }

    return { user: data.user, session: { userId: data.session?.user.id as string, email: data.session?.user.email as string}, error: null };
}

/**
 * Logs in a user with a third-party provider (e.g., Google) using Supabase Auth.
 *
 * @param {string} provider - The name of the OAuth provider (e.g., 'google').
 * @returns {Promise<{ data: any, error: { message: string } | null }>}
 */
export async function signInWithOAuth(provider: 'google') {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
        redirectTo: `${window.location.origin}/auth/callback`,
    }
  });

  if (error) {
    return { data: null, error: { message: error.message } };
  }

  return { data, error: null };
}

/**
 * Logs out the current user using Supabase Auth.
 *
 * @returns {Promise<{ error: { message: string } | null }>}
 */
export async function signOut(): Promise<{
  error: { message: string } | null;
}> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { error: { message: error.message } };
  }
  return { error: null };
}

/**
 * Retrieves the current authenticated user's session using Supabase Auth.
 *
 * @returns {Promise<{ session: UserSession | null, error: { message: string } | null }>}
 */export async function getSession(): Promise<{
  session: UserSession | null;
  error: { message: string } | null;
}> {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    return { session: null, error: { message: error.message } };
  }

  return { session: { userId: data.session?.user.id as string, email: data.session?.user.email as string, name: data.session?.user.user_metadata.name }, error: null };
}

/**
 * Retrieves the current authenticated user using Supabase Auth.
 *
 * @returns {Promise<{ user: User | null, error: { message: string } | null }>}
 */
export async function getUser(): Promise<{
  user: User | null;
  error: { message: string } | null;
}> {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    return { user: null, error: { message: error.message } };
  }

  return { user, error: null };
}

// This function is no longer needed as Supabase Auth handles tokens internally
export async function getSupabaseAccessToken(): Promise<string | null> {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || null;
}
