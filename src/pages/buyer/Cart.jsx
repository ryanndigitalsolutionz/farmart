import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { ShoppingCart, ArrowRight } from "lucide-react";

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clear } = useCart();
  const navigate = useNavigate();

  const deliveryFee = items.length > 0 ? 2000 : 0;
  const grandTotal = total + deliveryFee;

  const fmt = (n) => "KES " + Number(n).toLocaleString();

  const handleRemove = async (listingId) => {
    await removeItem(listingId);
  };

  const handleQty = async (listingId, qty) => {
    await updateQuantity(listingId, qty);
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px" }}>
      <h1 style={{ fontFamily: "'IBM Plex Serif', serif", fontSize: 28, color: "var(--text-dark, #1E2A1F)", margin: "0 0 20px" }}>Shopping Cart</h1>
      {items.length === 0 ? (
        <div style={{ background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 12, padding: 40, textAlign: "center", boxShadow: "0 6px 20px rgba(29,78,42,0.05)" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginBottom: 10 }}><ShoppingCart size={36} color="var(--text-muted, #66766A)" /></div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-dark, #1E2A1F)", marginBottom: 6 }}>Your cart is empty</div>
          <p style={{ color: "var(--text-muted, #66766A)", marginBottom: 16 }}>Looks like you haven't added anything yet.</p>
          <Link to="/buyer/marketplace" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 8, background: "var(--color-cta-bg)", color: "var(--color-cta-text)", textDecoration: "none", fontWeight: 600 }}>Browse Marketplace <ArrowRight size={16} /></Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 20, alignItems: "start" }}>
          {window.innerWidth >= 640 && (
            <div style={{ background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 12, padding: 18, boxShadow: "0 6px 20px rgba(29,78,42,0.05)", position: "sticky", top: 84 }}>
              <h3 style={{ fontFamily: "'IBM Plex Serif', serif", margin: "0 0 12px", color: "var(--text-dark, #1E2A1F)" }}>Summary</h3>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14, color: "var(--text-muted, #66766A)" }}><span>Subtotal</span><span>{fmt(total)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 14, color: "var(--text-muted, #66766A)" }}><span>Delivery fee</span><span>{fmt(deliveryFee)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 16, color: "var(--text-dark, #1E2A1F)", borderTop: "1px solid var(--border, #DCE6D8)", paddingTop: 10, marginBottom: 16 }}><span>Total</span><span>{fmt(grandTotal)}</span></div>
              <button onClick={() => navigate("/buyer/checkout")} style={{ width: "100%", padding: "12px 16px", background: "var(--green-700, #2F6D3F)", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 10 }}>Proceed to Checkout</button>
              <button onClick={() => { clear(); navigate("/buyer/marketplace"); }} style={{ width: "100%", padding: "10px 16px", background: "#fff", color: "var(--text-muted, #66766A)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Clear Cart</button>
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {items.map((item) => (
              <div key={item.listingId} style={{ background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 12, padding: 14, boxShadow: "0 6px 20px rgba(29,78,42,0.05)", display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ width: 80, height: 80, borderRadius: 10, background: "#EAF3E6", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted, #66766A)", fontSize: 12, flexShrink: 0 }}>
                  {item.image ? <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10 }} /> : "No img"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: "var(--text-dark, #1E2A1F)", fontSize: 14 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted, #66766A)" }}>{item.farmerName} • {item.location}</div>
                  <div style={{ fontWeight: 700, color: "var(--green-700, #2F6D3F)", marginTop: 4 }}>{fmt(item.price)}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button onClick={() => handleQty(item.listingId, item.quantity - 1)} style={{ width: 40, height: 40, borderRadius: 8, border: "1px solid var(--border, #DCE6D8)", background: "#fff", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>-</button>
                  <span style={{ fontWeight: 700, minWidth: 24, textAlign: "center" }}>{item.quantity}</span>
                  <button onClick={() => handleQty(item.listingId, item.quantity + 1)} style={{ width: 40, height: 40, borderRadius: 8, border: "1px solid var(--border, #DCE6D8)", background: "#fff", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>+</button>
                </div>
                <div style={{ fontWeight: 700, color: "var(--text-dark, #1E2A1F)", minWidth: 80, textAlign: "right" }}>{fmt(item.price * item.quantity)}</div>
                <button onClick={() => handleRemove(item.listingId)} style={{ background: "none", border: "none", color: "#DC2626", cursor: "pointer", fontSize: 18, width: 36, height: 36, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>×</button>
              </div>
            ))}
          </div>
          {window.innerWidth < 640 && (
            <div style={{ background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 12, padding: 18, boxShadow: "0 6px 20px rgba(29,78,42,0.05)", position: "sticky", bottom: 80 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14, color: "var(--text-muted, #66766A)" }}><span>Subtotal</span><span>{fmt(total)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 14, color: "var(--text-muted, #66766A)" }}><span>Delivery fee</span><span>{fmt(deliveryFee)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 16, color: "var(--text-dark, #1E2A1F)", borderTop: "1px solid var(--border, #DCE6D8)", paddingTop: 10, marginBottom: 16 }}><span>Total</span><span>{fmt(grandTotal)}</span></div>
              <button onClick={() => navigate("/buyer/checkout")} style={{ width: "100%", padding: "14px 16px", background: "var(--green-700, #2F6D3F)", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 10 }}>Proceed to Checkout</button>
              <button onClick={() => { clear(); navigate("/buyer/marketplace"); }} style={{ width: "100%", padding: "10px 16px", background: "#fff", color: "var(--text-muted, #66766A)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Clear Cart</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
