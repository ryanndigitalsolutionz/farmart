import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";

export default function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/admin/farmers", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed (${res.status})`);
        return res.json();
      })
      .then((data) => setFarmers(Array.isArray(data) ? data : data.farmers || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader title="Farmers" subtitle="Verified and pending farmer accounts" />
      {loading && <p>Loading farmers…</p>}
      {error && <p style={{ color: "crimson" }}>Couldn't load farmers: {error}</p>}
      {!loading && !error && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {farmers.length === 0 && (
            <p style={{ color: "var(--text-muted, #66766A)" }}>No farmers found.</p>
          )}
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
              <span style={{ fontWeight: 600 }}>{f.name || f.farm_name || "Unnamed farm"}</span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: f.status === "verified" ? "var(--green-700, #2F6D3F)" : "var(--yellow-500, #E8B93D)",
                  textTransform: "capitalize",
                }}
              >
                {f.status || "pending"}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}