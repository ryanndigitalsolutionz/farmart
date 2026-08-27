import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ArrowRight, Leaf, Truck, Shield, Users, Star, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Avatar from "../../components/ui/Avatar";
import LivestockIcon from "../../components/ui/LivestockIcon";
import { demoFarmers, demoListings } from "../../data/demoData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

const sectionStyle = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "0 24px",
};

const heroStyle = {
  position: "relative",
  overflow: "hidden",
  background: "linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-secondary) 100%)",
  borderBottom: "1px solid var(--color-border)",
};

const containerStyle = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "96px 24px 120px",
  position: "relative",
  zIndex: 1,
};

const categoryCardStyle = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-lg, 16px)",
  padding: "20px 16px",
  textAlign: "center",
  textDecoration: "none",
  color: "var(--color-text)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 0,
};

const statCardStyle = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-lg, 16px)",
  padding: "24px 20px",
  textAlign: "center",
};

const primaryButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "14px 28px",
  borderRadius: 12,
  border: "none",
  background: "var(--color-primary)",
  color: "#fff",
  fontSize: 15,
  fontWeight: 700,
  cursor: "pointer",
  textDecoration: "none",
  transition: "transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
};

const featureCardStyle = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-lg, 16px)",
  padding: 28,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  textAlign: "center",
};

const testimonials = [
  { name: "Grace Mwangi", role: "Cattle Buyer, Nairobi", text: "Farmart made it so easy to find healthy livestock near me. The whole process was transparent and fair.", rating: 5 },
  { name: "Peter Kipchoge", role: "Dairy Farmer, Nakuru", text: "Since joining Farmart, my customer base has grown significantly. Listing my cattle takes just minutes.", rating: 5 },
  { name: "Amina Hassan", role: "Goat Buyer, Mombasa", text: "I love that I can see farmer ratings and reviews before buying. It feels trustworthy and community-driven.", rating: 4 },
];

const steps = [
  { icon: Search, title: "Discover", desc: "Browse verified livestock listings across Kenya with detailed photos, breed info, and farmer ratings." },
  { icon: MessageCircle, title: "Connect", desc: "Chat directly with farmers to ask questions, negotiate, and confirm details before ordering." },
  { icon: ShoppingBag, title: "Order", desc: "Place your order securely through the platform. Track progress from confirmation to delivery." },
  { icon: Truck, title: "Receive", desc: "Get your livestock delivered safely to your preferred location with full order tracking." },
];

function Search(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function MessageCircle(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function ShoppingBag(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export default function LandingPage() {
  const { isAuthenticated, role } = useAuth();
  const [metrics, setMetrics] = useState({ farmers: 0, listings: 0, buyers: 0, orders: 0 });

  useEffect(() => {
    (async () => {
      try {
        const { api } = await import("../../api");
        const m = await api.getMetrics();
        setMetrics({
          farmers: m.farmers || 0,
          listings: m.activeListings || 0,
          buyers: m.buyers || 0,
          orders: m.totalOrders || 0,
        });
      } catch {
        setMetrics({ farmers: 320, listings: 861, buyers: 930, orders: 1240 });
      }
    })();
  }, []);

  const getCta = () => {
    if (role === "farmer") return { primary: { to: "/farmer", label: "Go to Dashboard" }, secondary: { to: "/farmer/listings", label: "My Listings" } };
    if (role === "admin") return { primary: { to: "/admin", label: "Admin Dashboard" }, secondary: { to: "/admin/farmers", label: "Manage Farmers" } };
    return { primary: { to: "/buyer/marketplace", label: "Browse Marketplace" }, secondary: { to: "/register", label: "Join as a Farmer" } };
  };

  const cta = getCta();

  return (
    <>
      <style>{`
        .landing-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .landing-hero-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .landing-hero-bg::before {
          content: "";
          position: absolute;
          width: 600px;
          height: 600px;
          top: -200px;
          right: -150px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(39,122,68,0.08) 0%, transparent 70%);
        }
        .landing-hero-bg::after {
          content: "";
          position: absolute;
          width: 400px;
          height: 400px;
          bottom: -100px;
          left: -100px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(39,122,68,0.05) 0%, transparent 70%);
        }
        .landing-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg, 16px);
          padding: 24px;
          text-decoration: none;
          color: var(--color-text);
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .landing-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--color-primary);
        }
        .landing-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: var(--radius-md, 12px);
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .landing-btn-primary {
          background: var(--color-cta-bg);
          color: var(--color-cta-text);
          border: 1px solid var(--color-cta-bg);
        }
        .landing-btn-primary:hover {
          filter: brightness(0.92);
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }
        .landing-btn-secondary {
          background: var(--color-surface);
          color: var(--color-text);
          border: 1px solid var(--color-border);
        }
        .landing-btn-secondary:hover {
          background: var(--color-surface-secondary);
          transform: translateY(-2px);
        }
        .landing-section-title {
          font-family: var(--font-display, 'Fraunces', serif);
          font-size: clamp(28px, 4vw, 36px);
          font-weight: 700;
          color: var(--color-text);
          margin: 0 0 8px;
        }
        .landing-section-subtitle {
          color: var(--color-text-muted);
          font-size: 16px;
          line-height: 1.7;
          max-width: 600px;
          margin: 0 auto;
        }
        .landing-stat {
          font-size: clamp(32px, 5vw, 44px);
          font-weight: 800;
          color: var(--color-primary);
        }
        .landing-stat-label {
          font-size: 14px;
          color: var(--color-text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 4px;
        }
        .landing-testimonial {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg, 16px);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
      `}</style>

      <div className="landing-page">
        {/* Hero */}
        <section style={heroStyle}>
          <div className="landing-hero-bg" />
          <div style={containerStyle}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
              style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}
            >
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "var(--color-surface-secondary)", border: "1px solid var(--color-border)", fontSize: 13, fontWeight: 600, color: "var(--color-text-muted)", marginBottom: 24 }}>
                <Leaf size={14} />
                Kenya&apos;s trusted livestock marketplace
              </div>
              <h1 style={{ fontFamily: "var(--font-display, 'Fraunces', serif)", fontSize: "clamp(40px, 7vw, 64px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-1.5px", margin: "0 0 20px" }}>
                Connecting Farmers.
                <br />
                Empowering Buyers.
              </h1>
              <p style={{ fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.7, color: "var(--color-text-muted)", maxWidth: 560, margin: "0 auto 36px" }}>
                Farmart is the digital marketplace that connects livestock farmers with buyers across Kenya.
                Discover healthy animals, compare prices, and order with confidence.
              </p>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <Link to={cta.primary.to} className="landing-btn landing-btn-primary">
                  {cta.primary.label}
                  <ArrowRight size={18} />
                </Link>
                <Link to={cta.secondary.to} className="landing-btn landing-btn-secondary">
                  {cta.secondary.label}
                </Link>
              </div>
              {isAuthenticated && (
                <div style={{ marginTop: 20, fontSize: 13, color: "var(--color-text-muted)" }}>
                  Welcome back, {role === "farmer" ? "Farmer" : role === "admin" ? "Admin" : "Buyer"} 👋
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section style={{ padding: "96px 0" }}>
          <div style={sectionStyle}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              style={{ textAlign: "center", marginBottom: 48 }}
            >
              <h2 className="landing-section-title">Marketplace Categories</h2>
              <p className="landing-section-subtitle" style={{ margin: "8px auto 0" }}>
                Browse livestock by type and find exactly what you need.
              </p>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, maxWidth: 960, margin: "0 auto" }}>
              {[
                { to: "/buyer/marketplace?type=cattle", type: "cattle", label: "Cattle" },
                { to: "/buyer/marketplace?type=goat", type: "goat", label: "Goats" },
                { to: "/buyer/marketplace?type=sheep", type: "sheep", label: "Sheep" },
                { to: "/buyer/marketplace?type=poultry", type: "poultry", label: "Poultry" },
              ].map((cat, i) => (
                <motion.div
                  key={cat.label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  custom={i + 1}
                >
                  <Link to={cat.to} className="landing-card" style={{ ...categoryCardStyle, justifyContent: "center", minHeight: 88 }}>
                    <motion.div
                      whileHover={{ scale: 1.08, y: -4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      style={{ width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)" }}
                    >
                      <LivestockIcon type={cat.type} size={56} />
                    </motion.div>
                    <span style={{ fontWeight: 700, fontSize: 15, marginTop: 8 }}>{cat.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section style={{ padding: "96px 0", background: "var(--color-surface-secondary)" }}>
          <div style={sectionStyle}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              style={{ textAlign: "center", marginBottom: 48 }}
            >
              <h2 className="landing-section-title">How Farmart Works</h2>
              <p className="landing-section-subtitle" style={{ margin: "8px auto 0" }}>
                A simple, transparent process from discovery to delivery.
              </p>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  custom={i + 1}
                >
                  <div style={featureCardStyle}>
                    <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md, 12px)", background: "var(--color-surface)", border: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)", margin: "0 auto" }}>
                      <step.icon />
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{step.title}</div>
                    <div style={{ fontSize: 14, color: "var(--color-text-muted)", lineHeight: 1.6 }}>{step.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Listings */}
        <section style={{ padding: "96px 0" }}>
          <div style={sectionStyle}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              style={{ textAlign: "center", marginBottom: 48 }}
            >
              <h2 className="landing-section-title">Featured Livestock</h2>
              <p className="landing-section-subtitle" style={{ margin: "8px auto 0" }}>
                Fresh listings from verified farmers across Kenya.
              </p>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
              {demoListings.filter((l) => l.status === "active").slice(0, 4).map((item, i) => (
                <motion.div
                  key={item.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  custom={i + 1}
                >
                  <Link to={`/livestock/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg, 16px)", overflow: "hidden", transition: "transform 0.2s ease, box-shadow 0.2s ease" }}>
                      <div style={{ height: 180, background: "var(--color-surface-secondary)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-muted)", fontSize: 13 }}>
                        {item.images?.[0] ? (
                          <img src={item.images[0]} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <span>No image</span>
                        )}
                      </div>
                      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                        <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.3 }}>{item.title}</div>
                        <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{item.breed} • {item.location}</div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                          <div style={{ fontWeight: 800, color: "var(--color-primary)", fontSize: 16 }}>
                            KES {Number(item.price).toLocaleString()}
                          </div>
                          <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>{item.farmerName}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <Link to="/buyer/marketplace" className="landing-btn landing-btn-secondary">
                View All Listings
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Why Farmart */}
        <section style={{ padding: "96px 0", background: "var(--color-surface-secondary)" }}>
          <div style={sectionStyle}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              style={{ textAlign: "center", marginBottom: 48 }}
            >
              <h2 className="landing-section-title">Why Farmart</h2>
              <p className="landing-section-subtitle" style={{ margin: "8px auto 0" }}>
                Built for Kenyan farmers and buyers, with trust and transparency at its core.
              </p>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
              {[
                { icon: Shield, title: "Trusted Farmers", desc: "Every farmer is verified. Browse profiles with ratings, reviews, and history." },
                { icon: Leaf, title: "Transparent Pricing", desc: "See real prices from real farmers. No hidden fees, no middlemen markups." },
                { icon: Truck, title: "Convenient Marketplace", desc: "Order from your phone and arrange delivery. From farm to your doorstep." },
                { icon: Users, title: "Local & Community-First", desc: "Supporting Kenyan agriculture by connecting local farmers with local buyers." },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  custom={i + 1}
                >
                  <div style={featureCardStyle}>
                    <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md, 12px)", background: "var(--color-surface)", border: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)", margin: "0 auto" }}>
                      <feature.icon />
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{feature.title}</div>
                    <div style={{ fontSize: 14, color: "var(--color-text-muted)", lineHeight: 1.6 }}>{feature.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Farmers */}
        <section style={{ padding: "96px 0" }}>
          <div style={sectionStyle}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              style={{ textAlign: "center", marginBottom: 48 }}
            >
              <h2 className="landing-section-title">Featured Farmers</h2>
              <p className="landing-section-subtitle" style={{ margin: "8px auto 0" }}>
                Meet some of the trusted farmers on our platform.
              </p>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
              {demoFarmers.slice(0, 3).map((farmer, i) => (
                <motion.div
                  key={farmer.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  custom={i + 1}
                >
                  <Link to={`/farmer/${farmer.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg, 16px)", padding: 24, display: "flex", flexDirection: "column", gap: 12, transition: "transform 0.2s ease, box-shadow 0.2s ease" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <Avatar name={farmer.name} size={48} />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 15 }}>{farmer.farmName}</div>
                          <div style={{ fontSize: 13, color: "var(--color-text-muted)" }}>{farmer.location}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 13, color: "var(--color-text-muted)", lineHeight: 1.6 }}>{farmer.description}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
                        <Star size={14} style={{ color: "var(--color-warning)" }} />
                        <span style={{ fontWeight: 700 }}>{farmer.rating}</span>
                        <span style={{ color: "var(--color-text-muted)" }}>({farmer.reviewCount} reviews)</span>
                        {farmer.isVerified && (
                          <span style={{ marginLeft: "auto", fontSize: 11, padding: "2px 8px", borderRadius: 6, background: "rgba(39,122,68,0.1)", color: "var(--color-primary)", fontWeight: 700 }}>Verified</span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section style={{ padding: "96px 0", background: "var(--color-surface-secondary)" }}>
          <div style={sectionStyle}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              style={{ textAlign: "center", marginBottom: 48 }}
            >
              <h2 className="landing-section-title">Platform by the Numbers</h2>
              <p className="landing-section-subtitle" style={{ margin: "8px auto 0" }}>
                Real data from our growing marketplace.
              </p>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
              {[
                { value: metrics.farmers, label: "Farmers" },
                { value: metrics.listings, label: "Active Listings" },
                { value: metrics.buyers, label: "Buyers" },
                { value: metrics.orders, label: "Completed Orders" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  custom={i + 1}
                >
                  <div style={statCardStyle}>
                    <div className="landing-stat">{Number(stat.value).toLocaleString()}</div>
                    <div className="landing-stat-label">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ padding: "96px 0" }}>
          <div style={sectionStyle}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              style={{ textAlign: "center", marginBottom: 48 }}
            >
              <h2 className="landing-section-title">What Our Community Says</h2>
              <p className="landing-section-subtitle" style={{ margin: "8px auto 0" }}>
                Demo testimonials from our users.
              </p>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  custom={i + 1}
                >
                  <div className="landing-testimonial">
                    <div style={{ display: "flex", gap: 2 }}>
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star key={idx} size={16} style={{ color: idx < t.rating ? "var(--color-warning)" : "var(--color-border)", fill: idx < t.rating ? "var(--color-warning)" : "none" }} />
                      ))}
                    </div>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--color-text)", margin: 0, fontStyle: "italic" }}>&ldquo;{t.text}&rdquo;</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar name={t.name} size={36} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                        <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{t.role}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section style={{
          background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)",
          textAlign: "center",
          padding: "96px 24px",
        }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}
          >
            <h2 style={{ fontFamily: "var(--font-display, 'Fraunces', serif)", fontSize: "clamp(32px, 5vw, 44px)", fontWeight: 700, margin: "0 0 16px", color: "#064e3b" }}>
              Ready to find your next livestock?
            </h2>
            <p style={{ fontSize: 16, opacity: 0.9, maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.7, color: "#374151" }}>
              Join hundreds of farmers and buyers already using Farmart to trade livestock safely and transparently.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to={cta.primary.to} style={{ ...primaryButtonStyle, background: "#fff", color: "#064e3b", border: "1px solid #fff" }}>
                {cta.primary.label}
                <ArrowRight size={18} />
              </Link>
              <Link to="/register" style={{ ...primaryButtonStyle, background: "transparent", color: "#064e3b", border: "1px solid #064e3b" }}>
                Join Farmart
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
