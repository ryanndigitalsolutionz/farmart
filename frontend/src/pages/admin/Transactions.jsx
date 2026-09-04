import PageHeader from "../../components/layout/PageHeader";
import { useEffect, useState } from "react";
import { getPayments } from "../../services/adminApi";

export default function Transactions() {
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPayments()
      .then(setTxns)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader title="Transactions" subtitle="Payment history" />
      {loading && <p>Loading transactions...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid var(--border, #DCE6D8)" }}>
              <th style={{ padding: "8px 6px" }}>Ref</th>
              <th style={{ padding: "8px 6px" }}>Amount</th>
              <th style={{ padding: "8px 6px" }}>Method</th>
              <th style={{ padding: "8px 6px" }}>Status</th>
              <th style={{ padding: "8px 6px" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {txns.map((t) => (
              <tr key={t.id} style={{ borderBottom: "1px solid #EEF2EC" }}>
                <td style={{ padding: "8px 6px" }}>{t.transaction_id}</td>
                <td style={{ padding: "8px 6px" }}>KES {Number(t.amount).toLocaleString()}</td>
                <td style={{ padding: "8px 6px", textTransform: "capitalize" }}>{t.method}</td>
                <td style={{ padding: "8px 6px", textTransform: "capitalize" }}>{t.status}</td>
                <td style={{ padding: "8px 6px" }}>{new Date(t.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}