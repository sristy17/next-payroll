/**
 * User
 */
export interface User {
  id: string;
  name: string;
  email: string;
  is_admin: boolean;
  profile_pic: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * UserSession
 */
export interface UserSession {
  userId: string;
  email: string;
  name?: string;
}

/**
 * Common API error
 */
export interface ApiError {
  message: string;
}

/**
 * Response type for signUp
 */
export interface SignUpResponse {
  user: User | null;
  error: ApiError | null;
}

/**
 * Response type for signIn
 */
export interface AuthResponse {
  user: User | null;
  session: UserSession | null;
  error: ApiError | null;
}

/**
 * Response type for fetching current user
 */
export interface UserResponse {
  user: User | null;
  error: ApiError | null;
}

/**
 * Response type for fetching current session
 */
export interface SessionResponse {
  session: UserSession | null;
  error: ApiError | null;
}

/**
 * Response type for signOut
 */
export interface SignOutResponse {
  error: ApiError | null;
}

/**
 * Request type for updating user profile
 */
export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  profile_pic?: string;
}

/**
 * Response type for updating user profile
 */
export interface UpdateProfileResponse {
  user: User | null;
  error: ApiError | null;
}

/**
 * Response type for deleting user profile
 */
export interface DeleteProfileResponse {
  success: boolean;
  error: ApiError | null;
}
