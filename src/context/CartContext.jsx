/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { storage } from "../hooks/useLocalStorage";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => storage.get("cart", []));

  useEffect(() => { storage.set("cart", items); }, [items]);

  const addItem = useCallback(async (item) => {
    const { api } = await import("../api");
    const updated = await api.addToCart(item);
    setItems(updated);
    return updated;
  }, []);

  const removeItem = useCallback(async (listingId) => {
    const { api } = await import("../api");
    const updated = await api.removeFromCart(listingId);
    setItems(updated);
    return updated;
  }, []);

  const updateQuantity = useCallback(async (listingId, quantity) => {
    const { api } = await import("../api");
    const updated = await api.updateCartQuantity(listingId, quantity);
    setItems(updated);
    return updated;
  }, []);

  const clear = useCallback(async () => {
    const { api } = await import("../api");
    const updated = await api.clearCart();
    setItems(updated);
    return updated;
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = { items, addItem, removeItem, updateQuantity, clear, total, count };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
/* eslint-enable react-refresh/only-export-components */
