import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  signUp,
  signIn,
  signOut,
  getUser,
  getSession,
} from "./provider";
import { User, UserSession } from "./types";
import toast from "react-hot-toast";

/**
 * Mutation: Sign Up
 */
export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: ({ name, email, password }: { name: string; email: string; password: string }) =>
      signUp(name, email, password),
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error.message);
      } else {
        toast.success("Signed up successfully!");
      }
    },
    onError: (err: Error) => {
      toast.error(err.message || "Sign up failed");
    },
  });
};

/**
 * Mutation: Sign In
 */
export const useSignInMutation = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signIn(email, password),
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error.message);
      } else {
        toast.success("Logged in successfully!");
      }
    },
    onError: (err: Error) => {
      toast.error(err.message || "Sign in failed");
    },
  });
};

/**
 * Mutation: Sign Out
 */
export const useSignOutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.clear();
      toast.success("Signed out successfully!");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Sign out failed");
    },
  });
};

/**
 * Query: Get Current Session
 */
export const useSessionQuery = () => {
  return useQuery<{ session: UserSession | null; error: { message: string } | null }>({
    queryKey: ["session"],
    queryFn: getSession,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Query: Get Current User
 */
export const useUserQuery = () => {
  return useQuery<{ user: User | null; error: { message: string } | null }>({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 5 * 60 * 1000,
  });
};
