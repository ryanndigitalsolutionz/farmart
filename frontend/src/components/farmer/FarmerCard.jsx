
const card = {
  background: "#fff",
  borderRadius: 14,
  border: "1px solid var(--border, #DCE6D8)",
  padding: 16,
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const name = {
  fontFamily: "var(--font-display, 'Fraunces', serif)",
  fontSize: 15,
  fontWeight: 700,
  color: "var(--text-dark, #1E2A1F)",
  margin: 0,
};

const meta = {
  fontSize: 13,
  color: "var(--text-muted, #66766A)",
};

const footer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 4,
};

export default function FarmerCard({ farmer }) {
  return (
    <div style={card}>
      <p style={name}>{farmer.farmName || farmer.name}</p>
      <span style={meta}>{farmer.location || "—"}</span>
      <div style={footer}>
        <span style={{ fontSize: 12, color: "var(--text-muted, #66766A)" }}>
          {farmer.listingCount ?? 0} listings
        </span>
        {typeof farmer.rating === "number" && (
          <span style={{ fontSize: 13, fontWeight: 700, color: "#d69e2e" }}>
            ★ {farmer.rating.toFixed(1)}
          </span>
        )}
      </div>
    </div>
  );
}
