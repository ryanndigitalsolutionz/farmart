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

export default function Privacy() {
  return (
    <div style={outerStyle}>
      <main style={innerStyle}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <FarmartLogo size="md" />
          <h1 style={{ ...titleStyle, marginTop: 12 }}>Privacy Policy</h1>
          <p style={subtitleStyle}>How Farmart collects, uses, and protects your information.</p>
        </div>

        <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg, 16px)", padding: 24 }}>
          {[
            { heading: "Information We Collect", body: "Account details, farm information, listing content, order activity, and support messages needed to operate the marketplace." },
            { heading: "How We Use Information", body: "To operate listings, process orders, improve safety, communicate updates, and comply with applicable regulations." },
            { heading: "Data Sharing", body: "We share information with counterparties in transactions, service providers, and authorities when legally required." },
            { heading: "Your Choices", body: "You can update profile information, manage notifications, and request account deletion where applicable." },
            { heading: "Security", body: "We use administrative and technical safeguards to protect data, but no system is completely secure." },
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
