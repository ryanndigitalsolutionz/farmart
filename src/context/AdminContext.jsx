import { createContext, useContext, useState, useCallback } from "react";
import { getPlatformMetrics, getPendingFarmers, getDisputes, getListingsForReview } from "../api/adminApi";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [metrics, setMetrics] = useState(null);
  const [pendingFarmerCount, setPendingFarmerCount] = useState(0);
  const [openDisputeCount, setOpenDisputeCount] = useState(0);
  const [flaggedListingCount, setFlaggedListingCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const refreshOverview = useCallback(async () => {
    setLoading(true);
    try {
      const [metricsRes, pendingFarmers, disputes, flaggedListings] = await Promise.all([
        getPlatformMetrics(),
        getPendingFarmers(),
        getDisputes({ status: "open" }),
        getListingsForReview({ flaggedOnly: true }),
      ]);
      setMetrics(metricsRes);
      setPendingFarmerCount(pendingFarmers.length);
      setOpenDisputeCount(disputes.length);
      setFlaggedListingCount(flaggedListings.length);
    } catch (err) {
      console.error("Failed to refresh admin overview:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    metrics,
    pendingFarmerCount,
    openDisputeCount,
    flaggedListingCount,
    loading,
    refreshOverview,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin() must be used inside <AdminProvider>");
  return ctx;
}