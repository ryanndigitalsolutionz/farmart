import { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import { api } from "../../api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const all = await api.getOrders();
        if (!cancelled) setOrders(Array.isArray(all) ? all : []);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const filtered = orders.filter((o) => {
    const matchesSearch = !search ||
      (o.orderNumber || "").toLowerCase().includes(search.toLowerCase()) ||
      (o.buyerName || "").toLowerCase().includes(search.toLowerCase()) ||
      (o.farmerName || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <PageHeader title="Orders" subtitle="All buyer orders across the platform" />
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search orders…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: "1 1 200px",
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid var(--border, #DCE6D8)",
            background: "var(--white, #fff)",
            color: "var(--text-dark, #1E2A1F)",
            fontSize: 13.5,
          }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid var(--border, #DCE6D8)",
            background: "var(--white, #fff)",
            color: "var(--text-dark, #1E2A1F)",
            fontSize: 13.5,
          }}
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      {loading && <p style={{ color: "var(--text-muted, #66766A)" }}>Loading orders…</p>}
      {error && <p style={{ color: "crimson" }}>Couldn't load orders: {error}</p>}
      {!loading && !error && (
        <div style={{ overflowX: "auto" }}>
          {/* Desktop table */}
          <div className="hide-mobile" style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1.2fr 1.2fr 1fr 1fr 1fr", gap: 0, borderBottom: "1px solid var(--border, #DCE6D8)", padding: "8px 6px", fontWeight: 600, color: "var(--text-dark, #1E2A1F)" }}>
              <div>Order #</div><div>Buyer</div><div>Farmer</div><div>Total</div><div>Status</div><div>Date</div>
            </div>
            {filtered.map((o) => (
              <div key={o.id} style={{ display: "grid", gridTemplateColumns: "1.5fr 1.2fr 1.2fr 1fr 1fr 1fr", gap: 0, borderBottom: "1px solid #EEF2EC", padding: "8px 6px", alignItems: "center", fontSize: 13.5 }}>
                <div style={{ fontWeight: 600 }}>#{o.orderNumber || o.id}</div>
                <div>{o.buyerName || "—"}</div>
                <div>{o.farmerName || "—"}</div>
                <div>KES {Number(o.total || 0).toLocaleString()}</div>
                <div style={{ textTransform: "capitalize" }}>{o.status}</div>
                <div>{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "—"}</div>
              </div>
            ))}
          </div>
          {/* Mobile cards */}
          <div className="show-mobile-only" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.length === 0 && (
              <p style={{ color: "var(--text-muted, #66766A)", padding: "14px 6px" }}>No orders found.</p>
            )}
            {filtered.map((o) => (
              <div key={o.id} style={{ background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 10, padding: 14, display: "flex", flexDirection: "column", gap: 4, fontSize: 13.5 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, color: "var(--text-dark, #1E2A1F)" }}>#{o.orderNumber || o.id}</span>
                  <span style={{ textTransform: "capitalize", background: "var(--green-100, #EAF3E6)", padding: "2px 8px", borderRadius: 8, fontSize: 12, fontWeight: 600 }}>{o.status}</span>
                </div>
                <div style={{ color: "var(--text-muted, #66766A)" }}>Buyer: {o.buyerName || "—"}</div>
                <div style={{ color: "var(--text-muted, #66766A)" }}>Farmer: {o.farmerName || "—"}</div>
                <div style={{ color: "var(--text-muted, #66766A)" }}>Total: KES {Number(o.total || 0).toLocaleString()}</div>
                <div style={{ color: "var(--text-muted, #66766A)" }}>{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "—"}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}