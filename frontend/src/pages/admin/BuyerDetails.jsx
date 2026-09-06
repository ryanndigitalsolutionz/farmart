import PageHeader from "../../components/layout/PageHeader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBuyerDetail } from "../../services/adminApi";

export default function BuyerDetails() {
  const { buyerId } = useParams();

  const [buyer, setBuyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadBuyer = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getBuyerDetail(buyerId);

        if (active) {
          setBuyer(data);
        }
      } catch (err) {
        if (active) {
          setError(
            err.message || "Failed to load buyer details."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadBuyer();

    return () => {
      active = false;
    };
  }, [buyerId]);

  if (loading) {
    return (
      <div style={{ maxWidth: 640 }}>
        <PageHeader
          title="Buyer details"
          subtitle="Loading buyer information"
        />

        <p
          style={{
            color: "var(--text-muted, #66766A)",
            fontSize: 13,
          }}
        >
          Loading buyer…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: 640 }}>
        <PageHeader
          title="Buyer details"
          subtitle="Unable to load this buyer"
        />

        <p
          style={{
            color: "#B2503E",
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          {error}
        </p>
      </div>
    );
  }

  if (!buyer) {
    return null;
  }

  const fullName =
    `${buyer.first_name || ""} ${buyer.last_name || ""}`.trim();

  const joinedDate = buyer.created_at
    ? new Date(buyer.created_at).toLocaleDateString()
    : "—";

  const updatedDate = buyer.updated_at
    ? new Date(buyer.updated_at).toLocaleDateString()
    : "—";

  return (
    <div style={{ maxWidth: 640 }}>
      <PageHeader
        title={fullName || buyer.email || "Buyer"}
        subtitle="Buyer account details"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 12,
          marginBottom: 22,
        }}
      >
        <Stat
          label="Account type"
          value="Buyer"
        />

        <Stat
          label="Account status"
          value="Active"
        />
      </div>

      <div
        style={{
          border: "1px solid var(--border, #DCE6D8)",
          borderRadius: 14,
          padding: 18,
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: 13,
            marginBottom: 14,
          }}
        >
          Buyer information
        </div>

        <div
          style={{
            display: "grid",
            gap: 11,
            fontSize: 12.5,
          }}
        >
          <InfoRow
            label="Full name"
            value={fullName}
          />

          <InfoRow
            label="Email"
            value={buyer.email}
          />

          <InfoRow
            label="Role"
            value={buyer.role}
          />

          <InfoRow
            label="Joined"
            value={joinedDate}
          />

          <InfoRow
            label="Last updated"
            value={updatedDate}
          />
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 20,
        paddingBottom: 9,
        borderBottom:
          "1px solid var(--border, #DCE6D8)",
      }}
    >
      <span
        style={{
          color: "var(--text-muted, #66766A)",
        }}
      >
        {label}
      </span>

      <span
        style={{
          fontWeight: 600,
          textAlign: "right",
          overflowWrap: "anywhere",
          textTransform: "capitalize",
        }}
      >
        {value || "—"}
      </span>
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
        {value}
      </div>
    </div>
  );
}
