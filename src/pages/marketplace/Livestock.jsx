import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const ITEMS_PER_PAGE = 6;

export default function Livestock() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const { addItem } = useCart();
  const { items: wishlistItems, addItem: addWishlist, removeItem: removeWishlist } = useWishlist();
  const navigate = useNavigate();

  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [locationFilter, setLocationFilter] = useState("");

  const filterKey = `${search}|${typeFilter}|${sort}|${priceRange.min}|${priceRange.max}|${locationFilter}`;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await api.getListings({ status: "active" });
      setListings(data);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (search) {
        const s = search.toLowerCase();
        if (!l.title.toLowerCase().includes(s) && !l.breed.toLowerCase().includes(s) && !l.location.toLowerCase().includes(s) && !l.farmerName.toLowerCase().includes(s)) return false;
      }
      if (typeFilter && l.type !== typeFilter) return false;
      if (priceRange.min && l.price < Number(priceRange.min)) return false;
      if (priceRange.max && l.price > Number(priceRange.max)) return false;
      if (locationFilter && !l.location.toLowerCase().includes(locationFilter.toLowerCase())) return false;
      return true;
    });
  }, [listings, search, typeFilter, priceRange, locationFilter]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === "price_asc") arr.sort((a, b) => a.price - b.price);
    else if (sort === "price_desc") arr.sort((a, b) => b.price - a.price);
    else arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return arr;
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
  const pageItems = sorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const isWishlisted = (id) => wishlistItems.some((w) => w.listingId === id);

  const toggleWishlist = async (item) => {
    if (isWishlisted(item.id)) await removeWishlist(item.id);
    else await addWishlist({ listingId: item.id, title: item.title, price: item.price, breed: item.breed, type: item.type, location: item.location, farmerName: item.farmerName, image: item.images?.[0] || null });
  };

  const handleAddToCart = async (item) => {
    await addItem({ listingId: item.id, title: item.title, price: item.price, quantity: 1, breed: item.breed, type: item.type, location: item.location, farmerName: item.farmerName, image: item.images?.[0] || null });
  };

  const fmt = (n) => "KES " + Number(n).toLocaleString();

  const card = (item) => (
    <div key={item.id} style={{ background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 12, overflow: "hidden", boxShadow: "0 6px 20px rgba(29,78,42,0.05)", display: "flex", flexDirection: "column" }}>
      <div onClick={() => navigate(`/livestock/${item.id}`)} style={{ cursor: "pointer", height: 180, background: "#EAF3E6", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted, #66766A)", fontSize: 13 }}>
        {item.images?.[0] ? <img src={item.images[0]} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "No image"}
      </div>
      <div style={{ padding: 14, flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 8 }}>
          <div onClick={() => navigate(`/livestock/${item.id}`)} style={{ cursor: "pointer", flex: 1 }}>
            <div style={{ fontWeight: 700, color: "var(--text-dark, #1E2A1F)", fontSize: 14, lineHeight: 1.3 }}>{item.title}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted, #66766A)" }}>{item.breed} • {item.location}</div>
          </div>
          <button onClick={() => toggleWishlist(item)} aria-label="wishlist" style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: isWishlisted(item.id) ? "#DC2626" : "var(--text-muted, #66766A)", padding: 0 }}>
            {isWishlisted(item.id) ? "♥" : "♡"}
          </button>
        </div>
        <div style={{ display: "flex", gap: 12, fontSize: 12, color: "var(--text-muted, #66766A)", flexWrap: "wrap" }}>
          <span>Age: {item.age}</span>
          <span>Gender: {item.gender}</span>
          <span>Weight: {item.weight}{item.weightUnit}</span>
        </div>
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid var(--border, #DCE6D8)" }}>
          <div>
            <div style={{ fontWeight: 800, color: "var(--green-700, #2F6D3F)", fontSize: 16 }}>{fmt(item.price)}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted, #66766A)" }}>{item.farmerName}</div>
          </div>
          <button onClick={() => handleAddToCart(item)} disabled={item.quantity <= 0} style={{ background: "var(--green-700, #2F6D3F)", color: "#fff", border: "none", borderRadius: 8, padding: "8px 12px", fontSize: 13, fontWeight: 600, cursor: "pointer", opacity: item.quantity <= 0 ? 0.5 : 1 }}>
            {item.quantity > 0 ? "Add to cart" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 20px" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontFamily: "'IBM Plex Serif', serif", fontSize: 28, color: "var(--text-dark, #1E2A1F)", margin: "0 0 6px" }}>Marketplace</h1>
        <p style={{ color: "var(--text-muted, #66766A)", margin: 0, fontSize: 14 }}>Browse livestock from verified farmers.</p>
      </div>

      <div style={{ background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 12, padding: 16, marginBottom: 20, boxShadow: "0 6px 20px rgba(29,78,42,0.05)", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search title, breed, location..." style={{ flex: "1 1 240px", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border, #DCE6D8)", outline: "none", fontSize: 14 }} />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border, #DCE6D8)", fontSize: 14, background: "#fff" }}>
          <option value="">All types</option>
          <option value="cattle">Cattle</option>
          <option value="goat">Goat</option>
          <option value="sheep">Sheep</option>
          <option value="poultry">Poultry</option>
        </select>
        <input type="number" value={priceRange.min} onChange={(e) => setPriceRange((p) => ({ ...p, min: e.target.value }))} placeholder="Min price" style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border, #DCE6D8)", fontSize: 14, width: 120 }} />
        <input type="number" value={priceRange.max} onChange={(e) => setPriceRange((p) => ({ ...p, max: e.target.value }))} placeholder="Max price" style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border, #DCE6D8)", fontSize: 14, width: 120 }} />
        <input value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} placeholder="Location" style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border, #DCE6D8)", fontSize: 14, width: 160 }} />
        <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border, #DCE6D8)", fontSize: 14, background: "#fff" }}>
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      {loading ? (
        <div key={filterKey + "-loading"} style={{ padding: 40, textAlign: "center", color: "var(--text-muted, #66766A)" }}>Loading listings...</div>
      ) : pageItems.length === 0 ? (
        <div style={{ background: "var(--white, #fff)", border: "1px solid var(--border, #DCE6D8)", borderRadius: 12, padding: 40, textAlign: "center", color: "var(--text-muted, #66766A)" }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>🔍</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-dark, #1E2A1F)", marginBottom: 6 }}>No listings found</div>
          <div>Try adjusting your search or filters.</div>
          <Link to="/buyer/marketplace" style={{ color: "var(--green-700, #2F6D3F)", fontWeight: 600, marginTop: 10, display: "inline-block" }}>Clear filters</Link>
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
            {pageItems.map(card)}
          </div>
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 24 }}>
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid var(--border, #DCE6D8)", background: "#fff", cursor: "pointer", opacity: page === 1 ? 0.5 : 1 }}>Prev</button>
              <span style={{ fontSize: 14, color: "var(--text-muted, #66766A)" }}>Page {page} of {totalPages}</span>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid var(--border, #DCE6D8)", background: "#fff", cursor: "pointer", opacity: page === totalPages ? 0.5 : 1 }}>Next</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
