import { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import { getUsers, suspendUser } from "../../services/adminApi";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSuspend = async (user) => {
    if (busyId === user.id || user.role !== "farmer") {
      return;
    }

    const confirmed = window.confirm(
      `Suspend ${user.first_name || "this farmer"}'s account?`
    );

    if (!confirmed) {
      return;
    }

    setBusyId(user.id);
    setError("");

    try {
      await suspendUser(user.id);
      await loadUsers();
    } catch (err) {
      setError(err.message || "Failed to suspend farmer.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="Users"
        subtitle="All registered platform users"
      />

      {loading && (
        <p
          style={{
            color: "var(--text-muted, #66766A)",
            fontSize: 13,
          }}
        >
          Loading users...
        </p>
      )}

      {error && (
        <p
          style={{
            color: "#B2503E",
            fontSize: 13,
          }}
        >
          {error}
        </p>
      )}

      {!loading && !error && users.length === 0 && (
        <p
          style={{
            color: "var(--text-muted, #66766A)",
            fontSize: 13,
          }}
        >
          No users found.
        </p>
      )}

      {!loading && !error && users.length > 0 && (
        <div
          style={{
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 13.5,
            }}
          >
            <thead>
              <tr
                style={{
                  textAlign: "left",
                  borderBottom:
                    "1px solid var(--border, #DCE6D8)",
                }}
              >
                <th style={{ padding: "8px 6px" }}>
                  Name
                </th>

                <th style={{ padding: "8px 6px" }}>
                  Email
                </th>

                <th style={{ padding: "8px 6px" }}>
                  Role
                </th>

                <th style={{ padding: "8px 6px" }}>
                  Status
                </th>

                <th style={{ padding: "8px 6px" }}>
                  Joined
                </th>

                <th style={{ padding: "8px 6px" }}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => {
                const isFarmer = user.role === "farmer";
                const isSuspended = user.is_active === false;

                return (
                  <tr
                    key={user.id}
                    style={{
                      borderBottom: "1px solid #EEF2EC",
                    }}
                  >
                    <td style={{ padding: "8px 6px" }}>
                      {`${user.first_name || ""} ${
                        user.last_name || ""
                      }`.trim() || "—"}
                    </td>

                    <td style={{ padding: "8px 6px" }}>
                      {user.email || "—"}
                    </td>

                    <td
                      style={{
                        padding: "8px 6px",
                        textTransform: "capitalize",
                      }}
                    >
                      {user.role || "—"}
                    </td>

                    <td style={{ padding: "8px 6px" }}>
                      {isSuspended ? (
                        <span
                          style={{
                            color: "#B2503E",
                            fontWeight: 700,
                            fontSize: 12,
                          }}
                        >
                          Suspended
                        </span>
                      ) : (
                        <span
                          style={{
                            color:
                              "var(--green-700, #2F6D3F)",
                            fontWeight: 700,
                            fontSize: 12,
                          }}
                        >
                          Active
                        </span>
                      )}
                    </td>

                    <td style={{ padding: "8px 6px" }}>
                      {user.created_at
                        ? new Date(
                            user.created_at
                          ).toLocaleDateString()
                        : "—"}
                    </td>

                    <td style={{ padding: "8px 6px" }}>
                      {isFarmer && !isSuspended && (
                        <button
                          onClick={() => handleSuspend(user)}
                          disabled={busyId === user.id}
                          style={{
                            ...dangerOutlineBtn,
                            opacity:
                              busyId === user.id ? 0.6 : 1,
                            cursor:
                              busyId === user.id
                                ? "not-allowed"
                                : "pointer",
                          }}
                        >
                          {busyId === user.id
                            ? "Working..."
                            : "Suspend"}
                        </button>
                      )}

                      {isFarmer && isSuspended && (
                        <span
                          style={{
                            color:
                              "var(--text-muted, #66766A)",
                            fontSize: 12,
                          }}
                        >
                          Suspended
                        </span>
                      )}

                      {!isFarmer && (
                        <span
                          style={{
                            color:
                              "var(--text-muted, #66766A)",
                            fontSize: 12,
                          }}
                        >
                          —
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

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
