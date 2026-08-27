import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrderContext";
import { useWishlist } from "../../context/WishlistContext";

export default function BuyerDashboard() {
  const { user } = useAuth();
  const { getOrders } = useOrders();
  const { count: wishlistCount } = useWishlist();
  const { count: cartCount } = useCart();
  const [stats, setStats] = useState({ total: 0, active: 0, completed: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const all = await getOrders({ buyerId: user.id });
      setStats({
        total: all.length,
        active: all.filter((o) => !["delivered", "cancelled"].includes(o.status)).length,
        completed: all.filter((o) => o.status === "delivered").length,
      });
      setRecent(all.slice(0, 5));
      setLoading(false);
    })();
  }, [user, getOrders]);

  const fmt = (n) => "KES " + Number(n).toLocaleString();

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
    return { background: c.bg, color: c.color, padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, textTransform: "capitalize" };
  };

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "var(--text-muted, #66766A)" }}>Loading dashboard...</div>;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'IBM Plex Serif', serif", fontSize: 28, color: "var(--text-dark, #1E2A1F)", margin: "0 0 6px" }}>Welcome back, {user?.name?.split(" ")[0] || "Buyer"}</h1>
        <p style={{ color: "var(--text-muted, #66766A)", margin: 0, fontSize: 14 }}>Here's an overview of your marketplace activity.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
        {[
          { label: "Total Orders", value: stats.total, to: "/buyer/orders", color: "#277a44" },
          { label: "Active Orders", value: stats.active, to: "/buyer/orders", color: "#2563EB" },
          { label: "Completed", value: stats.completed, to: "/buyer/orders", color: "#059669" },
          { label: "Wishlist", value: wishlistCount, to: "/buyer/wishlist", color: "#D97706" },
        ].map((c) => (
          <Link key={c.label} to={c.to} className="stat-card" style={{ textDecoration: "none" }}>
            <div style={{ color: "var(--text-muted, #66766A)", fontSize: 13, marginBottom: 6 }}>{c.label}</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: c.color }}>{c.value}</div>
          </Link>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)", gap: 20, alignItems: "start" }}>
        <div style={{ background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 12, padding: 20, boxShadow: "0 6px 20px rgba(29,78,42,0.05)" }}>
          <h2 style={{ fontFamily: "'IBM Plex Serif', serif", fontSize: 18, margin: "0 0 14px", color: "var(--text-dark, #1E2A1F)" }}>Recent Orders</h2>
          {recent.length === 0 ? (
            <div style={{ color: "var(--text-muted, #66766A)", padding: 16, textAlign: "center" }}>No orders yet.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {recent.map((o) => (
                <Link key={o.id} to={`/buyer/orders/${o.id}`} className="clickable-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 8, background: "#f7faf7", textDecoration: "none", color: "inherit" }}>
                  <div>
                    <div style={{ fontWeight: 600, color: "var(--text-dark, #1E2A1F)", fontSize: 14 }}>{o.orderNumber}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted, #66766A)" }}>{new Date(o.createdAt).toLocaleDateString()} • {o.items.length} item(s)</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={statusBadge(o.status)}>{o.status.replace("_", " ")}</span>
                    <span style={{ fontWeight: 700, color: "var(--green-700, #2F6D3F)", fontSize: 13 }}>{fmt(o.total)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 12, padding: 20, boxShadow: "0 6px 20px rgba(29,78,42,0.05)" }}>
          <h2 style={{ fontFamily: "'IBM Plex Serif', serif", fontSize: 18, margin: "0 0 14px", color: "var(--text-dark, #1E2A1F)" }}>Quick Links</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Browse Marketplace", to: "/buyer/marketplace" },
              { label: `Cart (${cartCount})`, to: "/buyer/cart" },
              { label: "My Orders", to: "/buyer/orders" },
              { label: `Wishlist (${wishlistCount})`, to: "/buyer/wishlist" },
            ].map((q) => (
              <Link key={q.to} to={q.to} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 8, background: "#f7faf7", textDecoration: "none", color: "var(--text-dark, #1E2A1F)", fontSize: 14, fontWeight: 600 }}>
                {q.label}
                <span style={{ color: "var(--text-muted, #66766A)" }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
