import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { Heart } from "lucide-react";

export default function Wishlist() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [moving, setMoving] = useState(false);

  const moveToCart = async (item) => {
    setMoving(true);
    await addItem({ listingId: item.listingId, title: item.title, price: item.price, quantity: 1, breed: item.breed, type: item.type, location: item.location, farmerName: item.farmerName, image: item.image || null });
    await removeItem(item.listingId);
    setMoving(false);
  };

  const fmt = (n) => "KES " + Number(n).toLocaleString();

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 20px" }}>
      <h1 style={{ fontFamily: "'IBM Plex Serif', serif", fontSize: 28, color: "var(--text-dark, #1E2A1F)", margin: "0 0 20px" }}>Wishlist</h1>

      {items.length === 0 ? (
        <div style={{ background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 12, padding: 40, textAlign: "center", boxShadow: "0 6px 20px rgba(29,78,42,0.05)" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginBottom: 10 }}><Heart size={36} color="var(--text-muted, #66766A)" /></div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-dark, #1E2A1F)", marginBottom: 6 }}>Your wishlist is empty</div>
          <p style={{ color: "var(--text-muted, #66766A)" }}>Save items you love for later.</p>
          <Link to="/buyer/marketplace" style={{ color: "var(--green-700, #2F6D3F)", fontWeight: 600, marginTop: 10, display: "inline-block" }}>Browse Marketplace</Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {items.map((item) => (
            <div key={item.listingId} style={{ background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 12, padding: 14, boxShadow: "0 6px 20px rgba(29,78,42,0.05)", display: "flex", flexDirection: "column", gap: 10 }}>
              <div onClick={() => navigate(`/livestock/${item.listingId}`)} style={{ cursor: "pointer", height: 150, background: "#EAF3E6", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted, #66766A)", fontSize: 12 }}>
                {item.image ? <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} /> : "No image"}
              </div>
              <div onClick={() => navigate(`/livestock/${item.listingId}`)} style={{ cursor: "pointer" }}>
                <div style={{ fontWeight: 700, color: "var(--text-dark, #1E2A1F)", fontSize: 14 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted, #66766A)" }}>{item.breed} • {item.location}</div>
              </div>
              <div style={{ fontWeight: 800, color: "var(--green-700, #2F6D3F)" }}>{fmt(item.price)}</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => moveToCart(item)} disabled={moving} style={{ flex: 1, padding: "8px 10px", background: "var(--green-700, #2F6D3F)", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", opacity: moving ? 0.7 : 1 }}>Move to cart</button>
                <button onClick={() => removeItem(item.listingId)} style={{ padding: "8px 10px", background: "#fff", color: "#DC2626", border: "1px solid #FECACA", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
