import { useEffect, useState } from "react";

export default function Disputes() {
  const { refreshOverview } = useAdmin();
  const [disputes, setDisputes] = useState([]);
  const [resolvingId, setResolvingId] = useState(null);

  useEffect(() => {
    getDisputes({ status: "open" }).then(setDisputes).catch(console.error);
  }, []);

  const handleResolve = async (disputeId) => {
    const notes = window.prompt("Resolution notes (visible to both parties):");
    if (notes === null) return;
    setResolvingId(disputeId);
    try {
      await resolveDispute(disputeId, notes);
      setDisputes((list) => list.filter((d) => d.id !== disputeId));
      refreshOverview();
    } finally {
      setResolvingId(null);
    }
  };

  return (
    <div>
      <PageHeader title="Disputes" subtitle="Open cases raised by buyers or farmers" />

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32, maxWidth: 480 }}>
        {disputes.length === 0 && (
          <p style={{ color: "var(--text-muted, #66766A)", fontSize: 13 }}>No open disputes 🎉</p>
        )}
        {disputes.map((dispute) => (
          <div
            key={dispute.id}
            style={{ border: "1px solid var(--border, #DCE6D8)", borderRadius: 14, padding: 16 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700, fontSize: 13.5 }}>Order #{dispute.order_id}</span>
              <span
                style={{
                  background: "var(--yellow-100, #FBF0D2)",
                  color: "var(--yellow-600, #CFA22B)",
                  fontSize: 10.5,
                  fontWeight: 700,
                  padding: "3px 9px",
                  borderRadius: 20,
                }}
              >
                Open
              </span>
            </div>
            <p style={{ fontSize: 12.5, color: "var(--text-muted, #66766A)", margin: "8px 0 14px" }}>
              {dispute.reason}
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                style={{
                  background: "#fff",
                  color: "var(--green-700, #2F6D3F)",
                  border: "1.4px solid var(--green-300, #A8D0A0)",
                  borderRadius: 8,
                  padding: "8px 14px",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Message parties
              </button>
              <button
                onClick={() => handleResolve(dispute.id)}
                disabled={resolvingId === dispute.id}
                style={{
                  background: "var(--green-700, #2F6D3F)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 14px",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {resolvingId === dispute.id ? "Resolving…" : "Resolve"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- Content management --- */}
      <div style={{ maxWidth: 480 }}>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Content management</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid var(--border, #DCE6D8)",
            borderRadius: 12,
            padding: "12px 16px",
          }}
        >
          <span style={{ fontSize: 12.5 }}>FAQs &amp; announcements</span>
          {/* TODO: link to /admin/announcements once that page/route exists */}
          <a href="/admin/announcements" style={{ color: "var(--green-700, #2F6D3F)", fontSize: 12.5, fontWeight: 700 }}>
            Edit →
          </a>
        </div>
      </div>
    </div>
  );
}
