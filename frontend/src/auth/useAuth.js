export function useAuth() {
  return {
    isAuthenticated: true,
    user: { id: 1, email: "admin@farmart.co.ke", role: "admin" },
  };
}