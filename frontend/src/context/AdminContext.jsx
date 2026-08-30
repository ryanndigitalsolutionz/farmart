/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from "react";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [metrics, setMetrics] = useState(null);
  const [pendingFarmerCount, setPendingFarmerCount] = useState(0);
  const [openDisputeCount, setOpenDisputeCount] = useState(0);
  const [flaggedListingCount, setFlaggedListingCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshTick, setRefreshTick] = useState(0);

  const refreshOverview = useCallback(async () => {
    setLoading(true);
    try {
      const { api } = await import("../api");
      const [m, pendingFarmers, disputes, flaggedListings] = await Promise.all([
        api.getMetrics(),
        api.getPendingFarmers(),
        api.getDisputes({ status: "open" }),
        api.getListings({ flaggedOnly: true }),
      ]);
      setMetrics(m);
      setPendingFarmerCount(pendingFarmers.length);
      setOpenDisputeCount(disputes.length);
      setFlaggedListingCount(flaggedListings.length);
    } catch (err) {
      console.error("Failed to refresh admin overview:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AdminContext.Provider
      value={{
        metrics,
        pendingFarmerCount,
        openDisputeCount,
        flaggedListingCount,
        loading,
        refreshOverview,
        refreshTick,
        refresh: () => setRefreshTick((t) => t + 1),
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
/* eslint-enable react-refresh/only-export-components */
