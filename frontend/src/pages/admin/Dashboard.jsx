import PageHeader from "../../components/layout/PageHeader";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { getPendingFarmers, approveFarmer, rejectFarmer } from "../../data/farmersStore";
import RejectReasonModal from "../../components/common/RejectReasonModal";

const metrics = {
  total_users: 0,
  active_listings: 0,
  gmv_this_month: 0,
  open_disputes: 0,
};

const loading = false;

export default function Dashboard() {
  const [tab, setTab] = useState("farmers");
  const [pendingFarmers, setPendingFarmers] = useState(() => getPendingFarmers());
  const [rejectTarget, setRejectTarget] = useState(null);
  const navigate = useNavigate();

  const handleApprove = (farmerId) => {
    approveFarmer(farmerId);
    setPendingFarmers((list) => list.filter((f) => f.id !== farmerId));
  };

  const handleRejectSubmit = (reason) => {
    rejectFarmer(rejectTarget.id, reason);
    setPendingFarmers((list) => list.filter((f) => f.id !== rejectTarget.id));
    setRejectTarget(null);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div style={{ marginBottom: 20 }}>
          <h1
            style={{
              fontFamily: "var(--font-display, 'IBM Plex Serif', serif)",
              fontSize: 22,
              fontWeight: 600,
              color: "var(--green-900, #163420)",
              margin: 0,
            }}
          >
            Platform overview
          </h1>
          <p style={{ color: "var(--text-muted, #66766A)", fontSize: 13, marginTop: 4 }}>
            Snapshot of Farmart's health across all roles
          </p>
        </div>
      </motion.div>

      {/* --- Metric cards --- */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
        }}
        style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}
      >
        <MetricCard label="Total users" value={metrics?.total_users} loading={loading} />
        <MetricCard label="Active listings" value={metrics?.active_listings} loading={loading} />
        <MetricCard label="GMV this month" value={metrics?.gmv_this_month} prefix="KES " loading={loading} />
        <MetricCard
          label="Open disputes"
          value={metrics?.open_disputes}
          loading={loading}
          highlight
        />
      </motion.div>

      {/* --- Role tabs --- */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, position: "relative" }}>
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

      {/* --- Tab content, crossfaded --- */}
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
              <p style={{ color: "var(--text-muted, #66766A)", fontSize: 13 }}>
                No farmers waiting on verification 🎉
              </p>
            )}
            <AnimatePresence>
              {pendingFarmers.map((farmer) => (
                <motion.div
                  key={farmer.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 40, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                  whileHover={{ y: -2, boxShadow: "0 6px 18px rgba(22,52,32,0.08)" }}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid var(--border, #DCE6D8)",
                    borderRadius: 12,
                    padding: "12px 16px",
                  }}
                >
                  <div
                    onClick={() => navigate(`/admin/farmers/${farmer.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <div style={{ fontWeight: 700, fontSize: 13.5 }}>{farmer.farm_name}</div>
                    <div style={{ color: "var(--text-muted, #66766A)", fontSize: 11.5 }}>
                      {farmer.location} · Pending verification
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
                      onClick={() => setRejectTarget(farmer)}
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
            </AnimatePresence>
          </motion.div>
        )}

        {tab === "buyers" && (
          <motion.p
            key="buyers"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            style={{ color: "var(--text-muted, #66766A)", fontSize: 13 }}
          >
            TODO: reuse the getUsers({"{"} role: "buyer" {"}"}) call — same list pattern as farmers, minus
            the verify/reject actions.
          </motion.p>
        )}

        {tab === "listings" && (
          <motion.p
            key="listings"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            style={{ color: "var(--text-muted, #66766A)", fontSize: 13 }}
          >
            See <code>Listings.jsx</code> for the full moderation queue — this tab can link there.
          </motion.p>
        )}
      </AnimatePresence>

      {rejectTarget && (
        <RejectReasonModal
          farmerName={rejectTarget.farm_name}
          onCancel={() => setRejectTarget(null)}
          onSubmit={handleRejectSubmit}
        />
      )}
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