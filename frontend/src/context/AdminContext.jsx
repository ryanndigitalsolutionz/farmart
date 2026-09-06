import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getCurrentUser, getOverview } from "../services/adminApi";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const refreshOverview = useCallback(() => {
    setLoading(true);
    return getOverview()
      .then((data) => {
        setOverview(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refreshOverview();
  }, [refreshOverview]);

  useEffect(() => {
    getCurrentUser()
      .then((data) => setCurrentUser(data.user))
      .catch(() => setCurrentUser(null));
  }, []);

  return (
    <AdminContext.Provider
      value={{ overview, loading, error, refreshOverview, currentUser }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }

  return context;
}
