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
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid var(--border, #DCE6D8)" }}>
                <th style={{ padding: "8px 6px" }}>Order #</th>
                <th style={{ padding: "8px 6px" }}>Buyer</th>
                <th style={{ padding: "8px 6px" }}>Farmer</th>
                <th style={{ padding: "8px 6px" }}>Total</th>
                <th style={{ padding: "8px 6px" }}>Status</th>
                <th style={{ padding: "8px 6px" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: "14px 6px", color: "var(--text-muted, #66766A)" }}>
                    No orders found.
                  </td>
                </tr>
              )}
              {filtered.map((o) => (
                <tr key={o.id} style={{ borderBottom: "1px solid #EEF2EC" }}>
                  <td style={{ padding: "8px 6px", fontWeight: 600 }}>#{o.orderNumber || o.id}</td>
                  <td style={{ padding: "8px 6px" }}>{o.buyerName || "—"}</td>
                  <td style={{ padding: "8px 6px" }}>{o.farmerName || "—"}</td>
                  <td style={{ padding: "8px 6px" }}>KES {Number(o.total || 0).toLocaleString()}</td>
                  <td style={{ padding: "8px 6px", textTransform: "capitalize" }}>{o.status}</td>
                  <td style={{ padding: "8px 6px" }}>
                    {o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}