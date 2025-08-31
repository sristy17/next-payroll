import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
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
