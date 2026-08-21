import { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/admin/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed (${res.status})`);
        return res.json();
      })
      .then((data) => setUsers(Array.isArray(data) ? data : data.users || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader title="Users" subtitle="All registered platform users" />
      {loading && <p>Loading users…</p>}
      {error && <p style={{ color: "crimson" }}>Couldn't load users: {error}</p>}
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
            {users.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: "14px 6px", color: "var(--text-muted, #66766A)" }}>
                  No users found.
                </td>
              </tr>
            )}
            {users.map((u) => (
              <tr key={u.id} style={{ borderBottom: "1px solid #EEF2EC" }}>
                <td style={{ padding: "8px 6px" }}>{u.name || u.full_name || "—"}</td>
                <td style={{ padding: "8px 6px" }}>{u.email}</td>
                <td style={{ padding: "8px 6px", textTransform: "capitalize" }}>{u.role}</td>
                <td style={{ padding: "8px 6px" }}>
                  {u.created_at ? new Date(u.created_at).toLocaleDateString() : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}