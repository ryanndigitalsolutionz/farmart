import { useState } from "react";
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
  maxWidth: 780,
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

export default function ReportProblem() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={outerStyle}>
      <main style={innerStyle}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <FarmartLogo size="md" />
          <h1 style={{ ...titleStyle, marginTop: 12 }}>Report a Problem</h1>
          <p style={subtitleStyle}>
            Found suspicious activity, a fraudulent listing, or a safety concern? Tell us and we will investigate.
          </p>
        </div>

        <div style={cardStyle}>
          {submitted ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>🛡️</div>
              <h2 style={{ margin: "0 0 8px", fontSize: 20, color: "var(--color-text)" }}>Report received</h2>
              <p style={{ margin: "0 0 16px", color: "var(--color-text-muted)", fontSize: 14 }}>
                Thank you. Our trust and safety team will review this report.
              </p>
              <Link to="/" style={{ color: "var(--color-primary)", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>Back to Farmart</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gap: 12 }}>
                <input placeholder="Your name" style={fieldStyle} />
                <input type="email" placeholder="Your email" style={fieldStyle} />
                <input placeholder="Related listing or order ID (optional)" style={fieldStyle} />
                <textarea placeholder="Describe the problem" style={textareaStyle} />
                <button type="submit" style={buttonStyle}>Submit Report</button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
