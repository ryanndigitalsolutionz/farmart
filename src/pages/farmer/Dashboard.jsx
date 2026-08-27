import { useEffect, useState, useMemo } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import { useAuth } from "../../context/AuthContext";
import { useOrders } from "../../context/OrderContext";
import { useLivestock } from "../../context/LivestockContext";
import { api } from "../../api";
import { Star } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const { orders } = useOrders();
  const { listings } = useLivestock();
  const navigate = useNavigate();
  const [recentOrders, setRecentOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const allOrders = await api.getOrders({ farmerId: user?.id });
        if (!cancelled) {
          setRecentOrders(allOrders.slice(0, 5));
          const totalRevenue = allOrders
            .filter((o) => o.status !== "cancelled")
            .reduce((sum, o) => sum + (o.total || 0), 0);
          setRevenue(totalRevenue);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (user?.id) load();
    return () => { cancelled = true; };
  }, [user?.id]);

  const myListings = useMemo(
    () => listings.filter((l) => l.farmerId === user?.id),
    [listings, user?.id]
  );

  const myOrders = useMemo(
    () => orders.filter((o) => o.farmerId === user?.id),
    [orders, user?.id]
  );

  const activeListings = myListings.filter((l) => l.status === "active").length;
  const pendingOrders = myOrders.filter((o) => o.status === "pending").length;
  const completedSales = myOrders.filter((o) => o.status === "delivered").length;

  const statCards = [
    { label: "Total Listings", value: myListings.length, to: "/farmer/listings" },
    { label: "Active Listings", value: activeListings, to: "/farmer/listings" },
    { label: "Pending Orders", value: pendingOrders, to: "/farmer/orders" },
    { label: "Completed Sales", value: completedSales, to: "/farmer/orders" },
    { label: "Revenue", value: `KES ${revenue.toLocaleString()}`, to: "/farmer/analytics" },
    { label: "Rating", value: user?.rating ? <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>{user.rating} <Star size={14} color="#F59E0B" fill="#F59E0B" /></span> : "—", to: "/farmer/farm-profile" },
  ];

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${user?.name?.split(" ")[0] || "Farmer"}`}
        subtitle="Here's what's happening on your farm today"
      />

      {/* Stat cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 14,
          marginBottom: 28,
        }}
      >
        {statCards.map((card) => (
          <NavLink
            key={card.label}
            to={card.to}
            className="stat-card"
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                fontSize: 11,
                color: "var(--text-muted, #66766A)",
                marginBottom: 6,
                fontFamily: "Modern Antiqua, serif",
              }}
            >
              {card.label}
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "var(--text-dark, #1E2A1F)",
                fontFamily: "'IBM Plex Serif', serif",
              }}
            >
              {loading && typeof card.value === "number" ? "…" : card.value}
            </div>
          </NavLink>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ marginBottom: 28 }}>
        <h2
          style={{
            fontFamily: "'IBM Plex Serif', serif",
            fontSize: 18,
            margin: "0 0 14px",
            color: "var(--text-dark, #1E2A1F)",
          }}
        >
          Quick Actions
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          {[
            { label: "Create Listing", path: "/farmer/listings/new", primary: true },
            { label: "Manage Listings", path: "/farmer/listings", primary: false },
            { label: "View Orders", path: "/farmer/orders", primary: false },
            { label: "Analytics", path: "/farmer/analytics", primary: false },
            { label: "Edit Farm Profile", path: "/farmer/farm-profile", primary: false },
          ].map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              style={{
                background: action.primary ? "#277a44" : "var(--white, #fff)",
                color: action.primary ? "#fff" : "var(--text-dark, #1E2A1F)",
                border: action.primary
                  ? "none"
                  : "1px solid var(--border, #DCE6D8)",
                borderRadius: 10,
                padding: "10px 16px",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "Modern Antiqua, serif",
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <h2
          style={{
            fontFamily: "'IBM Plex Serif', serif",
            fontSize: 18,
            margin: "0 0 14px",
            color: "var(--text-dark, #1E2A1F)",
          }}
        >
          Recent Orders
        </h2>
        {recentOrders.length === 0 ? (
          <p
            style={{
              color: "var(--text-muted, #66766A)",
              fontSize: 13,
              fontFamily: "Modern Antiqua, serif",
            }}
          >
            No orders yet. Your recent activity will appear here.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {recentOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => navigate(`/farmer/orders/${order.id}`)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid var(--border, #DCE6D8)",
                  borderRadius: 12,
                  padding: "14px 16px",
                  cursor: "pointer",
                  background: "var(--white, #fff)",
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 13.5,
                      color: "var(--text-dark, #1E2A1F)",
                      fontFamily: "Modern Antiqua, serif",
                    }}
                  >
                    #{order.orderNumber} — {order.buyerName}
                  </div>
                  <div
                    style={{
                      color: "var(--text-muted, #66766A)",
                      fontSize: 12,
                      marginTop: 3,
                      fontFamily: "Modern Antiqua, serif",
                    }}
                  >
                    {order.items?.length || 0} item(s) · KES {(order.total || 0).toLocaleString()}
                  </div>
                </div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 10px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "capitalize",
                    background:
                      order.status === "delivered"
                        ? "#EAF3E6"
                        : order.status === "pending"
                        ? "#FBF0D2"
                        : "#EEF2EC",
                    color:
                      order.status === "delivered"
                        ? "#2F6D3F"
                        : order.status === "pending"
                        ? "#8A6D1B"
                        : "#66766A",
                  }}
                >
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
