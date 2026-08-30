/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { storage } from "../hooks/useLocalStorage";

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => storage.get("orders", []));

  useEffect(() => { storage.set("orders", orders); }, [orders]);

  const getOrders = useCallback(async (filters = {}) => {
    const { api } = await import("../api");
    return api.getOrders(filters);
  }, []);

  const createOrder = useCallback(async (data) => {
    const { api } = await import("../api");
    const order = await api.createOrder(data);
    setOrders((prev) => [order, ...prev]);
    return order;
  }, []);

  const updateStatus = useCallback(async (id, status, note) => {
    const { api } = await import("../api");
    const order = await api.updateOrderStatus(id, status, note);
    setOrders((prev) => prev.map((o) => (o.id === id ? order : o)));
    return order;
  }, []);

  const cancel = useCallback(async (id) => {
    const { api } = await import("../api");
    const order = await api.cancelOrder(id);
    setOrders((prev) => prev.map((o) => (o.id === id ? order : o)));
    return order;
  }, []);

  const value = { orders, getOrders, createOrder, updateStatus, cancel };
  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
}
/* eslint-enable react-refresh/only-export-components */
