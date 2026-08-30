import { useState, useEffect, useRef } from "react";
import { useNotifications } from "../../context/NotificationContext";
import { Bell, CheckCheck, Trash2 } from "lucide-react";

const overlayStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 150,
  background: "rgba(0, 0, 0, 0.18)",
};

const dropdownStyle = {
  position: "absolute",
  top: "calc(100% + 8px)",
  right: 0,
  width: 360,
  maxWidth: "calc(100vw - 32px)",
  background: "var(--glass-bg-strong)",
  border: "1px solid var(--glass-border)",
  borderRadius: "var(--radius-md, 12px)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  boxShadow: "var(--shadow-glass)",
  zIndex: 151,
  overflow: "hidden",
};

const itemStyle = {
  display: "flex",
  gap: 10,
  padding: "12px 14px",
  borderBottom: "1px solid var(--color-border)",
  textDecoration: "none",
  color: "var(--color-text)",
  transition: "background 0.15s ease",
  cursor: "pointer",
  background: "transparent",
  border: "none",
  width: "100%",
  textAlign: "left",
};

const unreadStyle = {
  background: "rgba(39, 122, 68, 0.06)",
};

const emptyStyle = {
  padding: 32,
  textAlign: "center",
  color: "var(--color-text-muted)",
  fontSize: 14,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
};

const badgeStyle = {
  position: "absolute",
  top: -4,
  right: -4,
  background: "var(--color-danger)",
  color: "#fff",
  fontSize: 10,
  fontWeight: 700,
  borderRadius: 999,
  minWidth: 18,
  height: 18,
  padding: "0 4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const buttonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  borderRadius: "var(--radius-sm, 8px)",
  border: "1px solid transparent",
  background: "transparent",
  color: "var(--color-text)",
  cursor: "pointer",
  position: "relative",
  transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
};

const headerActionStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  fontSize: 12,
  fontWeight: 600,
  color: "var(--color-primary)",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: "4px 6px",
  borderRadius: "var(--radius-sm, 8px)",
  transition: "background 0.15s ease",
};

const markReadStyle = {
  background: "transparent",
  border: "none",
  color: "var(--color-primary)",
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 600,
  padding: "4px 6px",
  borderRadius: "var(--radius-sm, 8px)",
  flexShrink: 0,
  transition: "background 0.15s ease",
};

export default function NotificationMenu() {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markRead, markAllRead, clear } = useNotifications();
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const handleMarkRead = async (id, e) => {
    e.stopPropagation();
    await markRead(id);
  };

  const handleMarkAll = async () => {
    await markAllRead();
  };

  const handleClear = async () => {
    await clear();
    setOpen(false);
  };

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-flex" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Notifications"
        aria-expanded={open}
        style={buttonStyle}
      >
        <Bell size={18} />
        {unreadCount > 0 && <span style={badgeStyle}>{unreadCount}</span>}
      </button>
      {open && (
        <>
          <div style={overlayStyle} onClick={() => setOpen(false)} />
          <div style={dropdownStyle}>
            <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--color-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 700, fontSize: 15 }}>Notifications</span>
              <div style={{ display: "flex", gap: 4 }}>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={handleMarkAll}
                    style={headerActionStyle}
                  >
                    <CheckCheck size={14} />
                    Mark all read
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClear}
                    style={headerActionStyle}
                    aria-label="Clear notifications"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
            <div style={{ maxHeight: 320, overflowY: "auto" }}>
              {notifications.length === 0 ? (
                <div style={emptyStyle}>
                  <Bell size={24} style={{ color: "var(--color-text-muted)", opacity: 0.6 }} />
                  <div>No notifications yet</div>
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    style={{ ...itemStyle, ...(n.read ? {} : unreadStyle) }}
                    onClick={() => markRead(n.id)}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: n.read ? 400 : 600, lineHeight: 1.4 }}>{n.title || n.message}</div>
                      {n.message && n.title && (
                        <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 2 }}>{n.message}</div>
                      )}
                      <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 3 }}>{new Date(n.createdAt).toLocaleDateString()}</div>
                    </div>
                    {!n.read && (
                      <button
                        type="button"
                        onClick={(e) => handleMarkRead(n.id, e)}
                        style={markReadStyle}
                      >
                        Mark read
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
