import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import ThemeToggle from "../ui/ThemeToggle";
import UserMenu from "../ui/UserMenu";
import NotificationMenu from "../ui/NotificationMenu";
import { ShoppingCart, Heart, Menu, X } from "lucide-react";
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
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
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

const rightStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
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

const drawerVariants = {
  closed: { x: "-100%" },
  open: { x: 0 },
};

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

export default function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { count: wishlistCount } = useWishlist();
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    if (!drawerOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [drawerOpen]);

  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      setDrawerOpen(false);
    }
  }, [location.pathname]);

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

        <nav style={{ display: "none", ...rightStyle }} aria-label="Main desktop" className="desktop-nav">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              style={{
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
                color: isActive(item.to) ? "var(--color-primary)" : "var(--color-text)",
                padding: "8px 12px",
                borderRadius: "var(--radius-sm, 8px)",
                transition: "color 0.2s ease, background 0.2s ease",
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={rightStyle}>
          <div style={{ display: "none" }} className="desktop-utilities">
            <ThemeToggle ariaLabel="Toggle theme" />
            {isAuthenticated && (
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
            )}
          </div>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
            style={{
              ...iconButtonStyle,
              display: "inline-flex",
            }}
            className="mobile-menu-btn"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              transition={{ duration: 0.25 }}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.35)",
                zIndex: 199,
              }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              initial="closed"
              animate="open"
              exit="closed"
              variants={drawerVariants}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              style={{
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
                padding: "20px 16px",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <FarmartLogo size="md" />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setDrawerOpen(false)}
                  style={{
                    ...iconButtonStyle,
                    width: 36,
                    height: 36,
                    borderRadius: "var(--radius-sm, 8px)",
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              <nav style={{ display: "flex", flexDirection: "column", gap: 4 }} aria-label="Mobile navigation">
                {menuItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setDrawerOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "12px 14px",
                      borderRadius: "var(--radius-sm, 8px)",
                      textDecoration: "none",
                      fontSize: 15,
                      fontWeight: 600,
                      color: isActive(item.to) ? "var(--color-primary)" : "var(--color-text)",
                      background: isActive(item.to) ? "var(--color-surface-secondary)" : "transparent",
                      transition: "background 0.15s ease",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <ThemeToggle ariaLabel="Toggle theme" />
                  {isAuthenticated && (
                    <>
                      <Link to="/buyer/wishlist" aria-label="Wishlist" style={iconButtonStyle}>
                        <Heart size={18} />
                        {wishlistCount > 0 && <span style={badgeStyle}>{wishlistCount}</span>}
                      </Link>
                      <NotificationMenu />
                    </>
                  )}
                </div>
                {isAuthenticated ? (
                  <UserMenu />
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                    <Link
                      to="/login"
                      onClick={() => setDrawerOpen(false)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        padding: "12px 16px",
                        borderRadius: "var(--radius-sm, 8px)",
                        border: "1px solid var(--color-border)",
                        background: "transparent",
                        color: "var(--color-text)",
                        fontSize: 14,
                        fontWeight: 600,
                        textDecoration: "none",
                        textAlign: "center",
                      }}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setDrawerOpen(false)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        padding: "12px 16px",
                        borderRadius: "var(--radius-sm, 8px)",
                        border: "1px solid var(--color-primary)",
                        background: "var(--color-primary)",
                        color: "#fff",
                        fontSize: 14,
                        fontWeight: 600,
                        textDecoration: "none",
                        textAlign: "center",
                      }}
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
