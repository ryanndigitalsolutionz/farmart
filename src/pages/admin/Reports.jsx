import { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import { api } from "../../api";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const COLORS = ["#2F6D3F", "#3C7F4C", "#A8D0A0", "#E8B93D", "#B2503E"];

function useWindowWidth() {
  const [width, setWidth] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e) => setWidth(e.matches ? 400 : 1200);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  return width;
}

export default function Reports() {
  const winWidth = useWindowWidth();
  const chartHeight = winWidth < 768 ? 220 : 260;
  const [metrics, setMetrics] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const [m, allOrders] = await Promise.all([
          api.getMetrics(),
          api.getOrders(),
        ]);
        if (!cancelled) {
          setMetrics(m);
          setOrders(Array.isArray(allOrders) ? allOrders : []);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const statusData = useMemoByStatus(orders);
  const farmerData = useMemoByFarmer(orders);
  const monthlyData = useMemoMonthly(orders);

  if (loading) return <p style={{ color: "var(--text-muted, #66766A)" }}>Loading reports…</p>;
  if (!metrics) return <p style={{ color: "var(--text-muted, #66766A)" }}>No data available.</p>;

  return (
    <div>
      <PageHeader title="Reports" subtitle="Platform performance overview" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))", gap: 14, marginBottom: 28 }}>
        {[
          { label: "Total Users", value: metrics.totalUsers },
          { label: "Farmers", value: metrics.farmers },
          { label: "Buyers", value: metrics.buyers },
          { label: "Active Listings", value: metrics.activeListings },
          { label: "Total Orders", value: metrics.totalOrders },
          { label: "GMV", value: "KES " + Number(metrics.gmvThisMonth || 0).toLocaleString() },
          { label: "Total Revenue", value: "KES " + Number(metrics.totalRevenue || 0).toLocaleString() },
          { label: "Open Disputes", value: metrics.openDisputes },
        ].map((stat) => (
          <div key={stat.label} style={{ background: "var(--green-100, #EAF3E6)", borderRadius: 14, padding: "14px 16px", border: "1px solid var(--border, #DCE6D8)" }}>
            <div style={{ fontSize: 11, color: "var(--text-muted, #66766A)" }}>{stat.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "var(--green-900, #163420)" }}>{stat.value ?? "—"}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 20, marginBottom: 28 }}>
        <div style={{ border: "1px solid var(--border, #DCE6D8)", borderRadius: 14, padding: 18, background: "var(--white, #fff)" }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 15 }}>Orders by status</h3>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {statusData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ border: "1px solid var(--border, #DCE6D8)", borderRadius: 14, padding: 18, background: "var(--white, #fff)" }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 15 }}>Revenue by farmer</h3>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart data={farmerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value) => "KES " + Number(value).toLocaleString()} />
              <Legend />
              <Bar dataKey="revenue" fill="#2F6D3F" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ border: "1px solid var(--border, #DCE6D8)", borderRadius: 14, padding: 18, background: "var(--white, #fff)" }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 15 }}>Order volume (last 7 days)</h3>
        <ResponsiveContainer width="100%" height={chartHeight}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="orders" stroke="#2F6D3F" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function useMemoByStatus(orders) {
  const map = {};
  orders.forEach((o) => {
    const s = o.status || "unknown";
    map[s] = (map[s] || 0) + 1;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

function useMemoByFarmer(orders) {
  const map = {};
  orders.forEach((o) => {
    if (!o.farmerName) return;
    map[o.farmerName] = (map[o.farmerName] || 0) + (o.total || 0);
  });
  return Object.entries(map).map(([name, revenue]) => ({ name, revenue }));
}

function useMemoMonthly(orders) {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    days.push({ date: label, key, orders: 0 });
  }
  orders.forEach((o) => {
    if (!o.createdAt) return;
    const key = o.createdAt.slice(0, 10);
    const day = days.find((d) => d.key === key);
    if (day) day.orders += 1;
  });
  return days;
}