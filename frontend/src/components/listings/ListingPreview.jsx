
const card = {
  background: "#fff",
  borderRadius: 14,
  border: "1px solid var(--border, #DCE6D8)",
  padding: 18,
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const label = {
  fontSize: 12,
  color: "var(--text-muted, #66766A)",
  textTransform: "uppercase",
  letterSpacing: 0.5,
};

const value = {
  fontSize: 14,
  fontWeight: 600,
  color: "var(--text-dark, #1E2A1F)",
};

export default function ListingPreview({ listing = {} }) {
  return (
    <div style={card}>
      <h3 style={{ margin: 0, fontFamily: "var(--font-display, 'Fraunces', serif)", fontSize: 16 }}>Preview</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
        {[
          ["Title", listing.title],
          ["Type", listing.type],
          ["Breed", listing.breed],
          ["Price", listing.price ? `KES ${Number(listing.price).toLocaleString("en-KE")}` : null],
          ["Age", listing.age],
          ["Gender", listing.gender],
          ["Weight", listing.weight ? `${listing.weight} ${listing.weightUnit || "kg"}` : null],
          ["Location", listing.location],
          ["Description", listing.description],
        ].map(([k, v]) => (
          <div key={k}>
            <div style={label}>{k}</div>
            <div style={value}>{v || "—"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
