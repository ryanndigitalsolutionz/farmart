import { Outlet } from "react-router-dom";
import PublicNavbar from "./PublicNavbar";
import Footer from "./Footer";
import MobileNav from "./MobileNav";

export default function BuyerLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <PublicNavbar />
      <main style={{ flex: 1, padding: "24px 24px 40px", maxWidth: 1200, width: "100%", margin: "0 auto", paddingBottom: window.innerWidth < 768 ? 88 : 40 }}>
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
