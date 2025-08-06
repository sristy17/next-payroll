// Mock authentication service with proper typing
type User = {
  id: string;
  email: string;
  user_metadata: {
    full_name: string;
  };
};

let mockUsers: User[] = [
  {
    id: "1",
    email: "test@example.com",
    user_metadata: { full_name: "Test User" }
  }
];

export async function signIn(email: string, password: string) {
  return new Promise<{ user: User | null; error: Error | null }>((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email);
      resolve(user 
        ? { user, error: null }
        : { user: null, error: new Error("Invalid credentials") }
      );
    }, 500);
  });
}

export async function signInWithGoogle() {
  return new Promise<{ user: User | null; error: Error | null }>((resolve) => {
    setTimeout(() => {
      resolve({ 
        user: { 
          id: "google-123", 
          email: "google-user@example.com",
          user_metadata: { full_name: "Google User" }
        }, 
        error: null 
      });
    }, 500);
  });
}

export async function getSession() {
  return new Promise<{ 
    session: { user: User } | null, 
    error: Error | null 
  }>((resolve) => {
    setTimeout(() => {
      resolve({
        session: mockUsers[0] ? { user: mockUsers[0] } : null,
        error: null
      });
    }, 100);
  });
}