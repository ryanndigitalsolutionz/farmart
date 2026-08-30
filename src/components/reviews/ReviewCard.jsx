
const card = {
  background: "#fff",
  borderRadius: 14,
  border: "1px solid var(--border, #DCE6D8)",
  padding: 16,
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const name = {
  fontWeight: 700,
  fontSize: 14,
  color: "var(--text-dark, #1E2A1F)",
};

const date = {
  fontSize: 12,
  color: "var(--text-muted, #66766A)",
};

const stars = {
  color: "#d69e2e",
  fontSize: 14,
  letterSpacing: 2,
};

const comment = {
  fontSize: 13.5,
  color: "var(--text-dark, #1E2A1F)",
  lineHeight: 1.6,
  margin: 0,
};

export default function ReviewCard({ review }) {
  const dateLabel = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString("en-KE")
    : "";
  const starsStr = "★".repeat(review.rating || 0) + "☆".repeat(5 - (review.rating || 0));
  return (
    <div style={card}>
      <div style={header}>
        <span style={name}>{review.buyerName || "Anonymous"}</span>
        <span style={date}>{dateLabel}</span>
      </div>
      <span aria-label={`${review.rating || 0} out of 5`} style={stars}>
        {starsStr}
      </span>
      <p style={comment}>{review.comment}</p>
    </div>
  );
}
