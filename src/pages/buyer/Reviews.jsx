import { useState, useEffect } from "react";
import { api } from "../../api";
import { useAuth } from "../../context/AuthContext";
import { useOrders } from "../../context/OrderContext";
import { Star } from "lucide-react";

export default function Reviews() {
  const { user } = useAuth();
  const { getOrders } = useOrders();
  const [reviews, setReviews] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ orderId: "", listingId: "", rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const allOrders = await getOrders({ buyerId: user.id });
      setOrders(allOrders);
      const delivered = allOrders.filter((o) => o.status === "delivered");
      const reviewData = await Promise.all(delivered.map((o) => api.getReviews({ orderId: o.id })));
      const flat = reviewData.flat();
      setReviews(flat);
      setLoading(false);
    })();
  }, [user, getOrders]);

  const deliveredOrders = orders.filter((o) => o.status === "delivered");
  const reviewedOrderIds = new Set(reviews.map((r) => r.orderId));
  const unreviewed = deliveredOrders.filter((o) => !reviewedOrderIds.has(o.id));

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.orderId) return alert("Please select an order.");
    setSubmitting(true);
    try {
      await api.createReview({ ...form, buyerId: user.id, buyerName: user.name });
      alert("Review submitted.");
      setForm({ orderId: "", listingId: "", rating: 5, comment: "" });
      const allOrders = await getOrders({ buyerId: user.id });
      setOrders(allOrders);
      const delivered = allOrders.filter((o) => o.status === "delivered");
      const reviewData = await Promise.all(delivered.map((o) => api.getReviews({ orderId: o.id })));
      setReviews(reviewData.flat());
    } catch (e) {
      alert(e.message || "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedOrder = deliveredOrders.find((o) => o.id === form.orderId);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px" }}>
      <h1 style={{ fontFamily: "'IBM Plex Serif', serif", fontSize: 28, color: "var(--text-dark, #1E2A1F)", margin: "0 0 20px" }}>Reviews</h1>

      <div style={{ background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 12, padding: 20, boxShadow: "0 6px 20px rgba(29,78,42,0.05)", marginBottom: 20 }}>
        <h2 style={{ fontFamily: "'IBM Plex Serif', serif", margin: "0 0 12px", color: "var(--text-dark, #1E2A1F)" }}>Leave a Review</h2>
        {unreviewed.length === 0 ? (
          <p style={{ color: "var(--text-muted, #66766A)", fontSize: 14 }}>No delivered orders pending review.</p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <select value={form.orderId} onChange={(e) => update("orderId", e.target.value)} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border, #DCE6D8)", fontSize: 14, background: "#fff" }}>
              <option value="">Select delivered order</option>
              {unreviewed.map((o) => (
                <option key={o.id} value={o.id}>{o.orderNumber} — {o.items.map((i) => i.title).join(", ")}</option>
              ))}
            </select>
            {selectedOrder && (
              <select value={form.listingId} onChange={(e) => update("listingId", e.target.value)} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border, #DCE6D8)", fontSize: 14, background: "#fff" }}>
                <option value="">Select item to review</option>
                {selectedOrder.items.map((item, idx) => <option key={idx} value={item.listingId}>{item.title}</option>)}
              </select>
            )}
            <div>
              <label style={{ fontSize: 13, color: "var(--text-muted, #66766A)" }}>Rating</label>
              <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                 {[1, 2, 3, 4, 5].map((star) => (
                   <button key={star} type="button" onClick={() => update("rating", star)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: star <= form.rating ? "#F59E0B" : "#D1D5DB", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                     <Star size={22} fill={star <= form.rating ? "#F59E0B" : "none"} color={star <= form.rating ? "#F59E0B" : "#D1D5DB"} />
                   </button>
                 ))}
              </div>
            </div>
            <textarea value={form.comment} onChange={(e) => update("comment", e.target.value)} placeholder="Share your experience" rows={3} style={{ padding: 10, borderRadius: 8, border: "1px solid var(--border, #DCE6D8)", fontSize: 14, resize: "vertical" }} />
            <button type="submit" disabled={submitting || !form.orderId || !form.listingId} style={{ alignSelf: "flex-start", padding: "10px 18px", background: "var(--green-700, #2F6D3F)", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", opacity: submitting || !form.orderId || !form.listingId ? 0.5 : 1 }}>Submit Review</button>
          </form>
        )}
      </div>

      <div style={{ background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 12, padding: 20, boxShadow: "0 6px 20px rgba(29,78,42,0.05)" }}>
        <h2 style={{ fontFamily: "'IBM Plex Serif', serif", margin: "0 0 14px", color: "var(--text-dark, #1E2A1F)" }}>Your Reviews</h2>
        {loading ? (
          <div style={{ color: "var(--text-muted, #66766A)" }}>Loading...</div>
        ) : reviews.length === 0 ? (
          <div style={{ color: "var(--text-muted, #66766A)" }}>You haven't left any reviews yet.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {reviews.map((r) => (
              <div key={r.id} style={{ padding: "12px 0", borderBottom: "1px solid var(--border, #DCE6D8)" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-dark, #1E2A1F)" }}>{r.comment}</div>
                <div style={{ fontSize: 13, color: "var(--text-muted, #66766A)" }}>{r.rating}/5 • {new Date(r.createdAt).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
