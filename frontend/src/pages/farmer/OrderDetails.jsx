import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import { useOrders } from "../../context/OrderContext";
import { api } from "../../api";

const STATUS_BADGE = {
  pending: { bg: "#FBF0D2", color: "#8A6D1B" },
  confirmed: { bg: "#EAF3E6", color: "#2F6D3F" },
  processing: { bg: "#EAF3E6", color: "#2F6D3F" },
  shipped: { bg: "#EEF2EC", color: "#66766A" },
  delivered: { bg: "#EAF3E6", color: "#2F6D3F" },
  cancelled: { bg: "#FFF5F3", color: "#B2503E" },
};

export default function OrderDetails() {
  const { id } = useParams();
  const { updateStatus, cancel } = useOrders();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await api.getOrder(id);
        if (!cancelled) setOrder(data);
      } catch {
        if (!cancelled) setError("Order not found.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (id) load();
    return () => { cancelled = true; };
  }, [id]);

  const handleStatusUpdate = async (newStatus, note) => {
    try {
      await updateStatus(order.id, newStatus, note);
      setOrder((prev) => ({
        ...prev,
        status: newStatus,
        timeline: [
          ...prev.timeline,
          { status: newStatus, date: new Date().toISOString(), note: note || newStatus },
        ],
      }));
    } catch (err) {
      alert(err.message || "Failed to update order.");
    }
  };

  const handleCancel = async () => {
    if (!window.confirm("Cancel this order?")) return;
    try {
      await cancel(order.id);
      setOrder((prev) => ({
        ...prev,
        status: "cancelled",
        timeline: [
          ...prev.timeline,
          { status: "cancelled", date: new Date().toISOString(), note: "Order cancelled" },
        ],
      }));
    } catch (err) {
      alert(err.message || "Failed to cancel order.");
    }
  };

  if (loading) return <p style={{ color: "var(--text-muted, #66766A)" }}>Loading order…</p>;
  if (error || !order) return <p style={{ color: "#B2503E" }}>{error || "Order not found."}</p>;

  return (
    <div>
      <PageHeader
        title={`Order #${order.orderNumber}`}
        subtitle={`Placed on ${new Date(order.createdAt).toLocaleDateString()}`}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: 18,
        }}
      >
        {/* Buyer info */}
        <div
          style={{
            background: "var(--white, #fff)",
            border: "1px solid var(--border, #DCE6D8)",
            borderRadius: 14,
            padding: "18px 20px",
          }}
        >
          <h3
            style={{
              fontFamily: "'IBM Plex Serif', serif",
              fontSize: 16,
              margin: "0 0 12px",
              color: "var(--text-dark, #1E2A1F)",
            }}
          >
            Buyer Information
          </h3>
          <div style={{ display: "grid", gap: 8, fontSize: 13, fontFamily: "Modern Antiqua, serif" }}>
            <div>
              <span style={{ color: "var(--text-muted, #66766A)" }}>Name: </span>
              <span style={{ fontWeight: 700 }}>{order.buyerName}</span>
            </div>
            <div>
              <span style={{ color: "var(--text-muted, #66766A)" }}>Email: </span>
              <span>{order.buyerEmail}</span>
            </div>
            <div>
              <span style={{ color: "var(--text-muted, #66766A)" }}>Location: </span>
              <span>{order.buyerLocation}</span>
            </div>
            <div>
              <span style={{ color: "var(--text-muted, #66766A)" }}>Delivery Address: </span>
              <span>{order.deliveryAddress || "—"}</span>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div
          style={{
            background: "var(--white, #fff)",
            border: "1px solid var(--border, #DCE6D8)",
            borderRadius: 14,
            padding: "18px 20px",
          }}
        >
          <h3
            style={{
              fontFamily: "'IBM Plex Serif', serif",
              fontSize: 16,
              margin: "0 0 12px",
              color: "var(--text-dark, #1E2A1F)",
            }}
          >
            Order Summary
          </h3>
          <div style={{ display: "grid", gap: 8, fontSize: 13, fontFamily: "Modern Antiqua, serif" }}>
            <div>
              <span style={{ color: "var(--text-muted, #66766A)" }}>Status: </span>
              <span
                style={{
                  display: "inline-block",
                  padding: "3px 10px",
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "capitalize",
                  background: STATUS_BADGE[order.status]?.bg || "#EEF2EC",
                  color: STATUS_BADGE[order.status]?.color || "#66766A",
                }}
              >
                {order.status}
              </span>
            </div>
            <div>
              <span style={{ color: "var(--text-muted, #66766A)" }}>Payment: </span>
              <span style={{ textTransform: "capitalize" }}>{order.paymentMethod}</span>
            </div>
            <div>
              <span style={{ color: "var(--text-muted, #66766A)" }}>Payment Status: </span>
              <span style={{ textTransform: "capitalize" }}>{order.paymentStatus}</span>
            </div>
            <div>
              <span style={{ color: "var(--text-muted, #66766A)" }}>Subtotal: </span>
              <span>KES {(order.subtotal || 0).toLocaleString()}</span>
            </div>
            <div>
              <span style={{ color: "var(--text-muted, #66766A)" }}>Delivery Fee: </span>
              <span>KES {(order.deliveryFee || 0).toLocaleString()}</span>
            </div>
            <div>
              <span style={{ color: "var(--text-muted, #66766A)" }}>Total: </span>
              <span style={{ fontWeight: 800, fontSize: 15 }}>KES {(order.total || 0).toLocaleString()}</span>
            </div>
            {order.notes && (
              <div>
                <span style={{ color: "var(--text-muted, #66766A)" }}>Notes: </span>
                <span>{order.notes}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Items */}
      <div
        style={{
          marginTop: 18,
          background: "var(--white, #fff)",
          border: "1px solid var(--border, #DCE6D8)",
          borderRadius: 14,
          padding: "18px 20px",
        }}
      >
        <h3
          style={{
            fontFamily: "'IBM Plex Serif', serif",
            fontSize: 16,
            margin: "0 0 12px",
            color: "var(--text-dark, #1E2A1F)",
          }}
        >
          Items
        </h3>
        {order.items?.length === 0 ? (
          <p style={{ color: "var(--text-muted, #66766A)", fontSize: 13 }}>No items.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {order.items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: idx < order.items.length - 1 ? "1px solid var(--border, #DCE6D8)" : "none",
                  fontSize: 13,
                  fontFamily: "Modern Antiqua, serif",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, color: "var(--text-dark, #1E2A1F)" }}>{item.title}</div>
                  <div style={{ color: "var(--text-muted, #66766A)", fontSize: 12 }}>Qty: {item.quantity}</div>
                </div>
                <div style={{ fontWeight: 700 }}>KES {(item.price * item.quantity).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Timeline */}
      <div
        style={{
          marginTop: 18,
          background: "var(--white, #fff)",
          border: "1px solid var(--border, #DCE6D8)",
          borderRadius: 14,
          padding: "18px 20px",
        }}
      >
        <h3
          style={{
            fontFamily: "'IBM Plex Serif', serif",
            fontSize: 16,
            margin: "0 0 12px",
            color: "var(--text-dark, #1E2A1F)",
          }}
        >
          Timeline
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {order.timeline?.map((step, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: STATUS_BADGE[step.status]?.color || "#ccc",
                  marginTop: 5,
                  flexShrink: 0,
                }}
              />
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 13,
                    color: "var(--text-dark, #1E2A1F)",
                    textTransform: "capitalize",
                    fontFamily: "Modern Antiqua, serif",
                  }}
                >
                  {step.status}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted, #66766A)", fontFamily: "Modern Antiqua, serif" }}>
                  {step.note} · {new Date(step.date).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      {order.status !== "cancelled" && order.status !== "delivered" && (
        <div
          style={{
            marginTop: 18,
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          {order.status === "pending" && (
            <>
              <button
                onClick={() => handleStatusUpdate("confirmed", "Seller confirmed order")}
                style={{
                  background: "#277a44",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px 16px",
                  minHeight: 44,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "Modern Antiqua, serif",
                }}
              >
                Accept Order
              </button>
              <button
                onClick={handleCancel}
                style={{
                  background: "transparent",
                  color: "#B2503E",
                  border: "1px solid #F0C9C1",
                  borderRadius: 10,
                  padding: "12px 16px",
                  minHeight: 44,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "Modern Antiqua, serif",
                }}
              >
                Cancel Order
              </button>
            </>
          )}
          {order.status === "confirmed" && (
            <button
              onClick={() => handleStatusUpdate("processing", "Processing order")}
              style={{
                background: "#277a44",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "12px 16px",
                minHeight: 44,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "Modern Antiqua, serif",
              }}
            >
              Mark Processing
            </button>
          )}
          {order.status === "processing" && (
            <button
              onClick={() => handleStatusUpdate("shipped", "Shipped order")}
              style={{
                background: "#277a44",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "12px 16px",
                minHeight: 44,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "Modern Antiqua, serif",
              }}
            >
              Mark Shipped
            </button>
          )}
          {order.status === "shipped" && (
            <button
              onClick={() => handleStatusUpdate("delivered", "Delivered successfully")}
              style={{
                background: "#277a44",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "12px 16px",
                minHeight: 44,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "Modern Antiqua, serif",
              }}
            >
              Mark Delivered
            </button>
          )}
        </div>
      )}
    </div>
  );
}
