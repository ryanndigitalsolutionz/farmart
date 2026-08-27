import { NavLink } from "react-router-dom";

const outerStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  height: 64,
  background: "var(--glass-bg)",
  borderTop: "1px solid var(--glass-border)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  padding: "0 8px",
  zIndex: 100,
};

const linkBaseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
  textDecoration: "none",
  color: "var(--color-text-muted)",
  fontSize: 10.5,
  fontWeight: 600,
  flex: 1,
  padding: "6px 0",
  background: "transparent",
  border: "none",
  position: "relative",
  transition: "color 0.2s ease",
};

const activeStyle = {
  color: "var(--color-primary)",
};

const iconStyle = {
  fontSize: 20,
  lineHeight: 1,
};

const defaultItems = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/buyer/marketplace", label: "Market", icon: "🛒" },
  { to: "/buyer/orders", label: "Orders", icon: "📦" },
  { to: "/buyer/wishlist", label: "Wishlist", icon: "🤍" },
  { to: "/buyer/profile", label: "Profile", icon: "👤" },
];

export default function MobileNav({ items = defaultItems }) {
  return (
    <nav style={outerStyle} aria-label="Mobile navigation">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          style={({ isActive }) => ({
            ...linkBaseStyle,
            ...(isActive ? activeStyle : {}),
          })}
        >
          <span style={iconStyle} aria-hidden="true">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
