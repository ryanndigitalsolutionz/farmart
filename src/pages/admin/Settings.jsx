import { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { getCommissionRate, updateCommissionRate } from "../../api/adminApi";

export default function Settings() {
  const [commission, setCommission] = useState(2.5);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  const [name, setName] = useState(user?.name || "Admin User");
  const [email, setEmail] = useState(user?.email || "admin@farmart.co.ke");
  const [accountSaved, setAccountSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const rate = await getCommissionRate();
        if (!cancelled) setCommission(Number(rate.percentage || 2.5));
      } catch {
        // keep default
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await updateCommissionRate(Number(commission));
      setSaved(true);
    } catch {
      // keep saved flag off on error
    } finally {
      setSaving(false);
    }
  };

  const handleAccountSave = (e) => {
    e.preventDefault();
    setAccountSaved(true);
    setTimeout(() => setAccountSaved(false), 2000);
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid var(--border, #DCE6D8)",
    marginBottom: 12,
    background: "var(--white, #fff)",
    color: "var(--text-dark, #1E2A1F)",
  };

  const cardStyle = {
    border: "1px solid var(--border, #DCE6D8)",
    borderRadius: 12,
    padding: 20,
    maxWidth: 420,
    marginBottom: 24,
    background: "var(--white, #fff)",
  };

  const labelStyle = { fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 };

  const buttonStyle = {
    background: "var(--green-700, #2F6D3F)",
    color: "#fff",
    border: "none",
    padding: "9px 16px",
    borderRadius: 8,
    fontWeight: 600,
    cursor: "pointer",
  };

  return (
    <div>
      <PageHeader title="Settings" subtitle="Platform-wide configuration" />

      <div style={cardStyle}>
        <h3 style={{ margin: "0 0 14px", fontSize: 15 }}>Appearance</h3>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ margin: 0, fontWeight: 600, fontSize: 13.5 }}>
              {theme === "dark" ? "Dark mode" : "Light mode"}
            </p>
            <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted, #66766A)" }}>
              Switch how the admin panel looks
            </p>
          </div>
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            style={{
              width: 46,
              height: 26,
              borderRadius: 13,
              border: "none",
              cursor: "pointer",
              background: theme === "dark" ? "var(--green-700, #2F6D3F)" : "#ccc",
              position: "relative",
              transition: "background 0.2s",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 3,
                left: theme === "dark" ? 23 : 3,
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "#fff",
                transition: "left 0.2s",
              }}
            />
          </button>
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: "0 0 14px", fontSize: 15 }}>Account details</h3>
        <form onSubmit={handleAccountSave}>
          <label style={labelStyle}>Full name</label>
          <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} />

          <label style={labelStyle}>Email</label>
          <input
            style={inputStyle}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label style={labelStyle}>Role</label>
          <input style={{ ...inputStyle, opacity: 0.6 }} value={user?.role || "admin"} disabled />

          <button type="submit" style={buttonStyle}>
            Save account
          </button>
          {accountSaved && (
            <p style={{ color: "var(--green-700, #2F6D3F)", marginTop: 8, fontSize: 13 }}>
              Saved locally.
            </p>
          )}
        </form>
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: "0 0 14px", fontSize: 15 }}>Commission rate</h3>
        <label style={labelStyle}>Commission rate (%)</label>
        <input
          type="number"
          value={commission}
          onChange={(e) => setCommission(Number(e.target.value))}
          style={inputStyle}
        />
        <button onClick={handleSave} disabled={saving} style={buttonStyle}>
          {saving ? "Saving…" : "Save"}
        </button>
        {saved && <p style={{ color: "var(--green-700, #2F6D3F)", marginTop: 8 }}>Saved.</p>}
      </div>
    </div>
  );
}