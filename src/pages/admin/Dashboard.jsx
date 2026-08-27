import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import { useAdmin } from "../../context/AdminContext";
import { getPendingFarmers, verifyFarmer, rejectFarmer } from "../../api/adminApi";
import { api } from "../../api";
import { CheckCircle2 } from "lucide-react";

export default function Dashboard() {
  const { metrics, refreshOverview, loading } = useAdmin();
  const [pendingFarmers, setPendingFarmers] = useState([]);
  const [tab, setTab] = useState("farmers");
  const [buyers, setBuyers] = useState([]);
  const [listings, setListings] = useState([]);
  const [buyersLoading, setBuyersLoading] = useState(true);
  const [listingsLoading, setListingsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    refreshOverview();
  }, [refreshOverview]);

  useEffect(() => {
    getPendingFarmers().then(setPendingFarmers).catch(console.error);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setBuyersLoading(true);
      try {
        const all = await api.getUsers();
        const buyerList = all.filter((u) => u.role === "buyer");
        if (!cancelled) setBuyers(buyerList);
      } finally {
        if (!cancelled) setBuyersLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setListingsLoading(true);
      try {
        const all = await api.getListings();
        if (!cancelled) setListings(all);
      } finally {
        if (!cancelled) setListingsLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const handleApprove = async (farmerId) => {
    await verifyFarmer(farmerId);
    setPendingFarmers((list) => list.filter((f) => f.id !== farmerId));
    refreshOverview();
  };

  const handleReject = async (farmerId) => {
    const reason = window.prompt("Reason for rejecting this farmer?");
    if (reason === null) return;
    await rejectFarmer(farmerId, reason);
    setPendingFarmers((list) => list.filter((f) => f.id !== farmerId));
    refreshOverview();
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <PageHeader title="Platform overview" subtitle="Snapshot of Farmart's health across all roles" />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
        }}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: 14, marginBottom: 24 }}
      >
        <MetricCard label="Total users" value={metrics?.totalUsers} loading={loading} />
        <MetricCard label="Active listings" value={metrics?.activeListings} loading={loading} />
        <MetricCard label="GMV this month" value={metrics?.gmvThisMonth} prefix="KES " loading={loading} />
        <MetricCard
          label="Open disputes"
          value={metrics?.openDisputes}
          loading={loading}
          highlight
        />
      </motion.div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, position: "relative", overflowX: "auto", pb: 1 }}>
        {["farmers", "buyers", "listings"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              position: "relative",
              padding: "6px 16px",
              borderRadius: 20,
              border: "none",
              fontSize: 12.5,
              fontWeight: 700,
              textTransform: "capitalize",
              cursor: "pointer",
              background: "transparent",
              color: tab === t ? "#fff" : "var(--green-700, #2F6D3F)",
              zIndex: 1,
            }}
          >
            {tab === t && (
              <motion.span
                layoutId="tab-pill"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 20,
                  background: "var(--green-700, #2F6D3F)",
                  zIndex: -1,
                }}
              />
            )}
            {tab !== t && (
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 20,
                  background: "var(--green-100, #EAF3E6)",
                  zIndex: -1,
                }}
              />
            )}
            {t}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === "farmers" && (
          <motion.div
            key="farmers"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
          >
            {pendingFarmers.length === 0 && (
              <div style={{ color: "var(--text-muted, #66766A)", fontSize: 13, display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 0" }}>
                <CheckCircle2 size={16} color="var(--green-700, #2F6D3F)" />
                No farmers waiting on verification
              </div>
            )}
            {pendingFarmers.map((farmer) => (
              <motion.div
                key={farmer.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 40, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -2, boxShadow: "0 6px 18px rgba(22,52,32,0.08)" }}
                className="clickable-row"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid var(--border, #DCE6D8)",
                  borderRadius: 12,
                  padding: "12px 16px",
                  background: "var(--white, #fff)",
                }}
              >
                <div style={{ cursor: "pointer", flex: 1 }} onClick={() => navigate(`/admin/farmers/${farmer.id}`)}>
                  <div style={{ fontWeight: 700, fontSize: 13.5 }}>{farmer.farm_name || farmer.name}</div>
                  <div style={{ color: "var(--text-muted, #66766A)", fontSize: 11.5 }}>
                    {farmer.location || "—"} · Pending verification
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleApprove(farmer.id)}
                    style={{
                      background: "var(--green-700, #2F6D3F)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "7px 14px",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Approve
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleReject(farmer.id)}
                    style={{
                      background: "#fff",
                      color: "#B2503E",
                      border: "1.4px solid #F0C9C1",
                      borderRadius: 8,
                      padding: "7px 14px",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Reject
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {tab === "buyers" && (
          <motion.div
            key="buyers"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {buyersLoading ? (
              <p style={{ color: "var(--text-muted, #66766A)", fontSize: 13 }}>Loading buyers…</p>
            ) : buyers.length === 0 ? (
              <div style={{ color: "var(--text-muted, #66766A)", fontSize: 13, padding: "16px 0" }}>No buyers found.</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {buyers.map((buyer) => (
                  <motion.div
                    key={buyer.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -1, boxShadow: "0 4px 12px rgba(22,52,32,0.06)" }}
                    className="clickable-row"
                    onClick={() => navigate(`/admin/buyers/${buyer.id}`)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      border: "1px solid var(--border, #DCE6D8)",
                      borderRadius: 12,
                      padding: "12px 16px",
                      cursor: "pointer",
                      background: "var(--white, #fff)",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13.5 }}>{buyer.name || buyer.email}</div>
                      <div style={{ color: "var(--text-muted, #66766A)", fontSize: 11.5 }}>
                        {buyer.email} · Joined {buyer.joinedAt ? new Date(buyer.joinedAt).toLocaleDateString() : "—"}
                      </div>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--green-700, #2F6D3F)", textTransform: "capitalize" }}>
                      {buyer.role}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {tab === "listings" && (
          <motion.div
            key="listings"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {listingsLoading ? (
              <p style={{ color: "var(--text-muted, #66766A)", fontSize: 13 }}>Loading listings…</p>
            ) : listings.length === 0 ? (
              <div style={{ color: "var(--text-muted, #66766A)", fontSize: 13, padding: "16px 0" }}>No listings found.</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {listings.slice(0, 20).map((listing) => (
                  <motion.div
                    key={listing.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -1, boxShadow: "0 4px 12px rgba(22,52,32,0.06)" }}
                    className="clickable-row"
                    onClick={() => navigate(`/livestock/${listing.id}`)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      border: "1px solid var(--border, #DCE6D8)",
                      borderRadius: 12,
                      padding: "12px 16px",
                      cursor: "pointer",
                      background: "var(--white, #fff)",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13.5 }}>{listing.title || `${listing.breed} — ${listing.type}`}</div>
                      <div style={{ color: "var(--text-muted, #66766A)", fontSize: 11.5 }}>
                        {listing.farmerName || "—"} · {listing.location || "—"} · KES {Number(listing.price || 0).toLocaleString()}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: 20,
                        textTransform: "capitalize",
                        background: listing.status === "active" ? "#EAF3E6" : listing.status === "pending_review" ? "#FBF0D2" : "#EEF2EC",
                        color: listing.status === "active" ? "#2F6D3F" : listing.status === "pending_review" ? "#8A6D1B" : "#66766A",
                      }}
                    >
                      {listing.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MetricCard({ label, value, prefix = "", loading, highlight }) {
  const numericValue = typeof value === "number" ? value : parseFloat(value) || 0;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16, scale: 0.96 },
        show: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -3, boxShadow: "0 8px 20px rgba(22,52,32,0.10)" }}
      style={{
        background: highlight ? "var(--yellow-100, #FBF0D2)" : "var(--green-100, #EAF3E6)",
        borderRadius: 14,
        padding: "14px 16px",
      }}
    >
      <div style={{ fontSize: 11, color: "var(--text-muted, #66766A)" }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: "var(--green-900, #163420)" }}>
        {loading ? (
          "…"
        ) : (
          <>
            {prefix}
            <AnimatedNumber value={numericValue} />
          </>
        )}
      </div>
    </motion.div>
  );
}

function AnimatedNumber({ value }) {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    spring.set(value || 0);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}