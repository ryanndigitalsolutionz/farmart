import { useState } from "react";


// TODO: replace with real fetch("/api/admin/transactions") once backend is ready
const MOCK_TRANSACTIONS = [
  { id: 1, reference: "TXN-88213", amount: 4500, type: "payment", status: "completed", created_at: "2026-08-20" },
  { id: 2, reference: "TXN-88214", amount: 1200, type: "commission", status: "completed", created_at: "2026-08-20" },
  { id: 3, reference: "TXN-88215", amount: 8750, type: "payment", status: "pending", created_at: "2026-08-23" },
  { id: 4, reference: "TXN-88216", amount: 875, type: "commission", status: "pending", created_at: "2026-08-23" },
];

export default function Transactions() {
  const [txns] = useState(MOCK_TRANSACTIONS);

  return (
    <div>
      <PageHeader title="Transactions" subtitle="Payments and commission history" />
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
          {txns.map((t) => (
            <tr key={t.id} style={{ borderBottom: "1px solid #EEF2EC" }}>
              <td style={{ padding: "8px 6px" }}>{t.reference}</td>
              <td style={{ padding: "8px 6px" }}>KES {t.amount.toLocaleString()}</td>
              <td style={{ padding: "8px 6px", textTransform: "capitalize" }}>{t.type}</td>
              <td style={{ padding: "8px 6px", textTransform: "capitalize" }}>{t.status}</td>
              <td style={{ padding: "8px 6px" }}>{new Date(t.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}