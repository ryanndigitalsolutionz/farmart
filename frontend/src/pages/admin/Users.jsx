import { useState } from "react";


// TODO: replace with real fetch("/api/admin/users") once backend is ready
const MOCK_USERS = [
  { id: 1, name: "Amina Wanjiru", email: "amina.wanjiru@gmail.com", role: "buyer", created_at: "2026-03-14" },
  { id: 2, name: "Peter Kamau", email: "peter.kamau@gmail.com", role: "farmer", created_at: "2026-04-02" },
  { id: 3, name: "Grace Otieno", email: "grace.otieno@gmail.com", role: "buyer", created_at: "2026-05-19" },
  { id: 4, name: "John Mwangi", email: "john.mwangi@gmail.com", role: "farmer", created_at: "2026-06-08" },
  { id: 5, name: "Faith Njeri", email: "faith.njeri@gmail.com", role: "admin", created_at: "2026-01-22" },
];

export default function Users() {
  const [users] = useState(MOCK_USERS);

  return (
    <div>
      <PageHeader title="Users" subtitle="All registered platform users" />
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid var(--border, #DCE6D8)" }}>
            <th style={{ padding: "8px 6px" }}>Name</th>
            <th style={{ padding: "8px 6px" }}>Email</th>
            <th style={{ padding: "8px 6px" }}>Role</th>
            <th style={{ padding: "8px 6px" }}>Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} style={{ borderBottom: "1px solid #EEF2EC" }}>
              <td style={{ padding: "8px 6px" }}>{u.name}</td>
              <td style={{ padding: "8px 6px" }}>{u.email}</td>
              <td style={{ padding: "8px 6px", textTransform: "capitalize" }}>{u.role}</td>
              <td style={{ padding: "8px 6px" }}>{new Date(u.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}// commit 36
