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

const faqs = [
  {
    q: "How do I create an account?",
    a: "Click Sign Up, choose Buyer or Farmer, then follow the onboarding steps. Farmers may need to complete farm setup before listing.",
  },
  {
    q: "Is Farmart free to use?",
    a: "Joining is free. Standard transaction fees apply when orders are completed through the platform.",
  },
  {
    q: "How are listings verified?",
    a: "Listings are reviewed by the platform for completeness and flagged when prices or descriptions look unusual.",
  },
  {
    q: "Can I pay on delivery?",
    a: "Supported payment methods are shown at checkout. Some orders may be eligible for delivery-based payment options.",
  },
  {
    q: "How do I report an issue?",
    a: "Use the Report a Problem page in the footer or contact support directly at support@farmart.co.ke.",
  },
];

export default function FAQs() {
  return (
    <div style={outerStyle}>
      <main style={innerStyle}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <FarmartLogo size="md" />
          <h1 style={{ ...titleStyle, marginTop: 12 }}>Frequently Asked Questions</h1>
          <p style={subtitleStyle}>Quick answers to common questions about using Farmart.</p>
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          {faqs.map((item) => (
            <div key={item.q} style={cardStyle}>
              <div style={{ fontWeight: 700, fontSize: 15, color: "var(--color-text)", marginBottom: 6 }}>{item.q}</div>
              <p style={{ margin: 0, fontSize: 14, color: "var(--color-text-muted)", lineHeight: 1.7 }}>{item.a}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link to="/contact" style={{ color: "var(--color-primary)", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>Contact support →</Link>
        </div>
      </main>
    </div>
  );
}
