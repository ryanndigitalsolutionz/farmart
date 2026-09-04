import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "#f7faf7" }}>
      <div style={{ maxWidth: 420, textAlign: "center", background: "#fff", padding: 48, borderRadius: 24, border: "1px solid #d8e5da" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🔍</div>
        <h1 style={{ margin: "0 0 8px", color: "#17351f", fontFamily: "'IBM Plex Serif', serif", fontSize: 32 }}>404</h1>
        <p style={{ margin: "0 0 24px", color: "#65766a", fontSize: 15 }}>This page doesn't exist or has been moved.</p>
        <Link to="/" style={{ display: "inline-block", padding: "10px 24px", borderRadius: 10, border: "1px solid #277a44", background: "#277a44", color: "#fff", textDecoration: "none", fontWeight: 600 }}>
          Go Home
        </Link>
      </div>
    </div>
  );
}
