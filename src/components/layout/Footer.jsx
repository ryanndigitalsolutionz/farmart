import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { Globe, Mail, Phone, MapPin } from "lucide-react";
import FarmartLogo from "../branding/FarmartLogo";

const outerStyle = {
  background: "var(--color-surface)",
  borderTop: "1px solid var(--color-border)",
  padding: "var(--space-3xl, 64px) var(--space-lg, 24px) var(--space-lg, 24px)",
  marginTop: "auto",
};

const innerStyle = {
  maxWidth: 1200,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "var(--space-xl, 32px)",
};

const columnStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const linkStyle = {
  color: "var(--color-text-muted)",
  textDecoration: "none",
  fontSize: 14,
  transition: "color 0.15s ease",
};

const bottomStyle = {
  maxWidth: 1200,
  margin: "var(--space-xl, 32px) auto 0",
  paddingTop: 20,
  borderTop: "1px solid var(--color-border)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 12,
  fontSize: 13,
  color: "var(--color-text-muted)",
};

const socialLinkStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  borderRadius: "var(--radius-sm, 8px)",
  border: "1px solid var(--color-border)",
  color: "var(--color-text-muted)",
  textDecoration: "none",
  transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
};

export default function Footer() {
  const { isAuthenticated, logout, role } = useAuth();

  return (
    <footer style={outerStyle}>
      <div style={innerStyle}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          style={columnStyle}
        >
          <FarmartLogo size="md" />
          <p style={{ fontSize: 14, color: "var(--color-text-muted)", lineHeight: 1.7, maxWidth: 280, margin: 0 }}>
            A digital marketplace connecting farmers and buyers across Kenya. Safe, transparent, and community-first.
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            {[Globe, Mail, Phone, MapPin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label={Icon.displayName || "Contact"}
                style={socialLinkStyle}
                onClick={(e) => e.preventDefault()}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.05 }}
          style={columnStyle}
        >
          <div style={{ fontWeight: 700, fontSize: 14, color: "var(--color-text)" }}>Marketplace</div>
          <Link to="/buyer/marketplace" style={linkStyle}>Browse Livestock</Link>
          <Link to="/buyer/marketplace?type=cattle" style={linkStyle}>Cattle</Link>
          <Link to="/buyer/marketplace?type=goat" style={linkStyle}>Goats</Link>
          <Link to="/buyer/marketplace?type=sheep" style={linkStyle}>Sheep</Link>
          <Link to="/buyer/marketplace?type=poultry" style={linkStyle}>Poultry</Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={columnStyle}
        >
          <div style={{ fontWeight: 700, fontSize: 14, color: "var(--color-text)" }}>For Farmers</div>
          <Link to="/register" style={linkStyle}>Become a Farmer</Link>
          <Link to="/farmer/listings/new" style={linkStyle}>Create Listing</Link>
          <Link to="/farmer" style={linkStyle}>Farmer Dashboard</Link>
          <Link to="/farm-setup" style={linkStyle}>Farm Setup</Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.15 }}
          style={columnStyle}
        >
          <div style={{ fontWeight: 700, fontSize: 14, color: "var(--color-text)" }}>Support</div>
          <Link to="/help" style={linkStyle}>Help Center</Link>
          <Link to="/contact" style={linkStyle}>Contact</Link>
          <Link to="/faqs" style={linkStyle}>FAQs</Link>
          <Link to="/report" style={linkStyle}>Report a Problem</Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={columnStyle}
        >
          <div style={{ fontWeight: 700, fontSize: 14, color: "var(--color-text)" }}>Account</div>
          {isAuthenticated ? (
            <>
              <Link to={role === "admin" ? "/admin" : role === "farmer" ? "/farmer" : "/buyer"} style={linkStyle}>Dashboard</Link>
              <Link to="/buyer/profile" style={linkStyle}>Profile</Link>
              <Link to="/buyer/orders" style={linkStyle}>Orders</Link>
              <button
                type="button"
                onClick={() => { logout(); }}
                style={{ ...linkStyle, background: "transparent", border: "none", padding: 0, textAlign: "left", cursor: "pointer" }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={linkStyle}>Sign In</Link>
              <Link to="/register" style={linkStyle}>Create Account</Link>
            </>
          )}
        </motion.div>
      </div>

      <div style={bottomStyle}>
        <div>© {new Date().getFullYear()} Farmart. All rights reserved.</div>
        <div style={{ display: "flex", gap: 16 }}>
          <Link to="/privacy" style={{ ...linkStyle, fontSize: 13 }}>Privacy</Link>
          <Link to="/terms" style={{ ...linkStyle, fontSize: 13 }}>Terms</Link>
        </div>
      </div>
    </footer>
  );
}
