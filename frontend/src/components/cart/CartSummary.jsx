import Button from "../../common/Button";

const card = {
  background: "#fff",
  borderRadius: 14,
  border: "1px solid var(--border, #DCE6D8)",
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 12,
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
  color: "var(--text-dark, #1E2A1F)",
  paddingTop: 12,
  borderTop: "1px solid var(--border, #DCE6D8)",
};

export default function CartSummary({
  subtotal = 0,
  deliveryFee = 0,
  total = 0,
  onCheckout,
}) {
  return (
    <div style={card}>
      <h3 style={{ margin: 0, fontFamily: "var(--font-display, 'Fraunces', serif)", fontSize: 16 }}>
        Order Summary
      </h3>
      <div style={row}>
        <span style={rowMuted}>Subtotal</span>
        <span>KES {Number(subtotal || 0).toLocaleString("en-KE")}</span>
      </div>
      <div style={row}>
        <span style={rowMuted}>Delivery fee</span>
        <span>KES {Number(deliveryFee || 0).toLocaleString("en-KE")}</span>
      </div>
      <div style={totalRow}>
        <span>Total</span>
        <span>KES {Number(total || 0).toLocaleString("en-KE")}</span>
      </div>
      <Button fullWidth onClick={onCheckout}>
        Proceed to Checkout
      </Button>
    </div>
  );
}
