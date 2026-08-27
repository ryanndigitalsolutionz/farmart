import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NotificationMenu from "../ui/NotificationMenu";
import ThemeToggle from "../ui/ThemeToggle";
import Avatar from "../ui/Avatar";
import { ChevronRight } from "lucide-react";

const NAV_HEIGHT = 64;

const outerStyle = {
  position: "sticky",
  top: 0,
  zIndex: 90,
  height: NAV_HEIGHT,
  background: "var(--glass-bg)",
  borderBottom: "1px solid var(--glass-border)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
};

const innerStyle = {
  maxWidth: 1400,
  margin: "0 auto",
  padding: "0 20px",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const leftStyle = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 14,
  color: "var(--color-text-muted)",
  minWidth: 0,
};

const breadcrumbLinkStyle = {
  color: "var(--color-text-muted)",
  textDecoration: "none",
  fontSize: 14,
  flexShrink: 0,
};

const breadcrumbActiveStyle = {
  color: "var(--color-text)",
  fontWeight: 700,
  fontSize: 14,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const rightStyle = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  flexShrink: 0,
};

const iconButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  borderRadius: "var(--radius-sm, 8px)",
  border: "1px solid transparent",
  background: "transparent",
  color: "var(--color-text)",
  cursor: "pointer",
  position: "relative",
  transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
};

const breadcrumbMap = {
  "/admin/dashboard": "Dashboard",
  "/admin/users": "Users",
  "/admin/farmers": "Farmers",
  "/admin/farmers/:id": "Farmer Details",
  "/admin/listings": "Listings",
  "/admin/orders": "Orders",
  "/admin/transactions": "Transactions",
  "/admin/disputes": "Disputes",
  "/admin/reports": "Reports",
  "/admin/settings": "Settings",
  "/admin/announcements": "Announcements",
  "/admin/buyers/:id": "Buyer Details",
};

export default function AdminTopbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;
  let label = "Dashboard";
  for (const [route, name] of Object.entries(breadcrumbMap)) {
    if (route.includes(":")) {
      const pattern = route.replace(":id", ".*");
      if (new RegExp(`^${pattern}$`).test(path)) {
        label = name;
        break;
      }
    } else if (path === route) {
      label = name;
      break;
    }
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header style={outerStyle}>
      <div style={innerStyle}>
        <div style={leftStyle}>
          <nav style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0, overflow: "hidden" }} aria-label="Breadcrumb">
            <Link to="/admin" style={breadcrumbLinkStyle}>Admin</Link>
            <ChevronRight size={14} style={{ color: "var(--color-text-muted)", flexShrink: 0 }} />
            <span style={breadcrumbActiveStyle}>{label}</span>
          </nav>
        </div>
        <div style={{ ...rightStyle, gap: 6 }} className="admin-topbar-right">
          <ThemeToggle ariaLabel="Toggle theme" />
          <NotificationMenu />
          <div style={{ position: "relative", display: "inline-flex" }}>
            <button
              type="button"
              aria-label="Account menu"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", border: "none", padding: 0, cursor: "pointer", color: "var(--color-text)" }}
            >
              <Avatar name={user?.name} size={30} />
              <span style={{ fontSize: 13, fontWeight: 600 }} className="admin-username">{user?.name}</span>
            </button>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="admin-logout-btn"
            style={{
              ...iconButtonStyle,
              fontSize: 13,
              fontWeight: 600,
              width: "auto",
              padding: "0 12px",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
