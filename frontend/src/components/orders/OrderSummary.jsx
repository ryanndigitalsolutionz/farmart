
const card = {
  background: "#fff",
  borderRadius: 14,
  border: "1px solid var(--border, #DCE6D8)",
  padding: 18,
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 14,
  color: "var(--text-dark, #1E2A1F)",
};

const rowMuted = {
  color: "var(--text-muted, #66766A)",
};

const totalRow = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 16,
  fontWeight: 700,
  paddingTop: 12,
  borderTop: "1px solid var(--border, #DCE6D8)",
};

export default function OrderSummary({
  subtotal = 0,
  deliveryFee = 0,
  total = 0,
  paymentMethod,
  items = [],
}) {
  return (
    <div style={card}>
      <h3 style={{ margin: 0, fontFamily: "var(--font-display, 'Fraunces', serif)", fontSize: 16 }}>
        Order Summary
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.slice(0, 3).map((it, idx) => (
          <div key={idx} style={row}>
            <span style={{ ...rowMuted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>
              {it.title} x{it.quantity || 1}
            </span>
            <span>KES {Number(it.price || 0).toLocaleString("en-KE")}</span>
          </div>
        ))}
        {items.length > 3 && (
          <div style={{ fontSize: 12, color: "var(--text-muted, #66766A)" }}>
            +{items.length - 3} more items
          </div>
        )}
      </div>
      <div style={row}>
        <span style={rowMuted}>Subtotal</span>
        <span>KES {Number(subtotal || 0).toLocaleString("en-KE")}</span>
      </div>
      <div style={row}>
        <span style={rowMuted}>Delivery fee</span>
        <span>KES {Number(deliveryFee || 0).toLocaleString("en-KE")}</span>
      </div>
      {paymentMethod && (
        <div style={row}>
          <span style={rowMuted}>Payment method</span>
          <span style={{ textTransform: "capitalize" }}>{paymentMethod}</span>
        </div>
      )}
      <div style={totalRow}>
        <span>Total</span>
        <span>KES {Number(total || 0).toLocaleString("en-KE")}</span>
      </div>
    </div>
  );
}
