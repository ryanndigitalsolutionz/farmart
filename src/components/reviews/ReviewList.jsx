import ReviewCard from "./ReviewCard";
import Button from "../common/Button";

const outer = {
  display: "flex",
  flexDirection: "column",
  gap: 14,
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const title = {
  margin: 0,
  fontFamily: "var(--font-display, 'Fraunces', serif)",
  fontSize: 18,
  fontWeight: 600,
  color: "var(--text-dark, #1E2A1F)",
};

export default function ReviewList({ reviews = [], onAddReview }) {
  return (
    <div style={outer}>
      <div style={header}>
        <h2 style={title}>Reviews ({reviews.length})</h2>
        {typeof onAddReview === "function" && (
          <Button variant="primary" onClick={onAddReview}>
            Add review
          </Button>
        )}
      </div>
      {!reviews.length ? (
        <p style={{ color: "var(--text-muted, #66766A)", fontSize: 14 }}>
          No reviews yet. Be the first to review this listing.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}
