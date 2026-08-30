/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { storage } from "../hooks/useLocalStorage";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => storage.get("wishlist", []));

  useEffect(() => { storage.set("wishlist", items); }, [items]);

  const addItem = useCallback(async (item) => {
    const { api } = await import("../api");
    const updated = await api.addToWishlist(item);
    setItems(updated);
    return updated;
  }, []);

  const removeItem = useCallback(async (listingId) => {
    const { api } = await import("../api");
    const updated = await api.removeFromWishlist(listingId);
    setItems(updated);
    return updated;
  }, []);

  const isInWishlist = useCallback(async (listingId) => {
    const { api } = await import("../api");
    return api.isInWishlist(listingId);
  }, []);

  const value = { items, addItem, removeItem, isInWishlist, count: items.length };
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
/* eslint-enable react-refresh/only-export-components */
