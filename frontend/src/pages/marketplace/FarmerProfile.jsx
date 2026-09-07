import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../../api";
import PageHeader from "../../components/layout/PageHeader";
import Avatar from "../../components/ui/Avatar";
import { Star, MapPin, Phone, Mail } from "lucide-react";

export default function FarmerProfile() {
  const { id } = useParams();
  const [farmer, setFarmer] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [user, farmerListings] = await Promise.all([
          api.getUser(id),
          api.getListings({ farmerId: id, status: "active" }),
        ]);
        setFarmer(user);
        setListings(farmerListings);
      } catch {
        setFarmer(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px", textAlign: "center" }}>
        <div style={{ color: "var(--color-text-muted)" }}>Loading farmer profile...</div>
      </div>
    );
  }

  if (!farmer) {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>🚜</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text)", marginBottom: 6 }}>Farmer not found</div>
        <Link to="/buyer/marketplace" style={{ color: "var(--color-primary)", fontWeight: 600 }}>Browse marketplace</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px" }}>
      <PageHeader
        title={farmer.farmName || farmer.name}
        subtitle={farmer.location}
        actions={
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {farmer.isVerified && (
              <span style={{ padding: "4px 10px", borderRadius: 6, background: "rgba(39,122,68,0.1)", color: "var(--color-primary)", fontSize: 12, fontWeight: 700 }}>Verified</span>
            )}
          </div>
        }
      />
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 280px" }}>
          <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Avatar name={farmer.name} size={64} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{farmer.name}</div>
                <div style={{ fontSize: 14, color: "var(--color-text-muted)" }}>{farmer.farmName}</div>
                <div style={{ fontSize: 13, color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                  <MapPin size={14} />
                  {farmer.location}
                </div>
              </div>
            </div>
            {farmer.description && (
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--color-text-muted)", margin: 0 }}>{farmer.description}</p>
            )}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 13, color: "var(--color-text-muted)" }}>
              {farmer.contact && (
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Phone size={14} />
                  {farmer.contact}
                </span>
              )}
              {farmer.email && (
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Mail size={14} />
                  {farmer.email}
                </span>
              )}
            </div>
            {(farmer.rating > 0 || farmer.reviewCount > 0) && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14 }}>
                <Star size={16} style={{ color: "var(--color-warning)" }} />
                <span style={{ fontWeight: 700 }}>{farmer.rating || "New"}</span>
                <span style={{ color: "var(--color-text-muted)" }}>({farmer.reviewCount || 0} reviews)</span>
              </div>
            )}
          </div>
        </div>
        <div style={{ flex: "2 1 400px" }}>
          <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Active Listings ({listings.length})</div>
            {listings.length === 0 ? (
              <div style={{ textAlign: "center", color: "var(--color-text-muted)", padding: 24 }}>No active listings yet.</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {listings.map((item) => (
                  <Link
                    key={item.id}
                    to={`/livestock/${item.id}`}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 14px",
                      borderRadius: 10,
                      border: "1px solid var(--color-border)",
                      textDecoration: "none",
                      color: "var(--color-text)",
                      transition: "background 0.15s ease",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{item.title}</div>
                      <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{item.breed} • {item.location}</div>
                    </div>
                    <div style={{ fontWeight: 800, color: "var(--color-primary)", fontSize: 14 }}>
                      KES {Number(item.price).toLocaleString()}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
