
import { useEffect } from "react";

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
  zIndex: 1000,
};

const panel = {
  background: "rgba(255, 255, 255, 0.92)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-lg, 16px)",
  width: "100%",
  maxWidth: 560,
  maxHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  boxShadow: "var(--shadow-glass)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
};

const header = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px 20px",
  borderBottom: "1px solid var(--color-border)",
};

const titleStyle = {
  margin: 0,
  fontFamily: "var(--font-display, 'Fraunces', serif)",
  fontSize: 18,
  fontWeight: 600,
  color: "var(--color-text)",
};

const closeButton = {
  background: "transparent",
  border: "none",
  fontSize: 18,
  color: "var(--color-text-muted)",
  cursor: "pointer",
  padding: "4px 8px",
  borderRadius: "var(--radius-sm, 8px)",
  transition: "background 0.15s ease, color 0.15s ease",
};

const body = {
  padding: 20,
  overflowY: "auto",
};

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={overlay}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div style={panel}>
        <div style={header}>
          <h2 style={titleStyle}>{title}</h2>
          <button
            type="button"
            aria-label="Close"
            style={closeButton}
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div style={body}>{children}</div>
      </div>
    </div>
  );
}
