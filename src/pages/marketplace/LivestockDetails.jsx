import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { api } from "../../api";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function LivestockDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const { items: wishlistItems, addItem: addWishlist, removeItem: removeWishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await api.getListing(id);
      setListing(data);
      if (data) {
        const all = await api.getListings({ status: "active" });
        setRelated(all.filter((l) => l.type === data.type && l.id !== data.id).slice(0, 4));
      }
      setLoading(false);
    })();
  }, [id]);

  const wishlisted = listing ? wishlistItems.some((w) => w.listingId === listing.id) : false;

  const toggleWishlist = async () => {
    if (!listing) return;
    if (wishlisted) await removeWishlist(listing.id);
    else await addWishlist({ listingId: listing.id, title: listing.title, price: listing.price, breed: listing.breed, type: listing.type, location: listing.location, farmerName: listing.farmerName, image: listing.images?.[0] || null });
  };

  const handleAddToCart = async () => {
    if (!listing) return;
    await addItem({ listingId: listing.id, title: listing.title, price: listing.price, quantity: qty, breed: listing.breed, type: listing.type, location: listing.location, farmerName: listing.farmerName, image: listing.images?.[0] || null });
    navigate("/buyer/cart");
  };

  const fmt = (n) => "KES " + Number(n).toLocaleString();

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "var(--text-muted, #66766A)" }}>Loading...</div>;
  if (!listing) return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 40, textAlign: "center" }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>😕</div>
      <h2 style={{ fontFamily: "'IBM Plex Serif', serif", color: "var(--text-dark, #1E2A1F)" }}>Listing not found</h2>
      <p style={{ color: "var(--text-muted, #66766A)" }}>This listing may be unavailable or removed.</p>
      <Link to="/buyer/marketplace" style={{ color: "var(--green-700, #2F6D3F)", fontWeight: 600 }}>Back to marketplace</Link>
    </div>
  );

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px" }}>
      <button onClick={() => navigate(-1)} style={{ background: "none", border: "none", color: "var(--green-700, #2F6D3F)", fontWeight: 600, cursor: "pointer", marginBottom: 16, padding: 0 }}>← Back</button>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 24, alignItems: "start" }}>
        <div style={{ background: "#EAF3E6", borderRadius: 12, minHeight: 260, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted, #66766A)" }}>
          {listing.images?.[0] ? <img src={listing.images[0]} alt={listing.title} style={{ width: "100%", height: "auto", aspectRatio: "4/3", objectFit: "cover", borderRadius: 12 }} /> : "No image available"}
        </div>
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 10 }}>
              <h1 style={{ fontFamily: "'IBM Plex Serif', serif", fontSize: 24, color: "var(--text-dark, #1E2A1F)", margin: 0, flex: 1 }}>{listing.title}</h1>
              <button onClick={toggleWishlist} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: wishlisted ? "#DC2626" : "var(--text-muted, #66766A)", flexShrink: 0 }}>{wishlisted ? "♥" : "♡"}</button>
            </div>
            <div style={{ color: "var(--text-muted, #66766A)", fontSize: 14 }}>{listing.farmerName} • {listing.location}</div>
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "var(--green-700, #2F6D3F)", marginBottom: 14 }}>{fmt(listing.price)}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 120px), 1fr))", gap: 10, marginBottom: 18 }}>
            {[["Breed", listing.breed], ["Type", listing.type], ["Age", listing.age], ["Gender", listing.gender], ["Weight", `${listing.weight} ${listing.weightUnit}`], ["Available", listing.quantity > 0 ? `${listing.quantity} unit(s)` : "Unavailable"]].map(([k, v]) => (
              <div key={k} style={{ background: "#f7faf7", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border, #DCE6D8)" }}>
                <div style={{ fontSize: 11, color: "var(--text-muted, #66766A)" }}>{k}</div>
                <div style={{ fontWeight: 600, color: "var(--text-dark, #1E2A1F)", fontSize: 14, textTransform: "capitalize" }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, color: "var(--text-muted, #66766A)" }}>Quantity</label>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} style={{ width: 40, height: 40, borderRadius: 8, border: "1px solid var(--border, #DCE6D8)", background: "#fff", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>-</button>
              <span style={{ fontWeight: 700, minWidth: 28, textAlign: "center" }}>{qty}</span>
              <button onClick={() => setQty((q) => Math.min(listing.quantity, q + 1))} style={{ width: 40, height: 40, borderRadius: 8, border: "1px solid var(--border, #DCE6D8)", background: "#fff", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>+</button>
            </div>
          </div>
          <button onClick={handleAddToCart} disabled={listing.quantity <= 0} style={{ width: "100%", padding: "14px 16px", background: "var(--green-700, #2F6D3F)", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", minHeight: 44, opacity: listing.quantity <= 0 ? 0.5 : 1 }}>
            {listing.quantity > 0 ? "Add to Cart" : "Unavailable"}
          </button>
        </div>
      </div>

      <div style={{ marginTop: 28 }}>
        <h2 style={{ fontFamily: "'IBM Plex Serif', serif", fontSize: 18, color: "var(--text-dark, #1E2A1F)", marginBottom: 14 }}>Description</h2>
        <p style={{ color: "var(--text-muted, #66766A)", lineHeight: 1.6 }}>{listing.description}</p>
      </div>

      {related.length > 0 && (
        <div style={{ marginTop: 28 }}>
          <h2 style={{ fontFamily: "'IBM Plex Serif', serif", fontSize: 18, color: "var(--text-dark, #1E2A1F)", marginBottom: 14 }}>Related Listings</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
            {related.map((r) => (
              <Link key={r.id} to={`/livestock/${r.id}`} style={{ textDecoration: "none", color: "inherit", background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 10, padding: 14, display: "block" }}>
                <div style={{ fontWeight: 700, color: "var(--text-dark, #1E2A1F)" }}>{r.title}</div>
                <div style={{ color: "var(--text-muted, #66766A)", fontSize: 13 }}>{r.breed}</div>
                <div style={{ fontWeight: 700, color: "var(--green-700, #2F6D3F)", marginTop: 6 }}>{fmt(r.price)}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
