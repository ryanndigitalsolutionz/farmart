import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div style={{ display: "flex", justifyContent: "center", padding: 40 }}><div className="spinner" /></div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}
