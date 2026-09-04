import PageHeader from "../../components/layout/PageHeader";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAdmin } from "../../hooks/useAdmin";
import { Star, CheckCircle } from "lucide-react";
import {
  getFarmerDetail,
  verifyFarmer,
  rejectFarmer,
  suspendUser,
} from "../../services/adminApi";
import RejectReasonModal from "../../components/common/RejectReasonModal";

export default function FarmerDetails() {
  const { farmerId } = useParams();
  const navigate = useNavigate();
  const { refreshOverview } = useAdmin();

  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);

  useEffect(() => {
    let active = true;

    const loadFarmer = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getFarmerDetail(farmerId);

        if (active) {
          setFarmer(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Failed to load farmer details.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadFarmer();

    return () => {
      active = false;
    };
  }, [farmerId]);

  const handleVerify = async () => {
    if (busy) return;

    setBusy(true);
    setError("");

    try {
      const data = await verifyFarmer(farmerId);
      setFarmer(data.farmer || data);
      refreshOverview();
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Failed to approve farmer.");
    } finally {
      setBusy(false);
    }
  };

  const handleRejectSubmit = async (reason) => {
    if (busy) return;

    setBusy(true);
    setError("");

    try {
      const data = await rejectFarmer(farmerId, reason);
      setFarmer(data.farmer || data);
      setShowRejectModal(false);
      refreshOverview();
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Failed to reject farmer.");
    } finally {
      setBusy(false);
    }
  };

  const handleSuspend = async () => {
    if (busy) return;

    const confirmed = window.confirm(
      `Suspend ${farmer.farm_name || "this farmer"}'s account?`
    );

    if (!confirmed) return;

    setBusy(true);
    setError("");

    try {
      await suspendUser(farmer.user_id);
      refreshOverview();
    } catch (err) {
      setError(err.message || "Failed to suspend farmer.");
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div style={{ color: "var(--text-muted, #66766A)", fontSize: 13 }}>
        Loading farmer…
      </div>
    );
  }

  if (error && !farmer) {
    return (
      <div>
        <PageHeader
          title="Farmer details"
          subtitle="Unable to load this farmer"
        />
        <p style={{ color: "#B2503E", fontSize: 13 }}>{error}</p>
        <button
          onClick={() => navigate("/admin/dashboard")}
          style={secondaryBtn}
        >
          Back to dashboard
        </button>
      </div>
    );
  }

  if (!farmer) {
    return (
      <div>
        <PageHeader
          title="Farmer not found"
          subtitle="The requested farmer could not be found."
        />
        <button
          onClick={() => navigate("/admin/dashboard")}
          style={secondaryBtn}
        >
          Back to dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <PageHeader
        title={farmer.farm_name || "(No farm name yet)"}
        subtitle={`${farmer.location || "—"} · joined ${
          farmer.joined_date
            ? new Date(farmer.joined_date).toLocaleDateString()
            : "—"
        }`}
      />

      {error && (
        <div
          style={{
            marginBottom: 16,
            padding: "10px 12px",
            borderRadius: 8,
            background: "#FFF5F2",
            border: "1px solid #F0C9C1",
            color: "#B2503E",
            fontSize: 12.5,
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "6px 10px",
          borderRadius: 999,
          marginBottom: 18,
          background:
            farmer.status === "verified"
              ? "var(--green-100, #EAF3E6)"
              : farmer.status === "rejected"
                ? "#FFF5F2"
                : "#FFF8E8",
          color:
            farmer.status === "verified"
              ? "var(--green-700, #2F6D3F)"
              : farmer.status === "rejected"
                ? "#B2503E"
                : "#946B00",
          fontSize: 11.5,
          fontWeight: 700,
          textTransform: "capitalize",
        }}
      >
        {farmer.status || "pending"}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
          marginBottom: 22,
        }}
      >
        <Stat label="Listings" value={farmer.listing_count} />
        <Stat label="Animals sold" value={farmer.animals_sold} />
        <Stat
          label="Rating"
           value={farmer.rating ? (
             <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
               <Star size={14} />
               {farmer.rating}
             </span>
           ) : "—"}
        />
      </div>

      <div
        style={{
          border: "1px solid var(--border, #DCE6D8)",
          borderRadius: 14,
          padding: 18,
          marginBottom: 20,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>
          Farmer
        </div>

        <div
          style={{
            fontSize: 12.5,
            color: "var(--text-muted, #66766A)",
            lineHeight: 1.8,
          }}
        >
          <div>
            Name: {farmer.name || `${farmer.first_name || ""} ${farmer.last_name || ""}`.trim() || "—"}
          </div>
          <div>Phone: {farmer.phone_number || "—"}</div>
          <div>Email: {farmer.email || "—"}</div>
          <div>Location: {farmer.location || "—"}</div>
        </div>

        {farmer.description && (
          <>
            <div
              style={{
                fontWeight: 700,
                fontSize: 13,
                margin: "16px 0 6px",
              }}
            >
              About the farm
            </div>

            <p
              style={{
                fontSize: 12.5,
                color: "var(--text-muted, #66766A)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {farmer.description}
            </p>
          </>
        )}

        {farmer.status === "rejected" && farmer.rejection_reason && (
          <>
            <div
              style={{
                fontWeight: 700,
                fontSize: 13,
                margin: "16px 0 6px",
                color: "#B2503E",
              }}
            >
              Rejection reason
            </div>

            <p
              style={{
                fontSize: 12.5,
                color: "var(--text-muted, #66766A)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {farmer.rejection_reason}
            </p>
          </>
        )}
      </div>

      {farmer.status === "pending" && (
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={handleVerify}
            disabled={busy}
            style={{
              ...primaryBtn,
              opacity: busy ? 0.6 : 1,
              cursor: busy ? "not-allowed" : "pointer",
            }}
          >
            {busy ? "Working…" : "Approve verification"}
          </button>

          <button
            onClick={() => setShowRejectModal(true)}
            disabled={busy}
            style={{
              ...dangerOutlineBtn,
              opacity: busy ? 0.6 : 1,
              cursor: busy ? "not-allowed" : "pointer",
            }}
          >
            Reject
          </button>
        </div>
      )}

      {farmer.status === "verified" && (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                fontSize: 12.5,
                color: "var(--green-700, #2F6D3F)",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <CheckCircle size={14} />
              Verified farmer
            </span>

          <button
            onClick={handleSuspend}
            disabled={busy}
            style={{
              ...dangerOutlineBtn,
              opacity: busy ? 0.6 : 1,
              cursor: busy ? "not-allowed" : "pointer",
            }}
          >
            {busy ? "Working…" : "Suspend account"}
          </button>
        </div>
      )}

      {farmer.status === "rejected" && (
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={handleVerify}
            disabled={busy}
            style={{
              ...primaryBtn,
              opacity: busy ? 0.6 : 1,
              cursor: busy ? "not-allowed" : "pointer",
            }}
          >
            {busy ? "Working…" : "Approve verification"}
          </button>
        </div>
      )}

      {showRejectModal && (
        <RejectReasonModal
          farmerName={farmer.farm_name || farmer.name}
          onCancel={() => setShowRejectModal(false)}
          onSubmit={handleRejectSubmit}
        />
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div
      style={{
        background: "var(--green-100, #EAF3E6)",
        borderRadius: 12,
        padding: "12px 14px",
      }}
    >
      <div
        style={{
          fontSize: 10.5,
          color: "var(--text-muted, #66766A)",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: 17,
          fontWeight: 800,
          color: "var(--green-900, #163420)",
        }}
      >
        {value ?? "—"}
      </div>
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
};

const secondaryBtn = {
  background: "#fff",
  color: "var(--green-700, #2F6D3F)",
  border: "1.4px solid var(--border, #DCE6D8)",
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
};
