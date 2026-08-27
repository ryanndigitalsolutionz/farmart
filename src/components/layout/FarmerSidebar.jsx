import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import FarmartLogo from "../branding/FarmartLogo";
import { LayoutDashboard, ClipboardList, Plus, Package, TrendingUp, Home, User } from "lucide-react";

const outerStyle = {
  width: 240,
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  borderRight: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  display: "flex",
  flexDirection: "column",
  zIndex: 100,
};

const brandStyle = {
  fontFamily: "var(--font-display, 'Fraunces', serif)",
  fontWeight: 700,
  fontSize: 18,
  color: "var(--color-primary)",
  padding: "20px 16px",
  borderBottom: "1px solid var(--color-border)",
};

const navStyle = {
  flex: 1,
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  gap: 2,
  overflowY: "auto",
};

const linkStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 12px",
  borderRadius: "var(--radius-sm, 8px)",
  fontSize: 14,
  fontWeight: 600,
  textDecoration: "none",
  color: "var(--color-text)",
  transition: "background 0.15s ease, color 0.15s ease",
};

const activeStyle = {
  background: "var(--color-surface-secondary)",
  color: "var(--color-primary)",
};

const logoutStyle = {
  padding: "12px 16px",
  borderTop: "1px solid var(--color-border)",
  fontSize: 14,
  fontWeight: 600,
  color: "var(--color-text-muted)",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: 8,
  background: "transparent",
  border: "none",
  width: "100%",
  textAlign: "left",
  cursor: "pointer",
};

const mobileDrawerStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  width: 260,
  background: "var(--glass-bg-strong)",
  borderRight: "1px solid var(--glass-border)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  zIndex: 200,
  transform: "translateX(-100%)",
  transition: "transform 0.3s ease",
  display: "flex",
  flexDirection: "column",
};

const mobileOpenStyle = {
  transform: "translateX(0)",
};

const hamburgerStyle = {
  position: "fixed",
  top: 10,
  left: 10,
  zIndex: 201,
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-sm, 8px)",
  padding: "8px 10px",
  fontSize: 18,
  cursor: "pointer",
  color: "var(--color-text)",
};

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.35)",
  zIndex: 199,
};

const navItems = [
  { to: "/farmer", label: "Dashboard", icon: LayoutDashboard },
  { to: "/farmer/listings", label: "My Listings", icon: ClipboardList },
  { to: "/farmer/listings/new", label: "Create Listing", icon: Plus },
  { to: "/farmer/orders", label: "Orders", icon: Package },
  { to: "/farmer/analytics", label: "Analytics", icon: TrendingUp },
  { to: "/farmer/farm-profile", label: "Farm Profile", icon: Home },
  { to: "/farmer/profile", label: "Profile", icon: User },
];

export default function FarmerSidebar() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches);
  const { logout } = useAuth();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const content = (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ ...brandStyle, display: "inline-flex" }}>
        <FarmartLogo size="md" suffix="Farmer" />
      </div>
      <nav style={navStyle} aria-label="Farmer navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              ...linkStyle,
              ...(isActive ? activeStyle : {}),
            })}
            onClick={() => isMobile && setOpen(false)}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span aria-hidden="true"><item.icon size={18} /></span>
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>
      <button type="button" onClick={handleLogout} style={logoutStyle}>
        Logout
      </button>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <button
          type="button"
          aria-label="Open menu"
          style={hamburgerStyle}
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
        {open && <div style={overlayStyle} onClick={() => setOpen(false)} />}
        <aside style={{ ...mobileDrawerStyle, ...(open ? mobileOpenStyle : {}) }}>
          {content}
        </aside>
      </>
    );
  }

  return <aside style={outerStyle}>{content}</aside>;
}
