import PageHeader from "../../components/layout/PageHeader";
import { useEffect, useState } from "react";
import { getOrders } from "../../services/adminApi";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader title="Orders" subtitle="All buyer orders across the platform" />
      {loading && <p>Loading orders...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
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
            {orders.map((o) => (
              <tr key={o.id} style={{ borderBottom: "1px solid #EEF2EC" }}>
                <td style={{ padding: "8px 6px" }}>#{o.id}</td>
                <td style={{ padding: "8px 6px" }}>{o.buyer_name}</td>
                <td style={{ padding: "8px 6px" }}>KES {Number(o.total_amount).toLocaleString()}</td>
                <td style={{ padding: "8px 6px", textTransform: "capitalize" }}>{o.status}</td>
                <td style={{ padding: "8px 6px" }}>{new Date(o.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}