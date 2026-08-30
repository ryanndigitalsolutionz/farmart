import { Link } from "react-router-dom";
import LivestockPrice from "./LivestockPrice";
import FarmerRating from "../farmer/FarmerRating";

const card = {
  background: "#fff",
  borderRadius: 14,
  border: "1px solid var(--border, #DCE6D8)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.15s ease, box-shadow 0.15s ease",
};

const image = {
  width: "100%",
  height: 180,
  background: "var(--green-100, #EAF3E6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 52,
};

const body = {
  padding: 14,
  display: "flex",
  flexDirection: "column",
  gap: 6,
  flex: 1,
};

const title = {
  fontFamily: "var(--font-display, 'Fraunces', serif)",
  fontSize: 14.5,
  fontWeight: 600,
  color: "var(--text-dark, #1E2A1F)",
  margin: 0,
};

const meta = {
  fontSize: 13,
  color: "var(--text-muted, #66766A)",
};

const actions = {
  display: "flex",
  gap: 8,
  marginTop: 6,
};

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

export default function LivestockCard({ listing, onAddToCart, onToggleWishlist, isWishlisted }) {
  return (
    <div style={card}>
      <Link to={`/marketplace/${listing.id}`} style={{ ...linkStyle, display: "block" }}>
        <div style={image} aria-hidden="true">
          {listing.images?.[0] ? (
            <img src={listing.images[0]} alt={listing.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            "🐄"
          )}
        </div>
      </Link>
      <div style={body}>
        <Link to={`/marketplace/${listing.id}`} style={linkStyle}>
          <h3 style={title}>{listing.title}</h3>
        </Link>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={meta}>{listing.location || "—"}</span>
          {typeof listing.rating === "number" && (
            <FarmerRating rating={listing.rating} reviewCount={listing.reviewCount} />
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
          <LivestockPrice price={listing.price} />
          <div style={actions}>
            <button
              type="button"
              onClick={() => onAddToCart?.(listing)}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid var(--green-700, #2F6D3F)",
                background: "var(--green-700, #2F6D3F)",
                color: "#fff",
                fontSize: 12.5,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Add to cart
            </button>
            <button
              type="button"
              onClick={() => onToggleWishlist?.(listing)}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                border: "1px solid var(--border, #DCE6D8)",
                background: isWishlisted ? "#fff5f5" : "#fff",
                cursor: "pointer",
                fontSize: 16,
              }}
            >
              {isWishlisted ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
