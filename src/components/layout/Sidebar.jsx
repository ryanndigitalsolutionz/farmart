/**
 * Sidebar.jsx
 * ------------------------------------------------------------------
 * Admin-only left nav. Pulls live badge counts (pending farmers, open
 * disputes, flagged listings) from AdminContext so the sidebar always
 * reflects reality without each page managing its own count.
 *
 * Note: this is the ADMIN sidebar specifically. It's separate from
 * whatever generic Navbar/Footer Shadrack builds for the public/buyer/
 * farmer shell — admin has its own left-nav dashboard layout instead
 * of a top navbar, matching the design board.
 * ------------------------------------------------------------------
 */
import { NavLink } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";

const NAV_ITEMS = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/admin/users", label: "Users", icon: "👥" },
  { to: "/admin/farmers", label: "Farmers", icon: "🚜", countKey: "pendingFarmerCount" },
  { to: "/admin/listings", label: "Listings", icon: "🐄", countKey: "flaggedListingCount" },
  { to: "/admin/orders", label: "Orders", icon: "📦" },
  { to: "/admin/transactions", label: "Transactions", icon: "💳" },
  { to: "/admin/disputes", label: "Disputes", icon: "⚖️", countKey: "openDisputeCount" },
  { to: "/admin/reports", label: "Reports", icon: "📈" },
  { to: "/admin/settings", label: "Settings", icon: "⚙️" },
  { to: "/admin/announcements", label: "Announcements", icon: "📣" },
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
          fontFamily: "var(--font-display, 'Fraunces', serif)",
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
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span aria-hidden="true">{item.icon}</span>
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
        }}
      >
        🚪 Logout
      </NavLink>
    </aside>
  );
}
