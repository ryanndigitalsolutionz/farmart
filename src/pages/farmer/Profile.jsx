import { useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import { useAuth } from "../../context/AuthContext";
import { useLivestock } from "../../context/LivestockContext";
import { api } from "../../api";
import { Star } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const { listings } = useLivestock();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(() => ({
    name: "",
    email: "",
    location: "",
    contact: "",
    description: "",
  }));
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const myListings = listings.filter((l) => l.farmerId === user?.id);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setError("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await api.updateUser(user.id, form);
      setSuccess("Profile updated successfully.");
      setEditing(false);
    } catch (err) {
      setError(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageHeader title="Profile" subtitle="Your personal account information" />

      {error && (
        <p
          style={{
            color: "#B2503E",
            background: "#FFF5F3",
            border: "1px solid #F0C9C1",
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 16,
            fontSize: 13,
            fontFamily: "Modern Antiqua, serif",
          }}
        >
          {error}
        </p>
      )}
      {success && (
        <p
          style={{
            color: "#2F6D3F",
            background: "#EAF3E6",
            border: "1px solid #DCE6D8",
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 16,
            fontSize: 13,
            fontFamily: "Modern Antiqua, serif",
          }}
        >
          {success}
        </p>
      )}

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 14,
          marginBottom: 24,
        }}
      >
        <StatCard label="Rating" value={user?.rating ? <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>{user.rating} <Star size={14} color="#F59E0B" fill="#F59E0B" /></span> : "—"} />
        <StatCard label="Reviews" value={String(user?.reviewCount ?? 0)} />
        <StatCard label="Listings" value={String(myListings.length)} />
      </div>

      <form
        onSubmit={handleSave}
        style={{
          maxWidth: 600,
          background: "var(--white, #fff)",
          border: "1px solid var(--border, #DCE6D8)",
          borderRadius: 14,
          padding: "22px 24px",
          display: "grid",
          gap: 16,
        }}
      >
        <Field label="Full Name">
          <input value={form.name} onChange={handleChange("name")} style={inputStyle} disabled={!editing} />
        </Field>
        <Field label="Email">
          <input value={form.email} onChange={handleChange("email")} style={inputStyle} disabled={!editing} />
        </Field>
        <Field label="Location">
          <input value={form.location} onChange={handleChange("location")} style={inputStyle} disabled={!editing} />
        </Field>
        <Field label="Contact">
          <input value={form.contact} onChange={handleChange("contact")} style={inputStyle} disabled={!editing} />
        </Field>
        <Field label="Bio">
          <textarea
            value={form.description}
            onChange={handleChange("description")}
            rows={3}
            style={{ ...inputStyle, minHeight: 70 }}
            disabled={!editing}
          />
        </Field>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          {editing ? (
            <>
              <button
                type="button"
                onClick={() => setEditing(false)}
                style={{
                  background: "transparent",
                  color: "var(--text-muted, #66766A)",
                  border: "1px solid var(--border, #DCE6D8)",
                  borderRadius: 10,
                  padding: "10px 16px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "Modern Antiqua, serif",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                style={{
                  background: "#277a44",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 20px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: saving ? "not-allowed" : "pointer",
                  opacity: saving ? 0.7 : 1,
                  fontFamily: "Modern Antiqua, serif",
                }}
              >
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setEditing(true)}
              style={{
                background: "#277a44",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "10px 16px",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "Modern Antiqua, serif",
              }}
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div
      style={{
        background: "var(--green-100, #EAF3E6)",
        borderRadius: 14,
        padding: "14px 16px",
        border: "1px solid var(--border, #DCE6D8)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: "var(--text-muted, #66766A)",
          marginBottom: 4,
          fontFamily: "Modern Antiqua, serif",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 20,
          fontWeight: 800,
          color: "var(--text-dark, #1E2A1F)",
          fontFamily: "'IBM Plex Serif', serif",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "var(--text-dark, #1E2A1F)",
          fontFamily: "Modern Antiqua, serif",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  border: "1px solid var(--border, #DCE6D8)",
  borderRadius: 8,
  padding: "9px 12px",
  fontSize: 13.5,
  fontFamily: "Modern Antiqua, serif",
  color: "#17351f",
  background: "#f7faf7",
  outline: "none",
};
