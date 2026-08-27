import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import ThemeToggle from "../ui/ThemeToggle";
import UserMenu from "../ui/UserMenu";
import NotificationMenu from "../ui/NotificationMenu";
import { ShoppingCart, Heart } from "lucide-react";
import FarmartLogo from "../branding/FarmartLogo";

const NAV_HEIGHT = 64;

const outerStyle = {
  position: "sticky",
  top: 0,
  zIndex: 100,
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
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  alignItems: "center",
};

const logoStyle = {
  fontFamily: "var(--font-display, 'Fraunces', serif)",
  fontSize: 20,
  fontWeight: 700,
  color: "var(--color-primary)",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  flexShrink: 0,
};

const navCenterStyle = {
  justifySelf: "center",
};

const navLinksStyle = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  listStyle: "none",
  margin: 0,
  padding: 0,
};

const navLinkStyle = (isActive) => ({
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 600,
  color: isActive ? "var(--color-primary)" : "var(--color-text)",
  padding: "8px 12px",
  borderRadius: "var(--radius-sm, 8px)",
  transition: "color 0.2s ease, background 0.2s ease",
});

const rightStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  flexShrink: 0,
  justifySelf: "end",
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
  textDecoration: "none",
};

const badgeStyle = {
  position: "absolute",
  top: -4,
  right: -4,
  background: "var(--color-danger)",
  color: "#fff",
  fontSize: 10,
  fontWeight: 700,
  borderRadius: 999,
  minWidth: 18,
  height: 18,
  padding: "0 4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const menuItems = [
  { to: "/", label: "Home" },
  { to: "/buyer/marketplace", label: "Marketplace" },
  { to: "/farmer", label: "Farmers" },
];

export default function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useAuth();
  const { count: wishlistCount } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header
      style={{
        ...outerStyle,
        background: scrolled ? "var(--glass-bg-strong)" : "var(--glass-bg)",
        boxShadow: scrolled ? "var(--shadow-md)" : "none",
      }}
    >
      <div style={innerStyle}>
        <Link to="/" style={logoStyle}>
          <FarmartLogo size="md" />
        </Link>

        <div style={navCenterStyle}>
          <nav aria-label="Main">
            <ul style={navLinksStyle}>
              {menuItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} style={navLinkStyle(isActive(item.to))}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div style={rightStyle}>
          <ThemeToggle ariaLabel="Toggle theme" />

          {isAuthenticated ? (
            <>
              <Link to="/buyer/marketplace" aria-label="Marketplace" style={iconButtonStyle}>
                <ShoppingCart size={18} />
              </Link>
              <Link to="/buyer/wishlist" aria-label="Wishlist" style={iconButtonStyle}>
                <Heart size={18} />
                {wishlistCount > 0 && <span style={badgeStyle}>{wishlistCount}</span>}
              </Link>
              <NotificationMenu />
              <UserMenu />
            </>
          ) : (
            <>
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
                  transition: "background 0.2s ease, border-color 0.2s ease",
                }}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 16px",
                  borderRadius: "var(--radius-sm, 8px)",
                  border: "1px solid var(--color-primary)",
                  background: "var(--color-primary)",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "background 0.2s ease, transform 0.2s ease",
                }}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
