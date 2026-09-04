// TODO: replace with real authenticated user from backend/session once login is wired up
export function useAuth() {
  const user = {
    name: "Admin User",
    email: "admin@farmart.co.ke",
    role: "admin",
  };

  return { user };
}