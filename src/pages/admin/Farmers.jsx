import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import { api } from "../../api";

export default function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const all = await api.getUsers();
        const farmerList = all.filter((u) => u.role === "farmer");
        if (!cancelled) setFarmers(farmerList);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    if (!search) return farmers;
    const s = search.toLowerCase();
    return farmers.filter((f) =>
      (f.name || "").toLowerCase().includes(s) ||
      (f.farmName || "").toLowerCase().includes(s) ||
      (f.email || "").toLowerCase().includes(s) ||
      (f.location || "").toLowerCase().includes(s)
    );
  }, [farmers, search]);

  return (
    <div>
      <PageHeader title="Farmers" subtitle="Verified and pending farmer accounts" />
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search farmers…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            maxWidth: 360,
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid var(--border, #DCE6D8)",
            background: "var(--white, #fff)",
            color: "var(--text-dark, #1E2A1F)",
            fontSize: 13.5,
          }}
        />
      </div>
      {loading && <p style={{ color: "var(--text-muted, #66766A)" }}>Loading farmers…</p>}
      {error && <p style={{ color: "crimson" }}>Couldn't load farmers: {error}</p>}
      {!loading && !error && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.length === 0 && (
            <p style={{ color: "var(--text-muted, #66766A)" }}>No farmers found.</p>
          )}
          {filtered.map((f) => (
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
                background: "var(--white, #fff)",
                transition: "box-shadow 0.15s ease, transform 0.15s ease",
              }}
            >
              <div>
                <span style={{ fontWeight: 600 }}>{f.name || f.farmName || "Unnamed farm"}</span>
                <span style={{ display: "block", fontSize: 11.5, color: "var(--text-muted, #66766A)", marginTop: 2 }}>
                  {f.email} · {f.location || "—"}
                </span>
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: f.isVerified ? "var(--green-700, #2F6D3F)" : "var(--yellow-500, #E8B93D)",
                  textTransform: "capitalize",
                  alignSelf: "center",
                }}
              >
                {f.isVerified ? "verified" : "pending"}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}