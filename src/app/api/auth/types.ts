export interface User {
  id: string;
  name: string;
  email: string;
  is_email_verified: boolean;
  profilePic: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserSession {
  userId: string;
  email: string;
  name?: string;
}
