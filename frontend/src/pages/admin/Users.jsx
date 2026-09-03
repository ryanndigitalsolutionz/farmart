import { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import { getUsers } from "../../services/adminApi";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader title="Users" subtitle="All registered platform users" />
      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
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
                <td style={{ padding: "8px 6px" }}>{u.first_name} {u.last_name}</td>
                <td style={{ padding: "8px 6px" }}>{u.email}</td>
                <td style={{ padding: "8px 6px", textTransform: "capitalize" }}>{u.role}</td>
                <td style={{ padding: "8px 6px" }}>{new Date(u.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}