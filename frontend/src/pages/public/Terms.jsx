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

const sectionStyle = {
  marginBottom: 18,
};

const headingStyle = {
  margin: "0 0 8px",
  fontSize: 16,
  fontWeight: 700,
  color: "var(--color-text)",
};

const textStyle = {
  margin: 0,
  fontSize: 14,
  color: "var(--color-text-muted)",
  lineHeight: 1.7,
};

export default function Terms() {
  return (
    <div style={outerStyle}>
      <main style={innerStyle}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <FarmartLogo size="md" />
          <h1 style={{ ...titleStyle, marginTop: 12 }}>Terms of Service</h1>
          <p style={subtitleStyle}>Rules and responsibilities for using the Farmart marketplace.</p>
        </div>

        <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg, 16px)", padding: 24 }}>
          {[
            { heading: "Acceptance of Terms", body: "By creating an account or using Farmart, you agree to these terms and all applicable marketplace rules." },
            { heading: "Account Responsibilities", body: "Keep your login secure, provide accurate information, and notify us of unauthorized use." },
            { heading: "Listing Rules", body: "Listings must be accurate, lawful, and not misleading. Misrepresentation may lead to removal or account action." },
            { heading: "Transactions", body: "Buyers and farmers are responsible for agreeing on delivery, pricing, and payment terms outside or inside the platform as indicated." },
            { heading: "Limitation of Liability", body: "Farmart provides the marketplace infrastructure and is not liable for losses from livestock transactions unless caused by platform negligence." },
          ].map((item) => (
            <div key={item.heading} style={sectionStyle}>
              <h2 style={headingStyle}>{item.heading}</h2>
              <p style={textStyle}>{item.body}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link to="/" style={{ color: "var(--color-primary)", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← Back to Farmart</Link>
        </div>
      </main>
    </div>
  );
}
