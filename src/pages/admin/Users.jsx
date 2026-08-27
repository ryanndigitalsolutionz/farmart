import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import { api } from "../../api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const all = await api.getUsers();
        if (!cancelled) setUsers(Array.isArray(all) ? all : []);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemoFilter(users, search, roleFilter);

  return (
    <div>
      <PageHeader title="Users" subtitle="All registered platform users" />
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search users…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: "1 1 200px",
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid var(--border, #DCE6D8)",
            background: "var(--white, #fff)",
            color: "var(--text-dark, #1E2A1F)",
            fontSize: 13.5,
          }}
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid var(--border, #DCE6D8)",
            background: "var(--white, #fff)",
            color: "var(--text-dark, #1E2A1F)",
            fontSize: 13.5,
          }}
        >
          <option value="all">All roles</option>
          <option value="buyer">Buyers</option>
          <option value="farmer">Farmers</option>
          <option value="admin">Admins</option>
        </select>
      </div>
      {loading && <p style={{ color: "var(--text-muted, #66766A)" }}>Loading users…</p>}
      {error && <p style={{ color: "crimson" }}>Couldn't load users: {error}</p>}
      {!loading && !error && (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid var(--border, #DCE6D8)" }}>
                <th style={{ padding: "8px 6px" }}>Name</th>
                <th style={{ padding: "8px 6px" }}>Email</th>
                <th style={{ padding: "8px 6px" }}>Role</th>
                <th style={{ padding: "8px 6px" }}>Joined</th>
                <th style={{ padding: "8px 6px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: "14px 6px", color: "var(--text-muted, #66766A)" }}>
                    No users found.
                  </td>
                </tr>
              )}
              {filtered.map((u) => (
                <tr key={u.id} style={{ borderBottom: "1px solid #EEF2EC" }}>
                  <td style={{ padding: "8px 6px" }}>{u.name || "—"}</td>
                  <td style={{ padding: "8px 6px" }}>{u.email}</td>
                  <td style={{ padding: "8px 6px", textTransform: "capitalize" }}>{u.role}</td>
                  <td style={{ padding: "8px 6px" }}>
                    {u.joinedAt ? new Date(u.joinedAt).toLocaleDateString() : "—"}
                  </td>
                  <td style={{ padding: "8px 6px" }}>
                    {u.role === "farmer" && (
                      <Link to={`/admin/farmers/${u.id}`} style={{ color: "var(--green-700, #2F6D3F)", fontWeight: 600, fontSize: 12.5, textDecoration: "none" }}>
                        View →
                      </Link>
                    )}
                    {u.role === "buyer" && (
                      <Link to={`/admin/buyers/${u.id}`} style={{ color: "var(--green-700, #2F6D3F)", fontWeight: 600, fontSize: 12.5, textDecoration: "none" }}>
                        View →
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function useMemoFilter(items, search, role) {
  return items.filter((u) => {
    const matchesSearch = !search ||
      (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(search.toLowerCase());
    const matchesRole = role === "all" || u.role === role;
    return matchesSearch && matchesRole;
  });
}