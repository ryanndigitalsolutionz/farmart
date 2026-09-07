import { Outlet } from "react-router-dom";
import FarmerSidebar from "./FarmerSidebar";
import Footer from "./Footer";

const SIDEBAR_WIDTH = 240;

export default function FarmerLayout() {
  return (
    <div style={{ display: "flex", background: "var(--color-background)", minHeight: "100vh" }}>
      <FarmerSidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, marginLeft: SIDEBAR_WIDTH }}>
        <main style={{ flex: 1, padding: "24px 24px 40px", maxWidth: 1200, width: "100%", margin: "0 auto", overflowY: "auto" }}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
