import { Link, useLocation } from "react-router-dom";
import FarmartLogo from "../branding/FarmartLogo";
const outer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "14px 28px",
  background: "#fff",
  borderBottom: "1px solid var(--border, #DCE6D8)",
  position: "sticky",
  top: 0,
  zIndex: 100,
};

const logo = {
  fontFamily: "var(--font-display, 'Fraunces', serif)",
  fontSize: 20,
  fontWeight: 700,
  color: "var(--green-900, #163420)",
  textDecoration: "none",
};

const nav = {
  display: "flex",
  alignItems: "center",
  gap: 20,
  listStyle: "none",
  margin: 0,
  padding: 0,
};

const navLink = {
  textDecoration: "none",
  fontSize: 14.5,
  fontWeight: 600,
  color: "var(--text-dark, #1E2A1F)",
  padding: "6px 2px",
  borderBottom: "2px solid transparent",
};

const right = {
  display: "flex",
  alignItems: "center",
  gap: 16,
};

const iconBtn = {
  background: "transparent",
  border: "none",
  fontSize: 20,
  cursor: "pointer",
  position: "relative",
  color: "var(--text-dark, #1E2A1F)",
};

const avatar = {
  width: 34,
  height: 34,
  borderRadius: "50%",
  background: "var(--green-700, #2F6D3F)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 14,
  fontWeight: 700,
  border: "none",
  cursor: "pointer",
};

const badge = {
  position: "absolute",
  top: -4,
  right: -4,
  background: "#c53030",
  color: "#fff",
  fontSize: 10,
  fontWeight: 700,
  borderRadius: 999,
  width: 18,
  height: 18,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 1,
};

export default function Navbar({ cartCount = 0 }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  if (isAdmin) return null;

  const links = [
    { to: "/marketplace", label: "Marketplace" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header style={outer}>
      <Link to="/marketplace" style={logo}><FarmartLogo size="sm" /></Link>
      <nav>
        <ul style={nav}>
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                style={navLink}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div style={right}>
        <Link to="/cart" aria-label="Cart" style={{ textDecoration: "none" }}>
          <button type="button" style={iconBtn}>
            🛒
            {cartCount > 0 && <span style={badge}>{cartCount}</span>}
          </button>
        </Link>
        <button type="button" aria-label="User menu" style={avatar}>
          👤
        </button>
      </div>
    </header>
  );
}
