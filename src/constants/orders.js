export const ORDER_STATUSES = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  DISPUTED: "disputed",
};

export const PAYMENT_STATUSES = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
  REFUNDED: "refunded",
};

export const PAYMENT_METHODS = [
  { id: "mpesa", label: "M-Pesa", icon: "📱" },
  { id: "cash", label: "Cash on Delivery", icon: "💵" },
  { id: "bank", label: "Bank Transfer", icon: "🏦" },
];
