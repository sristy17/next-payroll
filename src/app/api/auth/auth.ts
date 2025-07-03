import { supabase } from "@/helpers/supabase";

/**
 * Registers a new user with email and password.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's chosen password.
 * @returns {Promise<{ user: import('@supabase/supabase-js').User | null, error: import('@supabase/supabase-js').ApiError | null }>} An object containing the user data or an error.
 */
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { user: data.user, error };
}

/**
 * Logs in a user with email and password.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<{ user: import('@supabase/supabase-js').User | null, error: import('@supabase/supabase-js').ApiError | null }>} An object containing the user data or an error.
 */
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { user: data.user, error };
}

/**
 * Logs out the current user.
 * @returns {Promise<{ error: import('@supabase/supabase-js').ApiError | null }>} An object containing an error if logout fails.
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * Retrieves the current authenticated user's session.
 * @returns {Promise<{ session: import('@supabase/supabase-js').Session | null, error: import('@supabase/supabase-js').ApiError | null }>} An object containing the current session or an error.
 */
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  return { session: data.session, error };
}

/**
 * Retrieves the current authenticated user.
 * @returns {Promise<{ user: import('@supabase/supabase-js').User | null, error: import('@supabase/supabase-js').ApiError | null }>} An object containing the current user or an error.
 */
export async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return { user, error };
}

/**
 * A utility function to get the Supabase access token from the current session.
 * This is useful for making authenticated requests to Supabase PostgREST API directly.
 * @returns {Promise<string | null>} The Supabase access token or null if no session.
 */
export async function getSupabaseAccessToken(): Promise<string | null> {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    console.error("Error getting session for access token:", error.message);
    return null;
  }
  return session?.access_token ?? null;
}
