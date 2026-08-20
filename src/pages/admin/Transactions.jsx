import { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader";

export default function Transactions() {
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/admin/transactions", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed (${res.status})`);
        return res.json();
      })
      .then((data) => setTxns(Array.isArray(data) ? data : data.transactions || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader title="Transactions" subtitle="Payments and commission history" />
      {loading && <p>Loading transactions…</p>}
      {error && <p style={{ color: "crimson" }}>Couldn't load transactions: {error}</p>}
      {!loading && !error && (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid var(--border, #DCE6D8)" }}>
              <th style={{ padding: "8px 6px" }}>Ref</th>
              <th style={{ padding: "8px 6px" }}>Amount</th>
              <th style={{ padding: "8px 6px" }}>Type</th>
              <th style={{ padding: "8px 6px" }}>Status</th>
              <th style={{ padding: "8px 6px" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {txns.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: "14px 6px", color: "var(--text-muted, #66766A)" }}>
                  No transactions found.
                </td>
              </tr>
            )}
            {txns.map((t) => (
              <tr key={t.id} style={{ borderBottom: "1px solid #EEF2EC" }}>
                <td style={{ padding: "8px 6px" }}>{t.reference || `TXN-${t.id}`}</td>
                <td style={{ padding: "8px 6px" }}>KES {t.amount?.toLocaleString?.() ?? t.amount}</td>
                <td style={{ padding: "8px 6px", textTransform: "capitalize" }}>{t.type}</td>
                <td style={{ padding: "8px 6px", textTransform: "capitalize" }}>{t.status}</td>
                <td style={{ padding: "8px 6px" }}>
                  {t.created_at ? new Date(t.created_at).toLocaleDateString() : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}