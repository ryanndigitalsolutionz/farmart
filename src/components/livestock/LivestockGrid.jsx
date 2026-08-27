
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
  gap: 12,
};

export default function LivestockGrid({ listings = [], renderCard }) {
  if (!listings.length) {
    return (
      <div style={{ color: "var(--text-muted, #66766A)", fontSize: 14 }}>
        No listings found.
      </div>
    );
  }
  return (
    <div style={grid}>
      {listings.map((item) => (
        <div key={item.id}>{renderCard?.(item) || null}</div>
      ))}
    </div>
  );
}
