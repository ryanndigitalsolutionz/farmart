import PageHeader from "../../components/layout/PageHeader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BuyerDetails() {
  const { buyerId } = useParams();
  const { refreshOverview } = useAdmin();
  const [buyer, setBuyer] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getBuyerDetail(buyerId).then(setBuyer).catch(console.error);
  }, [buyerId]);

  const toggleSuspension = async () => {
    setBusy(true);
    try {
      if (buyer.is_active) {
        await suspendUser(buyer.user_id);
      } else {
        await reactivateUser(buyer.user_id);
      }
      setBuyer((b) => ({ ...b, is_active: !b.is_active }));
      refreshOverview();
    } finally {
      setBusy(false);
    }
  };

  if (!buyer) return <p style={{ color: "var(--text-muted, #66766A)" }}>Loading buyer…</p>;

  return (
    <div style={{ maxWidth: 640 }}>
      <PageHeader
        title={buyer.full_name || buyer.email}
        subtitle={`${buyer.delivery_location || "No default location"} · joined ${buyer.joined_date || "—"}`}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 22 }}>
        <Stat label="Orders placed" value={buyer.order_count} />
        <Stat label="Total spent" value={buyer.total_spent ? `KES ${buyer.total_spent}` : "—"} />
        <Stat label="Account status" value={buyer.is_active ? "Active" : "Suspended"} />
      </div>

      <div style={{ border: "1px solid var(--border, #DCE6D8)", borderRadius: 14, padding: 18, marginBottom: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Recent orders</div>
        {(!buyer.recent_orders || buyer.recent_orders.length === 0) && (
          <p style={{ fontSize: 12.5, color: "var(--text-muted, #66766A)" }}>No orders yet.</p>
        )}
        {buyer.recent_orders?.map((order) => (
          <div
            key={order.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12.5,
              padding: "8px 0",
              borderBottom: "1px solid var(--border, #DCE6D8)",
            }}
          >
            <span>Order #{order.id}</span>
            <span style={{ color: "var(--text-muted, #66766A)" }}>{order.status}</span>
            <span style={{ fontWeight: 700 }}>KES {order.total_amount}</span>
          </div>
        ))}
      </div>

      <button
        onClick={toggleSuspension}
        disabled={busy}
        style={{
          background: buyer.is_active ? "#fff" : "var(--green-700, #2F6D3F)",
          color: buyer.is_active ? "#B2503E" : "#fff",
          border: buyer.is_active ? "1.4px solid #F0C9C1" : "none",
          borderRadius: 8,
          padding: "10px 18px",
          fontSize: 12.5,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {busy ? "Working…" : buyer.is_active ? "Suspend account" : "Reactivate account"}
      </button>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div style={{ background: "var(--green-100, #EAF3E6)", borderRadius: 12, padding: "12px 14px" }}>
      <div style={{ fontSize: 10.5, color: "var(--text-muted, #66766A)" }}>{label}</div>
      <div style={{ fontSize: 17, fontWeight: 800, color: "var(--green-900, #163420)" }}>{value ?? "—"}</div>
    </div>
  );
}
// commit 26
