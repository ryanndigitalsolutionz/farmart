import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import FarmartLogo from "../branding/FarmartLogo";
import { LayoutDashboard, ClipboardList, Plus, Package, TrendingUp, Home, User, X } from "lucide-react";

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
  width: 280,
  background: "var(--glass-bg-strong)",
  borderRight: "1px solid var(--glass-border)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  zIndex: 200,
  display: "flex",
  flexDirection: "column",
};

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.35)",
  zIndex: 199,
};

const hamburgerStyle = {
  position: "fixed",
  top: 12,
  left: 12,
  zIndex: 150,
  width: 40,
  height: 40,
  borderRadius: "var(--radius-sm, 8px)",
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 18,
  cursor: "pointer",
  color: "var(--color-text)",
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

const drawerVariants = {
  closed: { x: "-100%" },
  open: { x: 0 },
};

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const content = (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ ...brandStyle, display: "inline-flex", justifyContent: "space-between", alignItems: "center" }}>
        <FarmartLogo size="md" />
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--color-text)",
            cursor: "pointer",
            width: 32,
            height: 32,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "var(--radius-sm, 8px)",
          }}
        >
          <X size={20} />
        </button>
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
            onClick={() => setOpen(false)}
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
          aria-expanded={open}
          style={hamburgerStyle}
          onClick={() => setOpen(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={overlayVariants}
                transition={{ duration: 0.25 }}
                style={overlayStyle}
                onClick={() => setOpen(false)}
              />
              <motion.aside
                initial="closed"
                animate="open"
                exit="closed"
                variants={drawerVariants}
                transition={{ type: "spring", damping: 28, stiffness: 300 }}
                style={mobileDrawerStyle}
              >
                {content}
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  return <aside style={outerStyle}>{content}</aside>;
}
