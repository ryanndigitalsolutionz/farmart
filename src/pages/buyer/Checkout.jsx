import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrderContext";
import { ShoppingCart, CheckCircle2 } from "lucide-react";

const STEPS = ["Review", "Delivery", "Payment", "Confirm"];

export default function Checkout() {
  const { items, total, clear } = useCart();
  const { createOrder } = useOrders();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [form, setForm] = useState({ address: "", notes: "", paymentMethod: "mpesa" });

  const deliveryFee = items.length > 0 ? 2000 : 0;
  const grandTotal = total + deliveryFee;

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handlePlace = async () => {
    setSubmitting(true);
    try {
      const order = await createOrder({
        buyerId: "b1",
        buyerName: "Amina Wanjiru",
        buyerEmail: "amina@example.com",
        buyerLocation: "Nairobi CBD",
        farmerId: items[0]?.farmerId || "f1",
        farmerName: items[0]?.farmerName || "Farmer",
        items: items.map((i) => ({ listingId: i.listingId, title: i.title, price: i.price, quantity: i.quantity })),
        subtotal: total,
        deliveryFee,
        total: grandTotal,
        paymentMethod: form.paymentMethod,
        paymentStatus: form.paymentMethod === "cod" ? "pending" : "completed",
        deliveryAddress: form.address,
        notes: form.notes,
        status: "pending",
      });
      await clear();
      setOrderId(order.id);
      setDone(true);
    } catch (e) {
      alert(e.message || "Failed to place order.");
    } finally {
      setSubmitting(false);
    }
  };

  const fmt = (n) => "KES " + Number(n).toLocaleString();

  if (items.length === 0 && !done) {
    return (
      <div style={{ maxWidth: 700, margin: "0 auto", padding: 40, textAlign: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginBottom: 10 }}><ShoppingCart size={40} color="var(--text-muted, #66766A)" /></div>
        <h2 style={{ fontFamily: "'IBM Plex Serif', serif", color: "var(--text-dark, #1E2A1F)" }}>Your cart is empty</h2>
        <p style={{ color: "var(--text-muted, #66766A)" }}>Add items before checking out.</p>
        <button onClick={() => navigate("/buyer/marketplace")} style={{ marginTop: 16, background: "var(--green-700, #2F6D3F)", color: "#fff", padding: "10px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600 }}>Go to Marketplace</button>
      </div>
    );
  }

  if (done) {
    return (
      <div style={{ maxWidth: 700, margin: "0 auto", padding: 40, textAlign: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginBottom: 12 }}><CheckCircle2 size={48} color="var(--green-700, #2F6D3F)" /></div>
        <h2 style={{ fontFamily: "'IBM Plex Serif', serif", fontSize: 24, color: "var(--green-700, #2F6D3F)" }}>Demo payment completed</h2>
        <p style={{ color: "var(--text-muted, #66766A)", marginTop: 8 }}>Order placed successfully! Your order ID is <strong>{orderId}</strong>.</p>
        <div style={{ marginTop: 20, display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={() => navigate(`/buyer/orders/${orderId}`)} style={{ background: "var(--green-700, #2F6D3F)", color: "#fff", padding: "10px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600 }}>View Order</button>
          <button onClick={() => navigate("/buyer/orders")} style={{ background: "#fff", color: "var(--text-dark, #1E2A1F)", padding: "10px 18px", borderRadius: 8, border: "1px solid var(--border, #DCE6D8)", cursor: "pointer", fontWeight: 600 }}>All Orders</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px" }}>
      <h1 style={{ fontFamily: "'IBM Plex Serif', serif", fontSize: 28, color: "var(--text-dark, #1E2A1F)", margin: "0 0 20px" }}>Checkout</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {STEPS.map((s, i) => (
          <div key={s} style={{ padding: "8px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, background: i === step ? "var(--green-700, #2F6D3F)" : "var(--green-100, #EAF3E6)", color: i === step ? "#fff" : "var(--green-700, #2F6D3F)" }}>{s}</div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(260px, 1fr)", gap: 20, alignItems: "start" }}>
        <div style={{ background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 12, padding: 20, boxShadow: "0 6px 20px rgba(29,78,42,0.05)" }}>
          {step === 0 && (
            <div>
              <h3 style={{ fontFamily: "'IBM Plex Serif', serif", margin: "0 0 12px", color: "var(--text-dark, #1E2A1F)" }}>Review Cart</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map((item) => (
                  <div key={item.listingId} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border, #DCE6D8)" }}>
                    <div>
                      <div style={{ fontWeight: 600, color: "var(--text-dark, #1E2A1F)" }}>{item.title}</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted, #66766A)" }}>Qty: {item.quantity}</div>
                    </div>
                    <div style={{ fontWeight: 700, color: "var(--green-700, #2F6D3F)" }}>{fmt(item.price * item.quantity)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h3 style={{ fontFamily: "'IBM Plex Serif', serif", margin: "0 0 12px", color: "var(--text-dark, #1E2A1F)" }}>Delivery Information</h3>
              <label style={{ fontSize: 13, color: "var(--text-muted, #66766A)" }}>Delivery address</label>
              <textarea value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Enter full address" rows={3} style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 8, border: "1px solid var(--border, #DCE6D8)", fontSize: 14, resize: "vertical" }} />
              <label style={{ fontSize: 13, color: "var(--text-muted, #66766A)", marginTop: 12, display: "block" }}>Notes (optional)</label>
              <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Special instructions" rows={2} style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 8, border: "1px solid var(--border, #DCE6D8)", fontSize: 14, resize: "vertical" }} />
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ fontFamily: "'IBM Plex Serif', serif", margin: "0 0 12px", color: "var(--text-dark, #1E2A1F)" }}>Payment Method</h3>
              {["mpesa", "cod", "bank"].map((m) => (
                <label key={m} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", marginBottom: 8, borderRadius: 8, border: form.paymentMethod === m ? "2px solid var(--green-700, #2F6D3F)" : "1px solid var(--border, #DCE6D8)", background: "#f7faf7", cursor: "pointer" }}>
                  <input type="radio" name="payment" value={m} checked={form.paymentMethod === m} onChange={(e) => update("paymentMethod", e.target.value)} />
                  <span style={{ textTransform: "capitalize", fontWeight: 600, color: "var(--text-dark, #1E2A1F)" }}>{m === "mpesa" ? "M-Pesa" : m === "cod" ? "Cash on Delivery" : "Bank Transfer"}</span>
                </label>
              ))}
              <div style={{ marginTop: 10, fontSize: 12, color: "var(--text-muted, #66766A)", background: "#EAF3E6", padding: 10, borderRadius: 8 }}>This is a demo. No real payment will be processed. Selecting any method will simulate a successful payment.</div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 style={{ fontFamily: "'IBM Plex Serif', serif", margin: "0 0 12px", color: "var(--text-dark, #1E2A1F)" }}>Review & Confirm</h3>
              <div style={{ fontSize: 14, color: "var(--text-muted, #66766A)", lineHeight: 1.8 }}>
                <div><strong>Address:</strong> {form.address || "Not provided"}</div>
                <div><strong>Payment:</strong> {form.paymentMethod.toUpperCase()}</div>
                <div><strong>Items:</strong> {items.length} product(s)</div>
                <div><strong>Total:</strong> {fmt(grandTotal)}</div>
              </div>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
            <button onClick={back} disabled={step === 0} style={{ padding: "10px 16px", borderRadius: 8, border: "1px solid var(--border, #DCE6D8)", background: "#fff", cursor: "pointer", opacity: step === 0 ? 0.5 : 1 }}>Back</button>
            {step < STEPS.length - 1 ? (
              <button onClick={next} style={{ padding: "10px 16px", borderRadius: 8, border: "none", background: "var(--green-700, #2F6D3F)", color: "#fff", cursor: "pointer", fontWeight: 600 }}>Next</button>
            ) : (
              <button onClick={handlePlace} disabled={submitting} style={{ padding: "10px 16px", borderRadius: 8, border: "none", background: "var(--green-700, #2F6D3F)", color: "#fff", cursor: "pointer", fontWeight: 600, opacity: submitting ? 0.7 : 1 }}>{submitting ? "Placing..." : "Place Order"}</button>
            )}
          </div>
        </div>

        <div style={{ background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 12, padding: 18, boxShadow: "0 6px 20px rgba(29,78,42,0.05)" }}>
          <h3 style={{ fontFamily: "'IBM Plex Serif', serif", margin: "0 0 12px", color: "var(--text-dark, #1E2A1F)" }}>Order Summary</h3>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14, color: "var(--text-muted, #66766A)" }}><span>Subtotal</span><span>{fmt(total)}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 14, color: "var(--text-muted, #66766A)" }}><span>Delivery</span><span>{fmt(deliveryFee)}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 16, color: "var(--text-dark, #1E2A1F)", borderTop: "1px solid var(--border, #DCE6D8)", paddingTop: 10 }}><span>Total</span><span>{fmt(grandTotal)}</span></div>
        </div>
      </div>
    </div>
  );
}
