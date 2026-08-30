import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminTopbar from "./AdminTopbar";

const SIDEBAR_WIDTH = 240;

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: "flex", background: "var(--color-background)", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, marginLeft: SIDEBAR_WIDTH }}>
        <AdminTopbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main style={{ flex: 1, padding: "24px 24px 40px", maxWidth: 1400, width: "100%", margin: "0 auto", overflowY: "auto" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
