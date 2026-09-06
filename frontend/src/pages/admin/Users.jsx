import { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import { getUsers, verifyUser, suspendUser, reactivateUser } from "../../services/adminApi";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const loadUsers = () => {
    getUsers()
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleVerify = async (userId) => {
    setBusyId(userId);
    try {
      await verifyUser(userId);
      loadUsers();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const handleToggleActive = async (user) => {
    setBusyId(user.id);
    try {
      if (user.is_active) {
        await suspendUser(user.id);
      } else {
        await reactivateUser(user.id);
      }
      loadUsers();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  };

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
              <th style={{ padding: "8px 6px" }}>Status</th>
              <th style={{ padding: "8px 6px" }}>Joined</th>
              <th style={{ padding: "8px 6px" }}></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={{ borderBottom: "1px solid #EEF2EC" }}>
                <td style={{ padding: "8px 6px" }}>{u.first_name} {u.last_name}</td>
                <td style={{ padding: "8px 6px" }}>{u.email}</td>
                <td style={{ padding: "8px 6px", textTransform: "capitalize" }}>{u.role}</td>
                <td style={{ padding: "8px 6px" }}>
                  {!u.is_verified && (
                    <span style={{ color: "#B2503E", fontWeight: 700, fontSize: 12 }}>Unverified</span>
                  )}
                  {u.is_verified && !u.is_active && (
                    <span style={{ color: "#B2503E", fontWeight: 700, fontSize: 12 }}>Suspended</span>
                  )}
                  {u.is_verified && u.is_active && (
                    <span style={{ color: "var(--green-700, #2F6D3F)", fontWeight: 700, fontSize: 12 }}>Active</span>
                  )}
                </td>
                <td style={{ padding: "8px 6px" }}>{new Date(u.created_at).toLocaleDateString()}</td>
                <td style={{ padding: "8px 6px", display: "flex", gap: 6 }}>
                  {!u.is_verified && (
                    <button
                      onClick={() => handleVerify(u.id)}
                      disabled={busyId === u.id}
                      style={verifyBtn}
                    >
                      {busyId === u.id ? "Working…" : "Verify"}
                    </button>
                  )}
                  <button
                    onClick={() => handleToggleActive(u)}
                    disabled={busyId === u.id}
                    style={u.is_active ? dangerOutlineBtn : primaryBtn}
                  >
                    {busyId === u.id ? "Working…" : u.is_active ? "Suspend" : "Reactivate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const primaryBtn = {
  background: "var(--green-700, #2F6D3F)",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "5px 10px",
  fontSize: 11.5,
  fontWeight: 700,
  cursor: "pointer",
};

const verifyBtn = {
  ...primaryBtn,
  background: "#fff",
  color: "var(--green-700, #2F6D3F)",
  border: "1.4px solid var(--green-300, #A8D0A0)",
};

const dangerOutlineBtn = {
  background: "#fff",
  color: "#B2503E",
  border: "1.4px solid #F0C9C1",
  borderRadius: 6,
  padding: "5px 10px",
  fontSize: 11.5,
  fontWeight: 700,
  cursor: "pointer",
};
