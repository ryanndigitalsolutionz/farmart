import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api";

export default function Profile() {
  const { user, logout } = useAuth();
  const initial = { name: user?.name || "", email: user?.email || "", location: user?.location || "", contact: user?.contact || "" };
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.updateUser(user.id, form);
      alert("Profile updated.");
    } catch (e) {
      alert(e.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "28px 20px" }}>
      <h1 style={{ fontFamily: "'IBM Plex Serif', serif", fontSize: 28, color: "var(--text-dark, #1E2A1F)", margin: "0 0 20px" }}>My Profile</h1>

      <div style={{ background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 12, padding: 20, boxShadow: "0 6px 20px rgba(29,78,42,0.05)", marginBottom: 20 }}>
        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[["Full Name", "name", form.name], ["Email", "email", form.email, true], ["Location", "location", form.location], ["Contact", "contact", form.contact]].map(([label, key, value, disabled]) => (
            <div key={key}>
              <label style={{ fontSize: 13, color: "var(--text-muted, #66766A)" }}>{label}</label>
              <input value={value} disabled={disabled} onChange={(e) => update(key, e.target.value)} style={{ width: "100%", marginTop: 6, padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border, #DCE6D8)", fontSize: 14, background: disabled ? "#f3f4f6" : "#fff" }} />
            </div>
          ))}
          <div>
            <label style={{ fontSize: 13, color: "var(--text-muted, #66766A)" }}>Role</label>
            <div style={{ marginTop: 6, padding: "10px 12px", background: "#f3f4f6", borderRadius: 8, fontSize: 14, color: "var(--text-muted, #66766A)", textTransform: "capitalize" }}>{user?.role}</div>
          </div>
          <button type="submit" disabled={saving} style={{ alignSelf: "flex-start", padding: "10px 18px", background: "var(--green-700, #2F6D3F)", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", opacity: saving ? 0.7 : 1 }}>{saving ? "Saving..." : "Save Changes"}</button>
        </form>
      </div>

      <div style={{ background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 12, padding: 20, boxShadow: "0 6px 20px rgba(29,78,42,0.05)" }}>
        <h3 style={{ fontFamily: "'IBM Plex Serif', serif", margin: "0 0 12px", color: "var(--text-dark, #1E2A1F)" }}>Account</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link to="/buyer/orders" style={{ color: "var(--green-700, #2F6D3F)", textDecoration: "none", fontWeight: 600, fontSize: 14 }}>Order History</Link>
          <button onClick={handleLogout} style={{ alignSelf: "flex-start", background: "#DC2626", color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Logout</button>
        </div>
      </div>
    </div>
  );
}
