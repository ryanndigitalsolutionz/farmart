import { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/admin/orders", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed (${res.status})`);
        return res.json();
      })
      .then((data) => setOrders(Array.isArray(data) ? data : data.orders || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader title="Orders" subtitle="All buyer orders across the platform" />
      {loading && <p>Loading orders…</p>}
      {error && <p style={{ color: "crimson" }}>Couldn't load orders: {error}</p>}
      {!loading && !error && (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid var(--border, #DCE6D8)" }}>
              <th style={{ padding: "8px 6px" }}>Order #</th>
              <th style={{ padding: "8px 6px" }}>Buyer</th>
              <th style={{ padding: "8px 6px" }}>Total</th>
              <th style={{ padding: "8px 6px" }}>Status</th>
              <th style={{ padding: "8px 6px" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: "14px 6px", color: "var(--text-muted, #66766A)" }}>
                  No orders found.
                </td>
              </tr>
            )}
            {orders.map((o) => (
              <tr key={o.id} style={{ borderBottom: "1px solid #EEF2EC" }}>
                <td style={{ padding: "8px 6px" }}>#{o.id}</td>
                <td style={{ padding: "8px 6px" }}>{o.buyer_name || o.buyer?.name || "—"}</td>
                <td style={{ padding: "8px 6px" }}>KES {o.total?.toLocaleString?.() ?? o.total}</td>
                <td style={{ padding: "8px 6px", textTransform: "capitalize" }}>{o.status}</td>
                <td style={{ padding: "8px 6px" }}>
                  {o.created_at ? new Date(o.created_at).toLocaleDateString() : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}