import { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import { api } from "../../api";

export default function Transactions() {
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const all = await api.getTransactions();
        if (!cancelled) setTxns(Array.isArray(all) ? all : []);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div>
      <PageHeader title="Transactions" subtitle="Payments and commission history" />
      {loading && <p style={{ color: "var(--text-muted, #66766A)" }}>Loading transactions…</p>}
      {error && <p style={{ color: "crimson" }}>Couldn't load transactions: {error}</p>}
      {!loading && !error && (
        <div style={{ overflowX: "auto" }}>
          {/* Desktop table */}
          <div className="hide-mobile" style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", gap: 0, borderBottom: "1px solid var(--border, #DCE6D8)", padding: "8px 6px", fontWeight: 600, color: "var(--text-dark, #1E2A1F)" }}>
              <div>Ref</div><div>Amount</div><div>Type</div><div>Status</div><div>Date</div>
            </div>
            {txns.map((t) => (
              <div key={t.id} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", gap: 0, borderBottom: "1px solid #EEF2EC", padding: "8px 6px", alignItems: "center", fontSize: 13.5 }}>
                <div>{t.reference || `TXN-${t.id}`}</div>
                <div>KES {Number(t.amount || 0).toLocaleString()}</div>
                <div style={{ textTransform: "capitalize" }}>{t.type}</div>
                <div style={{ textTransform: "capitalize" }}>{t.status}</div>
                <div>{t.createdAt ? new Date(t.createdAt).toLocaleDateString() : "—"}</div>
              </div>
            ))}
          </div>
          {/* Mobile cards */}
          <div className="show-mobile-only" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {txns.length === 0 && (
              <p style={{ color: "var(--text-muted, #66766A)", padding: "14px 6px" }}>No transactions found.</p>
            )}
            {txns.map((t) => (
              <div key={t.id} style={{ background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 10, padding: 14, display: "flex", flexDirection: "column", gap: 4, fontSize: 13.5 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, color: "var(--text-dark, #1E2A1F)" }}>{t.reference || `TXN-${t.id}`}</span>
                  <span style={{ textTransform: "capitalize", background: "var(--green-100, #EAF3E6)", padding: "2px 8px", borderRadius: 8, fontSize: 12, fontWeight: 600 }}>{t.status}</span>
                </div>
                <div style={{ color: "var(--text-muted, #66766A)" }}>Amount: KES {Number(t.amount || 0).toLocaleString()}</div>
                <div style={{ color: "var(--text-muted, #66766A)" }}>Type: {t.type}</div>
                <div style={{ color: "var(--text-muted, #66766A)" }}>{t.createdAt ? new Date(t.createdAt).toLocaleDateString() : "—"}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}