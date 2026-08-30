import FarmerRating from "./FarmerRating";

const outer = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 13,
  color: "var(--text-muted, #66766A)",
};

const value = {
  fontWeight: 600,
  color: "var(--text-dark, #1E2A1F)",
};

export default function FarmerInfo({ farmer }) {
  if (!farmer) return null;
  return (
    <div style={outer}>
      {[
        ["Name", farmer.name],
        ["Farm", farmer.farmName],
        ["Location", farmer.location],
        ["Contact", farmer.contact],
        ["Email", farmer.email],
        ["Joined", farmer.joinedAt ? new Date(farmer.joinedAt).toLocaleDateString("en-KE") : null],
        ["Verified", farmer.isVerified ? "Yes" : "No"],
      ].map(([label, val]) => (
        <div key={label} style={row}>
          <span>{label}</span>
          <span style={value}>{val || "—"}</span>
        </div>
      ))}
      <FarmerRating rating={farmer.rating || 0} reviewCount={farmer.reviewCount || 0} />
    </div>
  );
}
