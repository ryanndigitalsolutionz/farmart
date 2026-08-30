import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function FarmerDetails() {
  const { farmerId } = useParams();
  const navigate = useNavigate();
  const { refreshOverview } = useAdmin();
  const [farmer, setFarmer] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getFarmerDetail(farmerId).then(setFarmer).catch(console.error);
  }, [farmerId]);

  const handleVerify = async () => {
    setBusy(true);
    try {
      await verifyFarmer(farmerId);
      refreshOverview();
      navigate("/admin/dashboard");
    } finally {
      setBusy(false);
    }
  };

  const handleReject = async () => {
    const reason = window.prompt("Reason for rejecting this farmer?");
    if (reason === null) return;
    setBusy(true);
    try {
      await rejectFarmer(farmerId, reason);
      refreshOverview();
      navigate("/admin/dashboard");
    } finally {
      setBusy(false);
    }
  };

  const handleSuspend = async () => {
    if (!window.confirm(`Suspend ${farmer.farm_name}'s account? They will be logged out immediately.`)) return;
    setBusy(true);
    try {
      await suspendUser(farmer.user_id);
      refreshOverview();
    } finally {
      setBusy(false);
    }
  };

  if (!farmer) return <p style={{ color: "var(--text-muted, #66766A)" }}>Loading farmer…</p>;

  return (
    <div style={{ maxWidth: 640 }}>
      <PageHeader
        title={farmer.farm_name}
        subtitle={`${farmer.location} · joined ${farmer.joined_date || "—"}`}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 22 }}>
        <Stat label="Listings" value={farmer.listing_count} />
        <Stat label="Animals sold" value={farmer.animals_sold} />
        <Stat label="Rating" value={farmer.rating ? `★ ${farmer.rating}` : "—"} />
      </div>

      <div style={{ border: "1px solid var(--border, #DCE6D8)", borderRadius: 14, padding: 18, marginBottom: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Contact</div>
        <div style={{ fontSize: 12.5, color: "var(--text-muted, #66766A)", lineHeight: 1.8 }}>
          <div>📞 {farmer.phone_number || "—"}</div>
          <div>✉️ {farmer.email || "—"}</div>
        </div>
        {farmer.description && (
          <>
            <div style={{ fontWeight: 700, fontSize: 13, margin: "16px 0 6px" }}>About the farm</div>
            <p style={{ fontSize: 12.5, color: "var(--text-muted, #66766A)", lineHeight: 1.6 }}>
              {farmer.description}
            </p>
          </>
        )}
      </div>

      {!farmer.is_verified ? (
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={handleVerify} disabled={busy} style={primaryBtn}>
            {busy ? "Working…" : "Approve verification"}
          </button>
          <button onClick={handleReject} disabled={busy} style={dangerOutlineBtn}>
            Reject
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 12.5, color: "var(--green-700, #2F6D3F)", fontWeight: 700 }}>
            ✓ Verified farmer
          </span>
          <button onClick={handleSuspend} disabled={busy} style={dangerOutlineBtn}>
            Suspend account
          </button>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div style={{ background: "var(--green-100, #EAF3E6)", borderRadius: 12, padding: "12px 14px" }}>
      <div style={{ fontSize: 10.5, color: "var(--text-muted, #66766A)" }}>{label}</div>
      <div style={{ fontSize: 17, fontWeight: 800, color: "var(--green-900, #163420)" }}>{value ?? "—"}</div>
    </div>
  );
}

const primaryBtn = {
  background: "var(--green-700, #2F6D3F)",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "10px 18px",
  fontSize: 12.5,
  fontWeight: 700,
  cursor: "pointer",
};

const dangerOutlineBtn = {
  background: "#fff",
  color: "#B2503E",
  border: "1.4px solid #F0C9C1",
  borderRadius: 8,
  padding: "10px 18px",
  fontSize: 12.5,
  fontWeight: 700,
  cursor: "pointer",
};
