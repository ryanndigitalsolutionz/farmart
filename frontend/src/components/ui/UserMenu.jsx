import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Avatar from "./Avatar";
import ThemeToggle from "./ThemeToggle";
import {
  LayoutDashboard,
  ClipboardList,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Store,
  LineChart,
  MapPin,
} from "lucide-react";

const overlayStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 150,
  background: "rgba(0, 0, 0, 0.18)",
};

const dropdownStyle = {
  position: "absolute",
  top: "calc(100% + 8px)",
  right: 0,
  width: 264,
  background: "var(--glass-bg-strong)",
  border: "1px solid var(--glass-border)",
  borderRadius: "var(--radius-md, 12px)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  boxShadow: "var(--shadow-glass)",
  zIndex: 151,
  overflow: "hidden",
  transformOrigin: "top right",
};

const menuItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 14px",
  fontSize: 14,
  fontWeight: 500,
  color: "var(--color-text)",
  textDecoration: "none",
  transition: "background 0.15s ease",
  border: "none",
  background: "transparent",
  width: "100%",
  cursor: "pointer",
  textAlign: "left",
};

const dividerStyle = {
  height: 1,
  background: "var(--color-border)",
  margin: "6px 0",
};

const iconStyle = {
  width: 18,
  height: 18,
  color: "var(--color-text-muted)",
  flexShrink: 0,
};

const dangerStyle = {
  color: "var(--color-danger)",
};

const mobileSheetStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 200,
  display: "flex",
  flexDirection: "column",
  background: "var(--glass-bg-strong)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
};

const buyerLinks = [
  { to: "/buyer", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/buyer/marketplace", icon: Store, label: "Marketplace" },
  { to: "/buyer/orders", icon: ClipboardList, label: "Orders" },
  { to: "/buyer/wishlist", icon: User, label: "Wishlist" },
  { to: "/buyer/profile", icon: User, label: "Profile" },
];

const farmerLinks = [
  { to: "/farmer", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/farmer/listings", icon: Store, label: "My Listings" },
  { to: "/farmer/orders", icon: ClipboardList, label: "Orders" },
  { to: "/farmer/analytics", icon: LineChart, label: "Analytics" },
  { to: "/farmer/farm-profile", icon: MapPin, label: "Farm Profile" },
  { to: "/farmer/profile", icon: User, label: "Profile" },
];

const adminLinks = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/users", icon: User, label: "Users" },
  { to: "/admin/farmers", icon: MapPin, label: "Farmers" },
  { to: "/admin/listings", icon: Store, label: "Listings" },
  { to: "/admin/orders", icon: ClipboardList, label: "Orders" },
  { to: "/admin/reports", icon: LineChart, label: "Reports" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

export default function UserMenu({ trigger, onMobileOpen }) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches);
  const { user, logout, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  if (!isAuthenticated || !user) {
    if (trigger) return trigger;
    return (
      <Link
        to="/login"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 16px",
          borderRadius: "var(--radius-sm, 8px)",
          border: "1px solid var(--color-border)",
          background: "transparent",
          color: "var(--color-text)",
          fontSize: 14,
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Sign In
      </Link>
    );
  }

  const links =
    role === "admin" ? adminLinks : role === "farmer" ? farmerLinks : buyerLinks;

  const handleNav = () => setOpen(false);

  const dropdownContent = (
    <div
      ref={ref}
      style={{
        ...dropdownStyle,
        animation: open ? "farmart-dropdown-in 0.18s ease-out" : "none",
      }}
    >
      <div style={{ padding: "14px", borderBottom: "1px solid var(--color-border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar name={user.name} size={36} />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</div>
            <div style={{ fontSize: 12, color: "var(--color-text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.email}</div>
            <div style={{ fontSize: 11, color: "var(--color-primary)", fontWeight: 600, textTransform: "capitalize", marginTop: 2 }}>{role}</div>
          </div>
        </div>
      </div>
      <div style={{ padding: "6px 0", maxHeight: 320, overflowY: "auto" }}>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={handleNav}
            style={menuItemStyle}
          >
            <link.icon style={iconStyle} />
            {link.label}
          </Link>
        ))}
        <div style={dividerStyle} />
        <div style={{ padding: "8px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>Theme</span>
          <ThemeToggle ariaLabel="Toggle theme" />
        </div>
        <div style={dividerStyle} />
        <button
          type="button"
          onClick={handleLogout}
          style={{ ...menuItemStyle, ...dangerStyle }}
        >
          <LogOut style={iconStyle} />
          Logout
        </button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <button
          type="button"
          onClick={() => onMobileOpen && onMobileOpen()}
          aria-label="Account menu"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", border: "none", padding: 0, cursor: "pointer", color: "var(--color-text)" }}
        >
          <Avatar name={user.name} image={user.avatar} />
        </button>
        {onMobileOpen && (
          <>
            <div style={{ position: "fixed", inset: 0, zIndex: 199, background: "rgba(0,0,0,0.35)" }} onClick={() => onMobileOpen()} />
            <div style={mobileSheetStyle}>
              <div style={{ padding: 16, borderBottom: "1px solid var(--color-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 700, fontSize: 18 }}>Account</div>
                <button
                  type="button"
                  onClick={() => onMobileOpen()}
                  style={{ background: "transparent", border: "none", fontSize: 22, color: "var(--color-text)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: "var(--radius-sm, 8px)" }}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>
              <div style={{ padding: 14, borderBottom: "1px solid var(--color-border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar name={user.name} size={44} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{user.name}</div>
                    <div style={{ fontSize: 13, color: "var(--color-text-muted)" }}>{user.email}</div>
                    <div style={{ fontSize: 12, color: "var(--color-primary)", fontWeight: 600, textTransform: "capitalize", marginTop: 2 }}>{role}</div>
                  </div>
                </div>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
                {links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={handleNav}
                    style={{ ...menuItemStyle, padding: "12px 14px" }}
                  >
                    <link.icon style={iconStyle} />
                    {link.label}
                  </Link>
                ))}
                <div style={dividerStyle} />
                <div style={{ padding: "8px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>Theme</span>
                  <ThemeToggle ariaLabel="Toggle theme" />
                </div>
                <div style={dividerStyle} />
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{ ...menuItemStyle, padding: "12px 14px", ...dangerStyle }}
                >
                  <LogOut style={iconStyle} />
                  Logout
                </button>
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-flex" }}>
      {trigger ? (
        <span onClick={() => setOpen(!open)} style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
          {trigger}
        </span>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Account menu"
          aria-expanded={open}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", border: "none", padding: 0, cursor: "pointer", color: "var(--color-text)" }}
        >
          <Avatar name={user.name} image={user.avatar} />
          <span style={{ fontSize: 14, fontWeight: 600 }}>{user.name}</span>
          <ChevronRight size={16} style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s ease", color: "var(--color-text-muted)" }} />
        </button>
      )}
      {open && (
        <>
          <div style={overlayStyle} onClick={() => setOpen(false)} />
          {dropdownContent}
        </>
      )}
    </div>
  );
}
