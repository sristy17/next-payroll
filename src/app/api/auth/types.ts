export interface User {
  id: string;
  name: string;
  email: string;
  is_admin: boolean;
  profile_pic: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserSession {
  userId: string;
  email: string;
  name?: string;
}