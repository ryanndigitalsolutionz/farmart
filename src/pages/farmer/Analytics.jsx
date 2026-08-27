import { useEffect, useMemo, useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import { useAuth } from "../../context/AuthContext";
import { useLivestock } from "../../context/LivestockContext";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { api } from "../../api";

const COLORS = ["#277a44", "#2F6D3F", "#3C7F4C", "#A8D0A0", "#DCE6D8", "#8A6D1B"];

export default function Analytics() {
  const { user } = useAuth();
  const { listings } = useLivestock();
  const [chartData, setChartData] = useState({ revenueOverTime: [], salesVolume: [], categoryDistribution: [], statusDistribution: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const allOrders = await api.getOrders({ farmerId: user?.id });
        if (!cancelled) {
          const myListings = listings.filter((l) => l.farmerId === user?.id);
          buildCharts(allOrders, myListings);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (user?.id) load();
    return () => { cancelled = true; };
  }, [user?.id, listings]);

  const buildCharts = (allOrders, myListings) => {
    // Revenue over time (by day)
    const byDay = {};
    allOrders
      .filter((o) => o.status !== "cancelled")
      .forEach((o) => {
        const day = new Date(o.createdAt).toISOString().slice(0, 10);
        byDay[day] = (byDay[day] || 0) + (o.total || 0);
      });
    const revenueOverTime = Object.entries(byDay)
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Sales volume (count by day)
    const volumeByDay = {};
    allOrders.forEach((o) => {
      const day = new Date(o.createdAt).toISOString().slice(0, 10);
      volumeByDay[day] = (volumeByDay[day] || 0) + 1;
    });
    const salesVolume = Object.entries(volumeByDay)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Category distribution
    const byType = {};
    myListings.forEach((l) => {
      byType[l.type] = (byType[l.type] || 0) + 1;
    });
    const categoryDistribution = Object.entries(byType).map(([name, value]) => ({ name, value }));

    // Order status distribution
    const byStatus = {};
    allOrders.forEach((o) => {
      byStatus[o.status] = (byStatus[o.status] || 0) + 1;
    });
    const statusDistribution = Object.entries(byStatus).map(([name, value]) => ({ name, value }));

    setChartData({ revenueOverTime, salesVolume, categoryDistribution, statusDistribution });
  };

  const hasData = useMemo(
    () =>
      chartData.revenueOverTime.length > 0 ||
      chartData.salesVolume.length > 0 ||
      chartData.categoryDistribution.length > 0 ||
      chartData.statusDistribution.length > 0,
    [chartData]
  );

  return (
    <div>
      <PageHeader title="Analytics" subtitle="Insights into your farm performance" />

      {loading ? (
        <p style={{ color: "var(--text-muted, #66766A)", fontSize: 13 }}>Loading analytics…</p>
      ) : !hasData ? (
        <div
          style={{
            background: "var(--green-100, #EAF3E6)",
            border: "1px solid var(--border, #DCE6D8)",
            borderRadius: 14,
            padding: "28px 24px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "var(--text-dark, #1E2A1F)",
              fontFamily: "'IBM Plex Serif', serif",
              margin: "0 0 6px",
            }}
          >
            No data yet
          </p>
          <p
            style={{
              fontSize: 13,
              color: "var(--text-muted, #66766A)",
              fontFamily: "Modern Antiqua, serif",
              margin: 0,
            }}
          >
            Start listing livestock and receiving orders to see analytics here.
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 22 }}>
          {/* Revenue over time */}
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
                fontSize: 15,
                margin: "0 0 14px",
                color: "var(--text-dark, #1E2A1F)",
              }}
            >
              Revenue Over Time
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={chartData.revenueOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#DCE6D8" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#66766A" />
                <YAxis tick={{ fontSize: 11 }} stroke="#66766A" />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid var(--border, #DCE6D8)",
                    borderRadius: 10,
                    fontSize: 12,
                  }}
                  formatter={(value) => [`KES ${Number(value).toLocaleString()}`, "Revenue"]}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#277a44" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Sales volume */}
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
                fontSize: 15,
                margin: "0 0 14px",
                color: "var(--text-dark, #1E2A1F)",
              }}
            >
              Sales Volume
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={chartData.salesVolume}>
                <CartesianGrid strokeDasharray="3 3" stroke="#DCE6D8" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#66766A" />
                <YAxis tick={{ fontSize: 11 }} stroke="#66766A" />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid var(--border, #DCE6D8)",
                    borderRadius: 10,
                    fontSize: 12,
                  }}
                  formatter={(value) => [value, "Orders"]}
                />
                <Legend />
                <Bar dataKey="count" fill="#277a44" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category & Status distribution */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 18,
            }}
          >
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
                  fontSize: 15,
                  margin: "0 0 14px",
                  color: "var(--text-dark, #1E2A1F)",
                }}
              >
                Category Distribution
              </h3>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={chartData.categoryDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {chartData.categoryDistribution.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      border: "1px solid var(--border, #DCE6D8)",
                      borderRadius: 10,
                      fontSize: 12,
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

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
                  fontSize: 15,
                  margin: "0 0 14px",
                  color: "var(--text-dark, #1E2A1F)",
                }}
              >
                Order Status Distribution
              </h3>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={chartData.statusDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {chartData.statusDistribution.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      border: "1px solid var(--border, #DCE6D8)",
                      borderRadius: 10,
                      fontSize: 12,
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
