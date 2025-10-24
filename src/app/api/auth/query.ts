import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import { supabase } from "@/helpers/supabase";
import { signUp, signIn, signOut, getUser, getSession } from "./provider";
import {
  UserResponse,
  SessionResponse,
  AuthResponse,
  SignUpResponse,
  SignOutResponse,
} from "./types";
import toast from "react-hot-toast";

/**
 * Mutation: Sign Up
 */
export const useSignUpMutation = (): UseMutationResult<
  SignUpResponse,
  Error,
  { name: string; email: string; password: string }
> => {
  return useMutation<
    SignUpResponse,
    Error,
    { name: string; email: string; password: string }
  >({
    mutationFn: ({ name, email, password }) => signUp(name, email, password),
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error.message);
      } else {
        toast.success("Signed up successfully!");
      }
    },
    onError: (err) => {
      toast.error(err.message || "Sign up failed");
    },
  });
};

/**
 * Mutation: Sign In
 */
export const useSignInMutation = (): UseMutationResult<
  AuthResponse,
  Error,
  { email: string; password: string }
> => {
  return useMutation<AuthResponse, Error, { email: string; password: string }>({
    mutationFn: ({ email, password }) => signIn(email, password),
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error.message);
      } else {
        toast.success("Logged in successfully!");
      }
    },
    onError: (err) => {
      toast.error(err.message || "Sign in failed");
    },
  });
};

/**
 * Mutation: Sign Out
 */
export const useSignOutMutation = (): UseMutationResult<
  SignOutResponse,
  Error,
  void
> => {
  const queryClient = useQueryClient();
  return useMutation<SignOutResponse, Error, void>({
    mutationFn: signOut,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error.message);
      } else {
        queryClient.clear();
        toast.success("Signed out successfully!");
      }
    },
    onError: (err) => {
      toast.error(err.message || "Sign out failed");
    },
  });
};

/**
 * Query: Get Current Session
 */
export const useSessionQuery = (): UseQueryResult<SessionResponse, Error> => {
  return useQuery<SessionResponse, Error>({
    queryKey: ["session"],
    queryFn: getSession,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Query: Get Current User
 */
export const useUserQuery = (): UseQueryResult<UserResponse, Error> => {
  return useQuery<UserResponse, Error>({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Mutation: Upload/Update Profile Photo
 */

export const useUploadPhotoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, file }: { userId: string; file: File }) => {
      const fileName = `${userId}-${Date.now()}.${file.name.split(".").pop()}`;
      const { error: uploadError } = await supabase
        .storage
        .from("profile_pictures")
        .upload(fileName, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from("users")
        .update({ profile_pic: fileName })
        .eq("id", userId);
      if (dbError) throw dbError;

      return fileName;
    },
    onSuccess: async (fileName, { userId }) => {
      // Refresh user data so navbar/sidebar see new photo
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Profile photo updated!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Upload failed");
    }
  });
};

export const useRemovePhotoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, avatarPath }: { userId: string; avatarPath: string }) => {
      const { error: removeError } = await supabase
        .storage
        .from("profile_pictures")
        .remove([avatarPath]);
      if (removeError) throw removeError;

      const { error: dbError } = await supabase
        .from("users")
        .update({ profile_pic: null })
        .eq("id", userId);
      if (dbError) throw dbError;

      return true;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Profile photo removed!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Remove failed");
    }
  });
};


