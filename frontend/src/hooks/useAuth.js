import { useAdmin } from "../context/AdminContext";

export function useAuth() {
  const { currentUser } = useAdmin();

  const user = currentUser
    ? {
        name: `${currentUser.first_name} ${currentUser.last_name}`.trim(),
        email: currentUser.email,
        role: currentUser.role,
      }
    : null;

  return { user };
}
