export interface User {
  id: string;
  name: string;
  email: string;
  is_email_verified: boolean;
  created_at: string;
}

export interface UserSession {
  userId: string;
  email: string;
  name?: string;
}
