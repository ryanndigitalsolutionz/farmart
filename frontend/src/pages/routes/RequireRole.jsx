import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const API_BASE_URL = "http://127.0.0.1:5000";

const ROLE_HOME = {
  admin: "/admin/dashboard",
  farmer: "/farmer/dashboard",
  buyer: "/buyer/marketplace",
};

// Route guard: the account's role (and, for farmers, their admin-approval
// status) lives in the session on the backend, not in whatever button the
// user clicked on the welcome screen, so this is the only place that decides
// whether a role gets into a section.
export default function RequireRole({ allow }) {
  const [state, setState] = useState({ loading: true, role: null, approved: true });

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_BASE_URL}/api/profile/me`, { credentials: "include" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (cancelled) return;

        const role = data?.user?.role || null;
        const approved =
          role !== "farmer" || data?.profile?.verification_status === "verified";

        setState({ loading: false, role, approved });
      })
      .catch(() => {
        if (!cancelled) {
          setState({ loading: false, role: null, approved: true });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (state.loading) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#66766A" }}>
        Loading…
      </div>
    );
  }

  if (!state.role) {
    return <Navigate to="/login" replace />;
  }

  if (!allow.includes(state.role)) {
    return <Navigate to={ROLE_HOME[state.role] || "/welcome"} replace />;
  }

  // A farmer whose farm application hasn't been approved yet gets sent back
  // to the application/status page instead of the dashboard.
  if (state.role === "farmer" && !state.approved) {
    return <Navigate to="/farm-setup" replace />;
  }

  return <Outlet />;
}
