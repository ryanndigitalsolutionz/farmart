import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useOrders } from "../../context/OrderContext";
import { Package } from "lucide-react";

export default function Orders() {
  const { user } = useAuth();
  const { getOrders } = useOrders();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const data = await getOrders({ buyerId: user.id });
      setOrders(data);
      setLoading(false);
    })();
  }, [user, getOrders]);

  const filtered = filter ? orders.filter((o) => o.status === filter) : orders;

  const fmt = (n) => "KES " + Number(n).toLocaleString();
  const d = (s) => new Date(s).toLocaleDateString();

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
    return { background: c.bg, color: c.color, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, textTransform: "capitalize" };
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <h1 style={{ fontFamily: "'IBM Plex Serif', serif", fontSize: 28, color: "var(--text-dark, #1E2A1F)", margin: 0 }}>My Orders</h1>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid var(--border, #DCE6D8)", fontSize: 14, background: "#fff" }}>
          <option value="">All statuses</option>
          {["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"].map((s) => <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      {loading ? (
        <div style={{ padding: 40, textAlign: "center", color: "var(--text-muted, #66766A)" }}>Loading orders...</div>
      ) : filtered.length === 0 ? (
        <div style={{ background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 12, padding: 40, textAlign: "center", boxShadow: "0 6px 20px rgba(29,78,42,0.05)" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginBottom: 10 }}><Package size={36} color="var(--text-muted, #66766A)" /></div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-dark, #1E2A1F)", marginBottom: 6 }}>No orders found</div>
          <p style={{ color: "var(--text-muted, #66766A)" }}>{filter ? "Try changing the filter." : "Start shopping to place your first order."}</p>
          <Link to="/buyer/marketplace" style={{ color: "var(--green-700, #2F6D3F)", fontWeight: 600, marginTop: 10, display: "inline-block" }}>Browse Marketplace</Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((o) => (
            <Link key={o.id} to={`/buyer/orders/${o.id}`} style={{ background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 12, padding: 16, boxShadow: "0 6px 20px rgba(29,78,42,0.05)", textDecoration: "none", color: "inherit", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontWeight: 700, color: "var(--text-dark, #1E2A1F)", fontSize: 15 }}>{o.orderNumber}</div>
                <div style={{ fontSize: 13, color: "var(--text-muted, #66766A)", marginTop: 4 }}>{d(o.createdAt)} • {o.items.length} item(s) • {o.farmerName}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={statusBadge(o.status)}>{o.status.replace("_", " ")}</span>
                <span style={{ fontWeight: 700, color: "var(--green-700, #2F6D3F)", fontSize: 14 }}>{fmt(o.total)}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
