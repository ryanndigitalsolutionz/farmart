import FarmerRating from "./FarmerRating";

const card = {
  background: "#fff",
  borderRadius: 14,
  border: "1px solid var(--border, #DCE6D8)",
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const name = {
  fontFamily: "var(--font-display, 'Fraunces', serif)",
  fontSize: 18,
  fontWeight: 700,
  color: "var(--text-dark, #1E2A1F)",
};

const text = {
  fontSize: 14,
  color: "var(--text-dark, #1E2A1F)",
  lineHeight: 1.6,
};

export default function FarmerProfile({ farmer }) {
  if (!farmer) return null;
  return (
    <div style={card}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div>
          <h2 style={name}>{farmer.farmName || farmer.name}</h2>
          <p style={{ fontSize: 13, color: "var(--text-muted, #66766A)", marginTop: 4 }}>{farmer.location}</p>
        </div>
        <FarmerRating rating={farmer.rating || 0} reviewCount={farmer.reviewCount || 0} />
      </div>
      {farmer.description && <p style={text}>{farmer.description}</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {farmer.contact && (
          <div style={{ fontSize: 13, color: "var(--text-muted, #66766A)" }}>📞 {farmer.contact}</div>
        )}
        {farmer.email && (
          <div style={{ fontSize: 13, color: "var(--text-muted, #66766A)" }}>✉️ {farmer.email}</div>
        )}
      </div>
    </div>
  );
}
