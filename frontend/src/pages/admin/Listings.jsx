import { useEffect, useState } from "react";

export default function Listings() {
  const { refreshOverview } = useAdmin();
  const [listings, setListings] = useState([]);
  const [commission, setCommission] = useState("");
  const [savingCommission, setSavingCommission] = useState(false);

  useEffect(() => {
    loadListings();
    getCommissionRate().then((r) => setCommission(r.percentage)).catch(console.error);
  }, []);

  const loadListings = () => {
    getListingsForReview({ flaggedOnly: true }).then(setListings).catch(console.error);
  };

  const handleApprove = async (animalId) => {
    await approveListing(animalId);
    setListings((list) => list.filter((a) => a.id !== animalId));
    refreshOverview();
  };

  const handleSuspend = async (animalId) => {
    const reason = window.prompt("Why is this listing being suspended?");
    if (reason === null) return;
    await suspendListing(animalId, reason);
    setListings((list) => list.filter((a) => a.id !== animalId));
    refreshOverview();
  };

  const handleSaveCommission = async () => {
    setSavingCommission(true);
    try {
      await updateCommissionRate(Number(commission));
    } finally {
      setSavingCommission(false);
    }
  };

  return (
    <div>
      <PageHeader title="Moderate listings" subtitle="Review flagged animals before buyers can see them" />

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
        {listings.length === 0 && (
          <p style={{ color: "var(--text-muted, #66766A)", fontSize: 13 }}>
            No flagged listings right now.
          </p>
        )}
        {listings.map((animal) => (
          <div
            key={animal.id}
            style={{
              display: "flex",
              gap: 14,
              alignItems: "center",
              border: "1px solid var(--border, #DCE6D8)",
              borderRadius: 14,
              padding: 14,
              maxWidth: 520,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 10,
                background: "linear-gradient(135deg, var(--green-300, #A8D0A0), var(--green-600, #3C7F4C))",
                flex: "0 0 auto",
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>
                {animal.breed} — {animal.location}
              </div>
              <span
                style={{
                  display: "inline-block",
                  marginTop: 4,
                  background: "#FBE7E4",
                  color: "#B2503E",
                  fontSize: 10.5,
                  fontWeight: 700,
                  padding: "3px 9px",
                  borderRadius: 20,
                }}
              >
                Flagged: {animal.flag_reason || "needs review"}
              </span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => handleApprove(animal.id)}
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
                Approve
              </button>
              <button
                onClick={() => handleSuspend(animal.id)}
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
                Suspend
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- Commission settings --- */}
      <div style={{ maxWidth: 340 }}>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Commission settings</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "var(--green-100, #EAF3E6)",
            border: "1px solid var(--green-150, #DCEBD6)",
            borderRadius: 10,
            padding: "10px 12px",
          }}
        >
          <span style={{ fontSize: 12.5 }}>Platform commission —</span>
          <input
            type="number"
            step="0.1"
            value={commission}
            onChange={(e) => setCommission(e.target.value)}
            style={{
              width: 60,
              border: "1px solid var(--border, #DCE6D8)",
              borderRadius: 6,
              padding: "3px 6px",
              fontSize: 12.5,
            }}
          />
          <span style={{ fontSize: 12.5 }}>%</span>
        </div>
        <button
          onClick={handleSaveCommission}
          disabled={savingCommission}
          style={{
            marginTop: 10,
            background: "var(--green-700, #2F6D3F)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 16px",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {savingCommission ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}
