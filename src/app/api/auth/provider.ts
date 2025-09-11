import { supabase } from "@/helpers/supabase";
import { User, UserSession } from "./types";
import bcrypt from "bcryptjs";

/**
 * Registers a new user directly into the 'users' table.
 */
export async function signUp(
  name: string,
  email: string,
  password: string
): Promise<{ user: User | null; error: { message: string } | null }> {
  try {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return {
        user: null,
        error: {
          message:
            "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
        },
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error: supabaseError } = await supabase
      .from("users")
      .insert({
        name,
        email,
        password: hashedPassword,
        is_admin: false,
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
    return {
      user: null,
      error: {
        message:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred during signup.",
      },
    };
  }
}

/**
 * Logs in a user by verifying credentials.
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
        "id, name, email, password, is_admin, profile_pic, created_at, updated_at"
      )
      .eq("email", email)
      .single();

    if (supabaseError || !userFromDb) {
      return { user: null, session: null, error: { message: "Invalid credentials." } };
    }

    const isPasswordValid = await bcrypt.compare(password, userFromDb.password);
    if (!isPasswordValid) {
      return { user: null, session: null, error: { message: "Invalid credentials." } };
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("user_id", userFromDb.id);
      localStorage.setItem("user_email", userFromDb.email);
    }

    delete userFromDb.password;

    return {
      user: userFromDb as User,
      session: { userId: userFromDb.id, email: userFromDb.email },
      error: null,
    };
  } catch (err: unknown) {
    return {
      user: null,
      session: null,
      error: {
        message:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred during sign-in.",
      },
    };
  }
}

/**
 * Logs out the current user.
 */
export async function signOut(): Promise<{ error: { message: string } | null }> {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_email");
    }
    return { error: null };
  } catch (err: unknown) {
    return {
      error: {
        message:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred during sign-out.",
      },
    };
  }
}

/**
 * Retrieves the current session from localStorage.
 */
export async function getSession(): Promise<{
  session: UserSession | null;
  error: { message: string } | null;
}> {
  try {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("user_id");
      const userEmail = localStorage.getItem("user_email");

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
    return {
      session: null,
      error: {
        message:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred getting the session.",
      },
    };
  }
}

/**
 * Retrieves the current user from DB.
 */
export async function getUser(): Promise<{
  user: User | null;
  error: { message: string } | null;
}> {
  try {
    const { session, error: sessionError } = await getSession();
    if (sessionError) return { user: null, error: sessionError };
    if (!session?.userId) return { user: null, error: null };

    const { data: userFromDb, error: supabaseError } = await supabase
      .from("users")
      .select("id, name, email, is_admin, profile_pic, created_at, updated_at")
      .eq("id", session.userId)
      .single();

    if (supabaseError || !userFromDb) {
      await signOut();
      return { user: null, error: { message: "User not found or session invalid." } };
    }

    return { user: userFromDb as User, error: null };
  } catch (err: unknown) {
    return {
      user: null,
      error: {
        message:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred getting the user.",
      },
    };
  }
}

/**
 * A mock access token from session.
 */
export async function getSupabaseAccessToken(): Promise<string | null> {
  const { session } = await getSession();
  return session?.userId ?? null;
}
