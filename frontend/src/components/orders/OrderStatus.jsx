import Badge from "../common/Badge";

const palette = {
  pending: "warning",
  confirmed: "info",
  processing: "info",
  shipped: "info",
  delivered: "success",
  cancelled: "danger",
  disputed: "danger",
};

export default function OrderStatus({ status }) {
  const variant = palette[status] || "info";
  return <Badge variant={variant}>{status}</Badge>;
}
