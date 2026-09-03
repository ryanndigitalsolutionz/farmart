import PageHeader from "../../components/layout/PageHeader";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAllFarmers } from "../../data/farmersStore";

const STATUS_COLORS = {
  verified: "var(--green-700, #2F6D3F)",
  pending: "var(--yellow-500, #E8B93D)",
  rejected: "#B2503E",
};

export default function Farmers() {
  const [farmers] = useState(() => getAllFarmers());

  return (
    <div>
      <PageHeader title="Farmers" subtitle="Verified and pending farmer accounts" />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {farmers.map((f) => (
          <Link
            key={f.id}
            to={`/admin/farmers/${f.id}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 14px",
              border: "1px solid var(--border, #DCE6D8)",
              borderRadius: 10,
              textDecoration: "none",
              color: "var(--text-dark, #1E2A1F)",
            }}
          >
            <span style={{ fontWeight: 600 }}>{f.farm_name}</span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: STATUS_COLORS[f.status] || "var(--text-muted, #66766A)",
                textTransform: "capitalize",
              }}
            >
              {f.status}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
// commit 30