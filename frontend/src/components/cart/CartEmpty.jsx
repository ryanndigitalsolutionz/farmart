import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const outer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 14,
  padding: "60px 20px",
  textAlign: "center",
};

const illustration = {
  fontSize: 60,
  lineHeight: 1,
};

const title = {
  fontFamily: "var(--font-display, 'Fraunces', serif)",
  fontSize: 20,
  fontWeight: 700,
  color: "var(--text-dark, #1E2A1F)",
  margin: 0,
};

const text = {
  fontSize: 14,
  color: "var(--text-muted, #66766A)",
  maxWidth: 360,
  lineHeight: 1.6,
};

const linkStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 18px",
  borderRadius: 10,
  background: "var(--color-cta-bg)",
  color: "var(--color-cta-text)",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: 14,
};

export default function CartEmpty() {
  return (
    <div style={outer}>
      <span aria-hidden="true" style={illustration}>🛒</span>
      <h2 style={title}>Your cart is empty</h2>
      <p style={text}>
        Looks like you haven't added any livestock to your cart yet.
        Browse the marketplace to find what you need.
      </p>
      <Link to="/marketplace" style={linkStyle}>
        Browse Marketplace <ArrowRight size={16} />
      </Link>
    </div>
  );
}
