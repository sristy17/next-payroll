import { supabase } from "@/helpers/supabase";
import { User, UserSession } from "./types";

// ----------------------
// Password Validation
// ----------------------
function validatePassword(password: string): boolean {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}

// ----------------------
// SIGN UP
// ----------------------
export async function signUp(
  name: string,
  email: string,
  password: string
): Promise<{
  user: User | null;
  session: UserSession | null;
  error: { message: string } | null;
}> {
  try {
    if (!validatePassword(password)) {
      return {
        user: null,
        session: null,
        error: {
          message:
            "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
        },
      };
    }

    // 1. Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError || !authData.user) {
      return {
        user: null,
        session: null,
        error: { message: authError?.message || "Sign-up failed" },
      };
    }

    // 2. Optionally, insert profile data in public.users (linked via UUID)
    await supabase.from("users").insert([
      {
        id: authData.user.id, // Must match auth.users UUID
        name,
        email,
        is_email_verified: false,
      },
    ]);

    // 3. Store session locally (optional)
    if (authData.session && typeof window !== "undefined") {
      localStorage.setItem("user_session_id", authData.user.id);
      localStorage.setItem("user_session_email", authData.user.email || "");
    }

    return {
      user: {
        id: authData.user.id,
        name,
        email,
        is_email_verified: false,
        created_at: new Date().toISOString(),
      },
      session: {
        userId: authData.user.id,
        email: authData.user.email || "",
      },
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
            : "Unexpected error during sign-up.",
      },
    };
  }
}

// ----------------------
// SIGN IN
// ----------------------
export async function signIn(
  email: string,
  password: string
): Promise<{
  user: User | null;
  session: UserSession | null;
  error: { message: string } | null;
}> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return {
        user: null,
        session: null,
        error: { message: "Invalid credentials." },
      };
    }

    // Fetch profile data
    const { data: profile } = await supabase
      .from("users")
      .select("id, name, email, is_email_verified, created_at")
      .eq("id", data.user.id)
      .single();

    if (typeof window !== "undefined") {
      localStorage.setItem("user_session_id", data.user.id);
      localStorage.setItem("user_session_email", data.user.email || "");
    }

    return {
      user: profile || {
        id: data.user.id,
        name: "",
        email: data.user.email || "",
        is_email_verified: false,
        created_at: "",
      },
      session: {
        userId: data.user.id,
        email: data.user.email || "",
      },
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
            : "Unexpected error during sign-in.",
      },
    };
  }
}

// ----------------------
// SIGN OUT
// ----------------------
export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
  if (typeof window !== "undefined") {
    localStorage.removeItem("user_session_id");
    localStorage.removeItem("user_session_email");
  }
}

// ----------------------
// GET SESSION
// ----------------------
export async function getSession(): Promise<{
  session: UserSession | null;
  error: { message: string } | null;
}> {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return { session: null, error: { message: error.message } };
    }

    if (data.session?.user) {
      return {
        session: {
          userId: data.session.user.id,
          email: data.session.user.email || "",
        },
        error: null,
      };
    }

    return { session: null, error: null };
  } catch (err: unknown) {
    return {
      session: null,
      error: {
        message: err instanceof Error ? err.message : "Unknown error getting session",
      },
    };
  }
}


// ----------------------
// GET USER
// ----------------------
export async function getUser(): Promise<User | null> {
  const session = await getSession();
  if (!session) return null;

  const { data, error } = await supabase
    .from("users")
    .select("id, name, email, is_email_verified, created_at")
    .eq("id", session.session?.userId)
    .single();

  if (error || !data) return null;
  return data as User;
}