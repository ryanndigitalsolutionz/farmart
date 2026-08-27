import { useState, useMemo } from "react";
import PageHeader from "../../components/layout/PageHeader";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api";

export default function FarmProfile() {
  const { user, farmProfile, updateFarmProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const source = useMemo(() => farmProfile || user, [farmProfile, user]);
  const [form, setForm] = useState(() => ({
    farmName: source?.farmName || "",
    location: source?.location || "",
    contact: source?.contact || "",
    description: source?.description || "",
  }));
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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
      updateFarmProfile(form);
      setSuccess("Farm profile updated successfully.");
      setEditing(false);
    } catch (err) {
      setError(err.message || "Failed to update farm profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageHeader title="Farm Profile" subtitle="Manage your farm details and verification" />

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

      {/* Verification status */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: user?.isVerified ? "#EAF3E6" : "#FBF0D2",
          border: `1px solid ${user?.isVerified ? "#DCE6D8" : "#F0D9A8"}`,
          borderRadius: 20,
          padding: "6px 14px",
          marginBottom: 20,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: user?.isVerified ? "#277a44" : "#8A6D1B",
          }}
        />
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: user?.isVerified ? "#2F6D3F" : "#8A6D1B",
            fontFamily: "Modern Antiqua, serif",
          }}
        >
          {user?.isVerified ? "Verified Farm" : "Pending Verification"}
        </span>
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
        <Field label="Farm Name">
          <input value={form.farmName} onChange={handleChange("farmName")} style={inputStyle} disabled={!editing} />
        </Field>
        <Field label="Location">
          <input value={form.location} onChange={handleChange("location")} style={inputStyle} disabled={!editing} />
        </Field>
        <Field label="Contact">
          <input value={form.contact} onChange={handleChange("contact")} style={inputStyle} disabled={!editing} />
        </Field>
        <Field label="Description">
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
              Edit Farm Profile
            </button>
          )}
        </div>
      </form>
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
