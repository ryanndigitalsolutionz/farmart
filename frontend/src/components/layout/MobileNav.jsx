import { NavLink } from "react-router-dom";
import { Home, ShoppingCart, Package, Heart, User } from "lucide-react";

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
  padding: "0 8px env(safe-area-inset-bottom, 8px)",
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
  padding: "8px 0",
  background: "transparent",
  border: "none",
  position: "relative",
  transition: "color 0.2s ease",
  minHeight: 48,
  justifyContent: "center",
};

const activeStyle = {
  color: "var(--color-primary)",
};

const iconWrapperStyle = {
  width: 24,
  height: 24,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

const defaultItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/buyer/marketplace", label: "Market", icon: ShoppingCart },
  { to: "/buyer/orders", label: "Orders", icon: Package },
  { to: "/buyer/wishlist", label: "Wishlist", icon: Heart },
  { to: "/buyer/profile", label: "Profile", icon: User },
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
          <span style={iconWrapperStyle} aria-hidden="true">
            <item.icon size={22} strokeWidth={2.2} />
          </span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
