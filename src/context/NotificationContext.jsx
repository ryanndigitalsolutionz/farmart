/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { storage } from "../hooks/useLocalStorage";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => storage.get("notifications", []));

  useEffect(() => { storage.set("notifications", notifications); }, [notifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addNotification = useCallback(async (notification) => {
    const { api } = await import("../api");
    const updated = await api.addNotification(notification);
    setNotifications(updated);
    return updated;
  }, []);

  const markRead = useCallback(async (id) => {
    const { api } = await import("../api");
    const updated = await api.markNotificationRead(id);
    setNotifications(updated);
    return updated;
  }, []);

  const markAllRead = useCallback(async () => {
    const { api } = await import("../api");
    const updated = await api.markAllNotificationsRead();
    setNotifications(updated);
    return updated;
  }, []);

  const clear = useCallback(async () => {
    const { api } = await import("../api");
    const updated = await api.clearNotifications();
    setNotifications(updated);
    return updated;
  }, []);

  const value = { notifications, unreadCount, addNotification, markRead, markAllRead, clear };
  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
}
/* eslint-enable react-refresh/only-export-components */
