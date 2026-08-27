
const outer = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
};

const stars = {
  color: "#d69e2e",
  fontSize: 14,
  letterSpacing: 1,
};

const count = {
  fontSize: 12,
  color: "var(--text-muted, #66766A)",
};

export default function FarmerRating({ rating = 0, reviewCount = 0 }) {
  const full = Math.floor(rating || 0);
  const starsStr = "★".repeat(full) + "☆".repeat(5 - full);
  return (
    <span style={outer} aria-label={`${rating} out of 5`}>
      <span style={stars}>{starsStr}</span>
      {reviewCount > 0 && <span style={count}>({reviewCount})</span>}
    </span>
  );
}
