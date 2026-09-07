import PublicNavbar from "./PublicNavbar";
import Footer from "./Footer";

export default function PublicLayout({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <PublicNavbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}
