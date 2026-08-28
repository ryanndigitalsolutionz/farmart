import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";

// TODO: replace with real fetch("/api/admin/farmers") once backend is ready
const MOCK_FARMERS = [
  { id: 1, name: "Kiambu Green Pastures", status: "pending" },
  { id: 2, name: "Nakuru Boran Ranch", status: "pending" },
  { id: 3, name: "Eldoret Dairy Farm", status: "verified" },
  { id: 4, name: "Machakos Poultry Co-op", status: "verified" },
];

export default function Farmers() {
  const [farmers] = useState(MOCK_FARMERS);

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
            <span style={{ fontWeight: 600 }}>{f.name}</span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: f.status === "verified" ? "var(--green-700, #2F6D3F)" : "var(--yellow-500, #E8B93D)",
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