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
  maxWidth: 720,
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
  margin: "0 0 16px",
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

const fieldStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "var(--radius-sm, 8px)",
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  color: "var(--color-text)",
  fontSize: 14,
  marginBottom: 12,
};

const textareaStyle = {
  ...fieldStyle,
  minHeight: 140,
  resize: "vertical",
};

const buttonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  padding: "12px 20px",
  borderRadius: "var(--radius-sm, 8px)",
  border: "none",
  background: "var(--color-primary)",
  color: "#fff",
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
};

const contactMethods = [
  { label: "Email", value: "support@farmart.co.ke", href: "mailto:support@farmart.co.ke" },
  { label: "Phone", value: "+254 700 000 000", href: "tel:+254700000000" },
  { label: "Location", value: "Nairobi, Kenya", href: null },
];

export default function Contact() {
  return (
    <div style={outerStyle}>
      <main style={innerStyle}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <FarmartLogo size="md" />
          <h1 style={{ ...titleStyle, marginTop: 12 }}>Contact Us</h1>
          <p style={subtitleStyle}>
            Have a question about buying, selling, or verifying a farm? Send us a message and the Farmart support team will respond within 24 hours.
          </p>
        </div>

        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          {contactMethods.map((item) => (
            <div key={item.label} style={cardStyle}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--color-text-muted)", marginBottom: 6 }}>{item.label}</div>
              {item.href ? (
                <a href={item.href} style={{ color: "var(--color-primary)", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>{item.value}</a>
              ) : (
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text)" }}>{item.value}</div>
              )}
            </div>
          ))}
        </div>

        <form style={{ ...cardStyle, marginTop: 16 }} onSubmit={(e) => { e.preventDefault(); }}>
          <div style={{ display: "grid", gap: 12 }}>
            <input placeholder="Your name" style={fieldStyle} />
            <input type="email" placeholder="Your email" style={fieldStyle} />
            <input placeholder="Subject" style={fieldStyle} />
            <textarea placeholder="How can we help?" style={textareaStyle} />
            <button type="submit" style={buttonStyle}>Send Message</button>
          </div>
        </form>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link to="/" style={{ color: "var(--color-primary)", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← Back to Farmart</Link>
        </div>
      </main>
    </div>
  );
}
