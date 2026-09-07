import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function FarmerRoute() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <div style={{ display: "flex", justifyContent: "center", padding: 40 }}><div className="spinner" /></div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== "farmer") return <Navigate to="/" replace />;

  return <Outlet />;
}
