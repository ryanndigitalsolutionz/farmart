import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth"; // confirm this matches Ryan's real hook path
import { AdminProvider } from "../context/AdminContext";

export default function AdminRoute() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== "admin") return <Navigate to="/" replace />;

  return (
    <AdminProvider>
      <Outlet />
    </AdminProvider>
  );
}