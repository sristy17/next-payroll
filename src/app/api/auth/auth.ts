import { supabase } from "@/helpers/supabase";
import { User, UserSession } from "./types";

/**
 * Registers a new user directly into the 'users' table.
 *
 * @param {string} name - The user's name.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's chosen password (WILL BE STORED AS PLAIN TEXT!).
 * @param {string | null} [profilePic=null] - Optional URL for the user's profile picture.
 * @returns {Promise<{ user: User | null, error: { message: string } | null }>} An object containing the user data or an error.
 */
export async function signUp(
  name: string,
  email: string,
  password: string,
  profilePic: string | null = null
): Promise<{ user: User | null; error: { message: string } | null }> {
  try {
    const plainTextPassword = password;

    const { data, error: supabaseError } = await supabase
      .from("users")
      .insert({
        name,
        email,
        password_hash: plainTextPassword,
        is_email_verified: false,
        profilePic,
      })
      .select()
      .single();

    if (supabaseError) {
      if (supabaseError.code === "23505") {
        return { user: null, error: { message: "Email already exists." } };
      }
      return {
        user: null,
        error: { message: supabaseError.message || "Failed to register user." },
      };
    }

    return { user: data as User, error: null };
  } catch (err: unknown) {
    let errorMessage = "An unexpected error occurred during signup.";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    console.error("Catch-all Signup error:", err);
    return {
      user: null,
      error: { message: errorMessage },
    };
  }
}

/**
 * Logs in a user by verifying credentials against the 'users' table.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<{ user: User | null, session: UserSession | null, error: { message: string } | null }>} An object containing the user data, session, or an error.
 */
export async function signIn(
  email: string,
  password: string
): Promise<{
  user: User | null;
  session: UserSession | null;
  error: { message: string } | null;
}> {
  try {
    const { data: userFromDb, error: supabaseError } = await supabase
      .from("users")
      .select(
        "id, name, email, password_hash, is_email_verified, profilePic, created_at, updated_at"
      )
      .eq("email", email)
      .single();
    if (supabaseError || !userFromDb) {
      return {
        user: null,
        session: null,
        error: { message: "Invalid credentials." },
      };
    }

    const isPasswordValid = password === userFromDb.password_hash;

    if (!isPasswordValid) {
      return {
        user: null,
        session: null,
        error: { message: "Invalid credentials." },
      };
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("user_session_id", userFromDb.id);
      localStorage.setItem("user_session_email", userFromDb.email);
    }

    delete userFromDb.password_hash;

    return {
      user: userFromDb as User,
      session: { userId: userFromDb.id, email: userFromDb.email },
      error: null,
    };
  } catch (err: unknown) {
    let errorMessage = "An unexpected error occurred during sign-in.";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    console.error("Catch-all Sign-in error:", err);
    return {
      user: null,
      session: null,
      error: { message: errorMessage },
    };
  }
}

/**
 * Logs out the current user by clearing the client-side "session".
 * This is only effective for client-side state.
 * @returns {Promise<{ error: { message: string } | null }>} An object containing an error if logout fails.
 */
export async function signOut(): Promise<{
  error: { message: string } | null;
}> {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user_session_id");
      localStorage.removeItem("user_session_email");
    }
    return { error: null };
  } catch (err: unknown) {
    let errorMessage = "An unexpected error occurred during sign-out.";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    console.error("Catch-all Sign-out error:", err);
    return {
      error: { message: errorMessage },
    };
  }
}

/**
 * Retrieves the current authenticated user's "session" from client-side storage.
 * @returns {Promise<{ session: UserSession | null, error: { message: string } | null }>} An object containing the current session or an error.
 */
export async function getSession(): Promise<{
  session: UserSession | null;
  error: { message: string } | null;
}> {
  try {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("user_session_id");
      const userEmail = localStorage.getItem("user_session_email");

      const { data } = await supabase
        .from("users")
        .select("name")
        .eq("id", userId)
        .single();

      if (userId && userEmail) {
        return {
          session: { userId, email: userEmail, name: data?.name },
          error: null,
        };
      }
    }
    return { session: null, error: null };
  } catch (err: unknown) {
    let errorMessage = "An unexpected error occurred getting the session.";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    console.error("Catch-all Get session error:", err);
    return {
      session: null,
      error: { message: errorMessage },
    };
  }
}

/**
 * Retrieves the current authenticated user from the 'users' table based on client-side "session".
 * @returns {Promise<{ user: User | null, error: { message: string } | null }>} An object containing the current user or an error.
 */
export async function getUser(): Promise<{
  user: User | null;
  error: { message: string } | null;
}> {
  try {
    const { session, error: sessionError } = await getSession();
    if (sessionError) {
      return { user: null, error: sessionError };
    }
    if (!session?.userId) {
      return { user: null, error: null };
    }

    const { data: userFromDb, error: supabaseError } = await supabase
      .from("users")
      .select(
        "id, name, email, is_email_verified, profilePic, created_at, updated_at"
      )
      .eq("id", session.userId)
      .single();

    if (supabaseError || !userFromDb) {
      await signOut();
      return {
        user: null,
        error: { message: "User not found or session invalid." },
      };
    }

    return { user: userFromDb as User, error: null };
  } catch (err: unknown) {
    let errorMessage = "An unexpected error occurred getting the user.";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    console.error("Catch-all Get user error:", err);
    return {
      user: null,
      error: { message: errorMessage },
    };
  }
}

/**
 * A utility function for a mock access token based on the client-side session.
 * @returns {Promise<string | null>} A mock access token or null if no session.
 */
export async function getSupabaseAccessToken(): Promise<string | null> {
  const { session } = await getSession();
  return session?.userId ?? null;
}
