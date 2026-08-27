import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api";

const STATUS_BADGE = {
  pending: { bg: "#FBF0D2", color: "#8A6D1B" },
  confirmed: { bg: "#EAF3E6", color: "#2F6D3F" },
  processing: { bg: "#EAF3E6", color: "#2F6D3F" },
  shipped: { bg: "#EEF2EC", color: "#66766A" },
  delivered: { bg: "#EAF3E6", color: "#2F6D3F" },
  cancelled: { bg: "#FFF5F3", color: "#B2503E" },
};

export default function Orders() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [farmerOrders, setFarmerOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const data = await api.getOrders({ farmerId: user?.id });
        if (!cancelled) setFarmerOrders(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (user?.id) load();
    return () => { cancelled = true; };
  }, [user?.id]);

  const filtered = filter === "all" ? farmerOrders : farmerOrders.filter((o) => o.status === filter);

  return (
    <div>
      <PageHeader title="Orders" subtitle="Manage your incoming and outgoing orders" />

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 18,
          flexWrap: "wrap",
        }}
      >
        {["all", "pending", "processing", "shipped", "delivered", "cancelled"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              border: "1px solid var(--border, #DCE6D8)",
              background: filter === s ? "#277a44" : "var(--white, #fff)",
              color: filter === s ? "#fff" : "var(--text-dark, #1E2A1F)",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              textTransform: "capitalize",
              fontFamily: "Modern Antiqua, serif",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: "var(--text-muted, #66766A)", fontSize: 13 }}>Loading orders…</p>
      ) : filtered.length === 0 ? (
        <p
          style={{
            color: "var(--text-muted, #66766A)",
            fontSize: 13,
            fontFamily: "Modern Antiqua, serif",
          }}
        >
          No orders found for this filter.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((order) => (
            <div
              key={order.id}
              onClick={() => navigate(`/farmer/orders/${order.id}`)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid var(--border, #DCE6D8)",
                borderRadius: 14,
                padding: "14px 18px",
                cursor: "pointer",
                background: "var(--white, #fff)",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 13.5,
                    color: "var(--text-dark, #1E2A1F)",
                    fontFamily: "Modern Antiqua, serif",
                  }}
                >
                  #{order.orderNumber}
                </div>
                <div
                  style={{
                    color: "var(--text-muted, #66766A)",
                    fontSize: 12,
                    marginTop: 3,
                    fontFamily: "Modern Antiqua, serif",
                  }}
                >
                  Buyer: {order.buyerName} · {order.items?.length || 0} item(s)
                </div>
                <div
                  style={{
                    color: "var(--text-muted, #66766A)",
                    fontSize: 12,
                    fontFamily: "Modern Antiqua, serif",
                  }}
                >
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: "var(--text-dark, #1E2A1F)",
                    fontFamily: "'IBM Plex Serif', serif",
                  }}
                >
                  KES {(order.total || 0).toLocaleString()}
                </div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 10px",
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
