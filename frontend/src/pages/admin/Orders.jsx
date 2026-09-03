import PageHeader from "../../components/layout/PageHeader";
import { useState } from "react";


const MOCK_ORDERS = [
  { id: 1042, buyer_name: "Amina Wanjiru", total: 4500, status: "delivered", created_at: "2026-08-20" },
  { id: 1043, buyer_name: "Grace Otieno", total: 12000, status: "pending", created_at: "2026-08-21" },
  { id: 1044, buyer_name: "Samuel Kiptoo", total: 3200, status: "shipped", created_at: "2026-08-22" },
  { id: 1045, buyer_name: "Lucy Chebet", total: 8750, status: "delivered", created_at: "2026-08-23" },
];

export default function Orders() {
  const [orders] = useState(MOCK_ORDERS);

  return (
    <div>
      <PageHeader title="Orders" subtitle="All buyer orders across the platform" />
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
              <td style={{ padding: "8px 6px" }}>KES {o.total.toLocaleString()}</td>
              <td style={{ padding: "8px 6px", textTransform: "capitalize" }}>{o.status}</td>
              <td style={{ padding: "8px 6px" }}>{new Date(o.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}// commit 32
