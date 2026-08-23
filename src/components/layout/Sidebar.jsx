import { NavLink } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import {
  LayoutDashboard,
  Users,
  Tractor,
  Beef,
  Package,
  CreditCard,
  Scale,
  BarChart3,
  Settings,
  Megaphone,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/admin/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { to: "/admin/users", label: "Users", Icon: Users },
  { to: "/admin/farmers", label: "Farmers", Icon: Tractor, countKey: "pendingFarmerCount" },
  { to: "/admin/listings", label: "Listings", Icon: Beef, countKey: "flaggedListingCount" },
  { to: "/admin/orders", label: "Orders", Icon: Package },
  { to: "/admin/transactions", label: "Transactions", Icon: CreditCard },
  { to: "/admin/disputes", label: "Disputes", Icon: Scale, countKey: "openDisputeCount" },
  { to: "/admin/reports", label: "Reports", Icon: BarChart3 },
  { to: "/admin/settings", label: "Settings", Icon: Settings },
  { to: "/admin/announcements", label: "Announcements", Icon: Megaphone },
];

export default function Sidebar() {
  const counts = useAdmin();

  return (
    <aside
      style={{
        width: 220,
        flex: "0 0 auto",
        borderRight: "1px solid var(--border, #DCE6D8)",
        padding: "20px 12px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display, 'IBM Plex Serif', serif)",
          fontWeight: 700,
          fontSize: 18,
          color: "var(--green-900, #163420)",
          padding: "0 10px 18px",
        }}
      >
        Farmart <span style={{ fontSize: 11, fontWeight: 500, color: "var(--text-muted, #66766A)" }}>Admin</span>
      </div>

      {NAV_ITEMS.map((item) => {
        const count = item.countKey ? counts[item.countKey] : 0;
        const { Icon } = item;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "9px 10px",
              borderRadius: 8,
              fontSize: 13.5,
              fontWeight: 600,
              textDecoration: "none",
              color: isActive ? "var(--green-700, #2F6D3F)" : "var(--text-dark, #1E2A1F)",
              background: isActive ? "var(--green-100, #EAF3E6)" : "transparent",
            })}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Icon size={17} strokeWidth={2} />
              {item.label}
            </span>
            {!!count && (
              <span
                style={{
                  background: "var(--yellow-500, #E8B93D)",
                  color: "var(--green-900, #163420)",
                  fontSize: 10.5,
                  fontWeight: 700,
                  borderRadius: 10,
                  padding: "1px 7px",
                }}
              >
                {count}
              </span>
            )}
          </NavLink>
        );
      })}

      <NavLink
        to="/logout"
        style={{
          marginTop: "auto",
          padding: "9px 10px",
          fontSize: 13.5,
          fontWeight: 600,
          color: "var(--text-muted, #66766A)",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <LogOut size={17} strokeWidth={2} />
        Logout
      </NavLink>
    </aside>
  );
}