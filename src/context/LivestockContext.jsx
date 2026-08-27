/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { storage } from "../hooks/useLocalStorage";

const LivestockContext = createContext(null);

export function LivestockProvider({ children }) {
  const [listings, setListings] = useState(() => storage.get("listings", []));
  const [loading, setLoading] = useState(false);

  useEffect(() => { storage.set("listings", listings); }, [listings]);

  const fetchListings = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const { api } = await import("../api");
      const data = await api.getListings(filters);
      setListings(data);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = { listings, loading, fetchListings };
  return <LivestockContext.Provider value={value}>{children}</LivestockContext.Provider>;
}

export function useLivestock() {
  const ctx = useContext(LivestockContext);
  if (!ctx) throw new Error("useLivestock must be used within LivestockProvider");
  return ctx;
}
/* eslint-enable react-refresh/only-export-components */
