import LivestockGallery from "./LivestockGallery";
import LivestockHealth from "./LivestockHealth";
import LivestockPrice from "./LivestockPrice";
import FarmerRating from "../farmer/FarmerRating";

const card = {
  background: "#fff",
  borderRadius: 14,
  border: "1px solid var(--border, #DCE6D8)",
  overflow: "hidden",
};

const body = {
  padding: 18,
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const title = {
  fontFamily: "var(--font-display, 'Fraunces', serif)",
  fontSize: 22,
  fontWeight: 700,
  color: "var(--text-dark, #1E2A1F)",
  margin: 0,
};

const meta = {
  fontSize: 14,
  color: "var(--text-muted, #66766A)",
  lineHeight: 1.7,
};

export default function LivestockDetails({ listing }) {
  if (!listing) return null;
  return (
    <div style={card}>
      <LivestockGallery images={listing.images} />
      <div style={body}>
        <h1 style={title}>{listing.title}</h1>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={meta}>{listing.location || "—"} • {listing.farmerName || ""}</span>
          <FarmerRating rating={listing.rating || 0} reviewCount={listing.reviewCount || 0} />
        </div>
        <LivestockPrice price={listing.price} large />
        <p style={meta}>{listing.description}</p>
        <LivestockHealth
          age={listing.age}
          gender={listing.gender}
          weight={listing.weight}
          weightUnit={listing.weightUnit}
          type={listing.type}
          breed={listing.breed}
        />
      </div>
    </div>
  );
}
