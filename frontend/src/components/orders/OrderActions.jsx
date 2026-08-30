import Button from "../common/Button";

const outer = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

export default function OrderActions({ order, onCancel, onReorder, onReview }) {
  const isPending = order?.status === "pending" || order?.status === "confirmed";
  const isDelivered = order?.status === "delivered";
  return (
    <div style={outer}>
      {isPending && (
        <Button variant="danger" onClick={() => onCancel?.(order?.id)}>
          Cancel order
        </Button>
      )}
      {isDelivered && (
        <Button variant="secondary" onClick={() => onReview?.(order)}>
          Leave a review
        </Button>
      )}
      <Button variant="secondary" onClick={() => onReorder?.(order)}>
        Reorder
      </Button>
    </div>
  );
}
