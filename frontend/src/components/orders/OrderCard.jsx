import OrderStatus from "./OrderStatus";

const card = {
  background: "#fff",
  borderRadius: 14,
  border: "1px solid var(--border, #DCE6D8)",
  padding: 18,
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 12,
};

const orderNumber = {
  fontFamily: "var(--font-display, 'Fraunces', serif)",
  fontSize: 15,
  fontWeight: 700,
  color: "var(--text-dark, #1E2A1F)",
  margin: 0,
};

const meta = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  marginTop: 4,
};

const metaRow = {
  fontSize: 13,
  color: "var(--text-muted, #66766A)",
};

const total = {
  fontSize: 16,
  fontWeight: 700,
  color: "var(--green-700, #2F6D3F)",
};

export default function OrderCard({ order }) {
  const date = order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-KE") : "—";
  return (
    <div style={card}>
      <div style={header}>
        <div>
          <p style={orderNumber}>{order.orderNumber || order.id}</p>
          <div style={meta}>
            <span style={metaRow}>Placed on {date}</span>
            <span style={metaRow}>{order.items?.length || 0} item{(order.items?.length || 0) === 1 ? "" : "s"}</span>
          </div>
        </div>
        <OrderStatus status={order.status} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={total}>KES {Number(order.total || 0).toLocaleString("en-KE")}</span>
      </div>
    </div>
  );
}
