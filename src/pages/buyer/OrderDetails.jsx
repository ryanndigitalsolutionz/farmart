import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { api } from "../../api";
import { useOrders } from "../../context/OrderContext";

export default function OrderDetails() {
  const { id } = useParams();
  const { cancel } = useOrders();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await api.getOrder(id);
      setOrder(data);
      setLoading(false);
    })();
  }, [id]);

  const handleCancel = async () => {
    if (!order) return;
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    setCancelling(true);
    try {
      const updated = await cancel(order.id);
      setOrder(updated);
    } catch (e) {
      alert(e.message || "Could not cancel order.");
    } finally {
      setCancelling(false);
    }
  };

  const fmt = (n) => "KES " + Number(n).toLocaleString();
  const d = (s) => new Date(s).toLocaleString();

  const statusBadge = (s) => {
    const map = {
      pending: { bg: "#FEF3C7", color: "#92400E" },
      confirmed: { bg: "#DBEAFE", color: "#1E40AF" },
      processing: { bg: "#E0E7FF", color: "#3730A3" },
      shipped: { bg: "#FCE7F3", color: "#9D174D" },
      delivered: { bg: "#D1FAE5", color: "#065F46" },
      cancelled: { bg: "#FEE2E2", color: "#991B1B" },
    };
    const c = map[s] || { bg: "#F3F4F6", color: "#374151" };
    return { background: c.bg, color: c.color, padding: "4px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600, textTransform: "capitalize" };
  };

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "var(--text-muted, #66766A)" }}>Loading order...</div>;
  if (!order) return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 40, textAlign: "center" }}>
      <h2 style={{ fontFamily: "'IBM Plex Serif', serif", color: "var(--text-dark, #1E2A1F)" }}>Order not found</h2>
      <Link to="/buyer/orders" style={{ color: "var(--green-700, #2F6D3F)", fontWeight: 600 }}>Back to orders</Link>
    </div>
  );

  const canCancel = ["pending", "confirmed"].includes(order.status);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px" }}>
      <button onClick={() => navigate(-1)} style={{ background: "none", border: "none", color: "var(--green-700, #2F6D3F)", fontWeight: 600, cursor: "pointer", marginBottom: 16, padding: 0 }}>← Back</button>

      <div style={{ background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 12, padding: 20, boxShadow: "0 6px 20px rgba(29,78,42,0.05)", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div>
            <h1 style={{ fontFamily: "'IBM Plex Serif', serif", fontSize: 22, color: "var(--text-dark, #1E2A1F)", margin: "0 0 6px" }}>{order.orderNumber}</h1>
            <div style={{ color: "var(--text-muted, #66766A)", fontSize: 14 }}>Placed on {d(order.createdAt)}</div>
          </div>
          <span style={statusBadge(order.status)}>{order.status.replace("_", " ")}</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(260px, 1fr)", gap: 20, alignItems: "start" }}>
        <div style={{ background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 12, padding: 20, boxShadow: "0 6px 20px rgba(29,78,42,0.05)" }}>
          <h3 style={{ fontFamily: "'IBM Plex Serif', serif", margin: "0 0 12px", color: "var(--text-dark, #1E2A1F)" }}>Items</h3>
          {order.items.map((item, idx) => (
            <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: idx < order.items.length - 1 ? "1px solid var(--border, #DCE6D8)" : "none", fontSize: 14 }}>
              <div>
                <div style={{ fontWeight: 600, color: "var(--text-dark, #1E2A1F)" }}>{item.title}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted, #66766A)" }}>Qty: {item.quantity} × {fmt(item.price)}</div>
              </div>
              <div style={{ fontWeight: 700, color: "var(--green-700, #2F6D3F)" }}>{fmt(item.price * item.quantity)}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 12, padding: 18, boxShadow: "0 6px 20px rgba(29,78,42,0.05)" }}>
            <h3 style={{ fontFamily: "'IBM Plex Serif', serif", margin: "0 0 10px", color: "var(--text-dark, #1E2A1F)", fontSize: 16 }}>Delivery & Payment</h3>
            <div style={{ fontSize: 14, color: "var(--text-muted, #66766A)", lineHeight: 1.8 }}>
              <div><strong style={{ color: "var(--text-dark, #1E2A1F)" }}>Address:</strong> {order.deliveryAddress}</div>
              <div><strong style={{ color: "var(--text-dark, #1E2A1F)" }}>Payment:</strong> {order.paymentMethod.toUpperCase()}</div>
              <div><strong style={{ color: "var(--text-dark, #1E2A1F)" }}>Status:</strong> {order.paymentStatus}</div>
            </div>
          </div>

          <div style={{ background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 12, padding: 18, boxShadow: "0 6px 20px rgba(29,78,42,0.05)" }}>
            <h3 style={{ fontFamily: "'IBM Plex Serif', serif", margin: "0 0 10px", color: "var(--text-dark, #1E2A1F)", fontSize: 16 }}>Totals</h3>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 14, color: "var(--text-muted, #66766A)" }}><span>Subtotal</span><span>{fmt(order.subtotal)}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 14, color: "var(--text-muted, #66766A)" }}><span>Delivery</span><span>{fmt(order.deliveryFee)}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 16, color: "var(--text-dark, #1E2A1F)", borderTop: "1px solid var(--border, #DCE6D8)", paddingTop: 10 }}><span>Total</span><span>{fmt(order.total)}</span></div>
          </div>

          {canCancel && (
            <button onClick={handleCancel} disabled={cancelling} style={{ width: "100%", padding: "12px 16px", background: "#DC2626", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", opacity: cancelling ? 0.7 : 1 }}>
              {cancelling ? "Cancelling..." : "Cancel Order"}
            </button>
          )}
        </div>
      </div>

      <div style={{ marginTop: 20, background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 12, padding: 20, boxShadow: "0 6px 20px rgba(29,78,42,0.05)" }}>
        <h3 style={{ fontFamily: "'IBM Plex Serif', serif", margin: "0 0 14px", color: "var(--text-dark, #1E2A1F)" }}>Order Timeline</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative", paddingLeft: 20 }}>
          {order.timeline?.map((t, i) => (
            <div key={i} style={{ position: "relative", paddingBottom: 18 }}>
              <div style={{ position: "absolute", left: -17, top: 4, width: 10, height: 10, borderRadius: "50%", background: i === order.timeline.length - 1 ? "var(--green-700, #2F6D3F)" : "var(--border, #DCE6D8)" }} />
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-dark, #1E2A1F)", textTransform: "capitalize" }}>{t.note || t.status}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted, #66766A)" }}>{d(t.date)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
