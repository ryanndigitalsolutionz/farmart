import { Trash2 } from "lucide-react";

const row = {
  display: "flex",
  gap: 14,
  padding: "14px 0",
  borderBottom: "1px solid var(--border, #DCE6D8)",
  alignItems: "center",
  flexWrap: "wrap",
};

const image = {
  width: 72,
  height: 72,
  borderRadius: 12,
  background: "var(--green-100, #EAF3E6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 28,
  flex: "0 0 auto",
};

const details = {
  flex: 1,
  minWidth: 0,
};

const title = {
  fontFamily: "var(--font-display, 'Fraunces', serif)",
  fontSize: 14,
  fontWeight: 600,
  color: "var(--text-dark, #1E2A1F)",
  margin: 0,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const price = {
  fontSize: 13,
  color: "var(--text-muted, #66766A)",
  marginTop: 4,
};

const controls = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginTop: 10,
};

const qtyBtn = {
  width: 40,
  height: 40,
  borderRadius: 8,
  border: "1px solid var(--border, #DCE6D8)",
  background: "#fff",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: 18,
  color: "var(--text-dark, #1E2A1F)",
};

const qtyText = {
  minWidth: 28,
  textAlign: "center",
  fontSize: 14,
  fontWeight: 600,
};

const removeBtn = {
  background: "transparent",
  border: "none",
  color: "#c53030",
  fontSize: 13,
  cursor: "pointer",
  fontWeight: 600,
  marginTop: 8,
  padding: 0,
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
};

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const unit = typeof item.price === "number" ? item.price : Number(item.price || 0);
  return (
    <div style={row}>
      <div style={image} aria-hidden="true">🐄</div>
      <div style={details}>
        <p style={title}>{item.title}</p>
        <p style={price}>KES {unit.toLocaleString("en-KE")}</p>
        <div style={controls}>
          <button
            type="button"
            style={qtyBtn}
            onClick={() => onUpdateQuantity?.(item.listingId, Math.max(1, (item.quantity || 1) - 1))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span style={qtyText}>{item.quantity || 1}</span>
          <button
            type="button"
            style={qtyBtn}
            onClick={() => onUpdateQuantity?.(item.listingId, (item.quantity || 1) + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button type="button" style={removeBtn} onClick={() => onRemove?.(item.listingId)}>
          <Trash2 size={14} /> Remove
        </button>
      </div>
      <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-dark, #1E2A1F)", flex: "0 0 auto", marginTop: 4 }}>
        KES {(unit * (item.quantity || 1)).toLocaleString("en-KE")}
      </div>
    </div>
  );
}
