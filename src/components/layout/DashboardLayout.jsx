/**
 * DashboardLayout.jsx
 * ------------------------------------------------------------------
 * Wraps every admin page: Sidebar on the left, scrollable content
 * area on the right. Renders <Outlet /> so it can sit directly on an
 * AdminRoute's nested routes (see the router setup below).
 * ------------------------------------------------------------------
 */
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  return (
    <div style={{ display: "flex", background: "var(--white, #fff)", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "28px 32px", maxWidth: 1400 }}>
        <Outlet />
      </main>
    </div>
  );
}
