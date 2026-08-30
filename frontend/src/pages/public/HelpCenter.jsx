import { Link } from "react-router-dom";
import FarmartLogo from "../../components/branding/FarmartLogo";

const outerStyle = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  background: "var(--color-surface)",
};

const innerStyle = {
  flex: 1,
  maxWidth: 860,
  margin: "0 auto",
  padding: "64px 24px",
};

const cardStyle = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-lg, 16px)",
  padding: 24,
};

const titleStyle = {
  margin: "0 0 10px",
  fontFamily: "var(--font-display, 'Fraunces', serif)",
  fontSize: 28,
  fontWeight: 700,
  color: "var(--color-text)",
};

const subtitleStyle = {
  margin: "0 0 20px",
  fontSize: 15,
  color: "var(--color-text-muted)",
  lineHeight: 1.7,
};

export default function HelpCenter() {
  return (
    <div style={outerStyle}>
      <main style={innerStyle}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <FarmartLogo size="md" />
          <h1 style={{ ...titleStyle, marginTop: 12 }}>Help Center</h1>
          <p style={subtitleStyle}>Browse guides and resources for buyers, farmers, and sellers on Farmart.</p>
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          {[
            { title: "Getting Started", desc: "Create an account, verify your farm, and complete your first listing." },
            { title: "Buying Livestock", desc: "Search the marketplace, compare listings, and complete checkout safely." },
            { title: "Selling Livestock", desc: "Create listings, set prices, manage orders, and track performance." },
            { title: "Payments and Orders", desc: "Review payment options, order timelines, and dispute handling." },
            { title: "Account and Security", desc: "Manage profile settings, notifications, and account access." },
          ].map((item) => (
            <div key={item.title} style={cardStyle}>
              <div style={{ fontWeight: 700, fontSize: 15, color: "var(--color-text)", marginBottom: 6 }}>{item.title}</div>
              <p style={{ margin: 0, fontSize: 14, color: "var(--color-text-muted)", lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24, flexWrap: "wrap" }}>
          <Link to="/faqs" style={{ color: "var(--color-primary)", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>View FAQs</Link>
          <span style={{ color: "var(--color-text-muted)" }}>•</span>
          <Link to="/contact" style={{ color: "var(--color-primary)", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>Contact Support</Link>
        </div>
      </main>
    </div>
  );
}
