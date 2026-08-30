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
          {/* Desktop table */}
          <div className="hide-mobile" style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr", gap: 0, borderBottom: "1px solid var(--border, #DCE6D8)", padding: "8px 6px", fontWeight: 600, color: "var(--text-dark, #1E2A1F)" }}>
              <div>Name</div><div>Email</div><div>Role</div><div>Joined</div><div>Actions</div>
            </div>
            {filtered.map((u) => (
              <div key={u.id} style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr", gap: 0, borderBottom: "1px solid #EEF2EC", padding: "8px 6px", alignItems: "center", fontSize: 13.5 }}>
                <div>{u.name || "—"}</div>
                <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email}</div>
                <div style={{ textTransform: "capitalize" }}>{u.role}</div>
                <div>{u.joinedAt ? new Date(u.joinedAt).toLocaleDateString() : "—"}</div>
                <div>
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
                </div>
              </div>
            ))}
          </div>
          {/* Mobile cards */}
          <div className="show-mobile-only" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.length === 0 && (
              <p style={{ color: "var(--text-muted, #66766A)", padding: "14px 6px" }}>No users found.</p>
            )}
            {filtered.map((u) => (
              <div key={u.id} style={{ background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 10, padding: 14, display: "flex", flexDirection: "column", gap: 6, fontSize: 13.5 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, color: "var(--text-dark, #1E2A1F)" }}>{u.name || "—"}</span>
                  <span style={{ textTransform: "capitalize", background: "var(--green-100, #EAF3E6)", padding: "2px 8px", borderRadius: 8, fontSize: 12, fontWeight: 600 }}>{u.role}</span>
                </div>
                <div style={{ color: "var(--text-muted, #66766A)" }}>{u.email}</div>
                <div style={{ color: "var(--text-muted, #66766A)" }}>Joined: {u.joinedAt ? new Date(u.joinedAt).toLocaleDateString() : "—"}</div>
                <div>
                  {u.role === "farmer" && (
                    <Link to={`/admin/farmers/${u.id}`} style={{ color: "var(--green-700, #2F6D3F)", fontWeight: 600, fontSize: 12.5, textDecoration: "none" }}>View →</Link>
                  )}
                  {u.role === "buyer" && (
                    <Link to={`/admin/buyers/${u.id}`} style={{ color: "var(--green-700, #2F6D3F)", fontWeight: 600, fontSize: 12.5, textDecoration: "none" }}>View →</Link>
                  )}
                </div>
              </div>
            ))}
          </div>
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