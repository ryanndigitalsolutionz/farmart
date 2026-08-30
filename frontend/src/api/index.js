const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

function getStorage(key, fallback) {
  try {
    const raw = localStorage.getItem("farmart_" + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setStorage(key, value) {
  localStorage.setItem("farmart_" + key, JSON.stringify(value));
}

let _users = getStorage("users", []);
let _listings = getStorage("listings", []);
let _orders = getStorage("orders", []);
let _reviews = getStorage("reviews", []);
let _transactions = getStorage("transactions", []);
let _disputes = getStorage("disputes", []);
let _announcements = getStorage("announcements", []);
let _cart = getStorage("cart", []);
let _wishlist = getStorage("wishlist", []);
let _notifications = getStorage("notifications", []);

function persistAll() {
  setStorage("users", _users);
  setStorage("listings", _listings);
  setStorage("orders", _orders);
  setStorage("reviews", _reviews);
  setStorage("transactions", _transactions);
  setStorage("disputes", _disputes);
  setStorage("announcements", _announcements);
  setStorage("cart", _cart);
  setStorage("wishlist", _wishlist);
  setStorage("notifications", _notifications);
}

function ensureDemoData() {
  if (_users.length === 0) {
    _users = [
      { id: "f1", email: "jomo@greenpastures.co.ke", password: "demo1234", name: "Jomo Kamau", role: "farmer", farmName: "Kiambu Green Pastures", location: "Kiambu, Kenya", contact: "+254 712 345 678", description: "Healthy grass-fed cattle and goats.", isVerified: true, rating: 4.8, reviewCount: 24, joinedAt: new Date(Date.now() - 180 * 86400000).toISOString(), avatar: null },
      { id: "f2", email: "naomi@nakurufarm.co.ke", password: "demo1234", name: "Naomi Chepkemoi", role: "farmer", farmName: "Nakuru Boran Ranch", location: "Nakuru, Kenya", contact: "+254 722 987 654", description: "Premium Boran cattle and Galla goats.", isVerified: true, rating: 4.5, reviewCount: 18, joinedAt: new Date(Date.now() - 120 * 86400000).toISOString(), avatar: null },
      { id: "f3", email: "samuel@merufarm.co.ke", password: "demo1234", name: "Samuel Kipchoge", role: "farmer", farmName: "Meru Highland Farm", location: "Meru, Kenya", contact: "+254 733 456 789", description: "Highland dairy goats and sheep.", isVerified: false, rating: 0, reviewCount: 0, joinedAt: new Date(Date.now() - 7 * 86400000).toISOString(), avatar: null },
      { id: "b1", email: "amina@example.com", password: "demo1234", name: "Amina Wanjiru", role: "buyer", location: "Nairobi CBD", joinedAt: new Date(Date.now() - 90 * 86400000).toISOString(), avatar: null },
      { id: "b2", email: "david@example.com", password: "demo1234", name: "David Ochieng", role: "buyer", location: "Mombasa, Kenya", joinedAt: new Date(Date.now() - 60 * 86400000).toISOString(), avatar: null },
      { id: "a1", email: "admin@farmart.co.ke", password: "admin123", name: "Admin User", role: "admin", joinedAt: new Date(Date.now() - 365 * 86400000).toISOString(), avatar: null },
    ];
  }
  if (_listings.length === 0) {
    _listings = [
      { id: "l1", type: "cattle", breed: "Boran Bull", title: "Healthy Boran Bull — 2.5 years", description: "Well-maintained Boran bull, vaccinated, grass-fed.", price: 85000, quantity: 1, age: "2.5 years", gender: "male", weight: 420, weightUnit: "kg", location: "Nakuru, Kenya", farmerId: "f1", farmerName: "Kiambu Green Pastures", images: [], status: "active", isFlagged: false, flagReason: null, rating: 4.8, reviewCount: 12, createdAt: new Date(Date.now() - 30 * 86400000).toISOString() },
      { id: "l2", type: "goat", breed: "Galla Goat", title: "Galla Doe — Excellent for breeding", description: "Pure Galla doe, 1.5 years old, healthy.", price: 15000, quantity: 3, age: "1.5 years", gender: "female", weight: 45, weightUnit: "kg", location: "Kiambu, Kenya", farmerId: "f1", farmerName: "Kiambu Green Pastures", images: [], status: "active", isFlagged: false, flagReason: null, rating: 4.5, reviewCount: 8, createdAt: new Date(Date.now() - 20 * 86400000).toISOString() },
      { id: "l3", type: "cattle", breed: "Friesian Cow", title: "Friesian Cow — High milk yield", description: "Friesian cow producing 25L/day.", price: 120000, quantity: 1, age: "4 years", gender: "female", weight: 550, weightUnit: "kg", location: "Nyeri, Kenya", farmerId: "f2", farmerName: "Nakuru Boran Ranch", images: [], status: "active", isFlagged: false, flagReason: null, rating: 4.9, reviewCount: 15, createdAt: new Date(Date.now() - 15 * 86400000).toISOString() },
      { id: "l4", type: "poultry", breed: "Kienyeji", title: "Free-range Kienyeji Chicken — 12 weeks", description: "Free-range indigenous chickens.", price: 1200, quantity: 20, age: "12 weeks", gender: "mixed", weight: 2.5, weightUnit: "kg", location: "Meru, Kenya", farmerId: "f2", farmerName: "Nakuru Boran Ranch", images: [], status: "active", isFlagged: true, flagReason: "price outlier", rating: 4.2, reviewCount: 5, createdAt: new Date(Date.now() - 10 * 86400000).toISOString() },
      { id: "l5", type: "goat", breed: "Boer", title: "Boer Buck — Prime breeding stock", description: "Pedigree Boer buck, 2 years old.", price: 35000, quantity: 1, age: "2 years", gender: "male", weight: 70, weightUnit: "kg", location: "Nakuru, Kenya", farmerId: "f3", farmerName: "Meru Highland Farm", images: [], status: "pending_review", isFlagged: false, flagReason: null, rating: 0, reviewCount: 0, createdAt: new Date(Date.now() - 2 * 86400000).toISOString() },
      { id: "l6", type: "sheep", breed: "Dorper", title: "Dorper Ram — Mature and ready", description: "Mature Dorper ram, parasite-controlled.", price: 22000, quantity: 2, age: "2 years", gender: "male", weight: 80, weightUnit: "kg", location: "Narok, Kenya", farmerId: "f2", farmerName: "Nakuru Boran Ranch", images: [], status: "active", isFlagged: false, flagReason: null, rating: 4.6, reviewCount: 7, createdAt: new Date(Date.now() - 5 * 86400000).toISOString() },
    ];
  }
  if (_orders.length === 0) {
    _orders = [
      { id: "o1", orderNumber: "FM-2201", buyerId: "b1", buyerName: "Amina Wanjiru", buyerEmail: "amina@example.com", buyerLocation: "Nairobi CBD", farmerId: "f1", farmerName: "Kiambu Green Pastures", items: [{ listingId: "l1", title: "Healthy Boran Bull — 2.5 years", price: 85000, quantity: 1 }], subtotal: 85000, deliveryFee: 2000, total: 87000, status: "delivered", paymentMethod: "mpesa", paymentStatus: "completed", deliveryAddress: "Nairobi CBD, Kenyatta Ave", notes: "Please deliver before Friday.", timeline: [{ status: "pending", date: new Date(Date.now() - 10 * 86400000).toISOString(), note: "Order placed" }, { status: "confirmed", date: new Date(Date.now() - 9 * 86400000).toISOString(), note: "Seller confirmed" }, { status: "processing", date: new Date(Date.now() - 8 * 86400000).toISOString(), note: "Preparing for delivery" }, { status: "shipped", date: new Date(Date.now() - 6 * 86400000).toISOString(), note: "Out for delivery" }, { status: "delivered", date: new Date(Date.now() - 5 * 86400000).toISOString(), note: "Delivered successfully" }], createdAt: new Date(Date.now() - 10 * 86400000).toISOString() },
      { id: "o2", orderNumber: "FM-2202", buyerId: "b1", buyerName: "Amina Wanjiru", buyerEmail: "amina@example.com", buyerLocation: "Nairobi CBD", farmerId: "f2", farmerName: "Nakuru Boran Ranch", items: [{ listingId: "l3", title: "Friesian Cow — High milk yield", price: 120000, quantity: 1 }], subtotal: 120000, deliveryFee: 5000, total: 125000, status: "processing", paymentMethod: "bank", paymentStatus: "completed", deliveryAddress: "Nairobi CBD, Kenyatta Ave", notes: "", timeline: [{ status: "pending", date: new Date(Date.now() - 3 * 86400000).toISOString(), note: "Order placed" }, { status: "confirmed", date: new Date(Date.now() - 2 * 86400000).toISOString(), note: "Seller confirmed" }, { status: "processing", date: new Date(Date.now() - 1 * 86400000).toISOString(), note: "Processing order" }], createdAt: new Date(Date.now() - 3 * 86400000).toISOString() },
      { id: "o3", orderNumber: "FM-2203", buyerId: "b2", buyerName: "David Ochieng", buyerEmail: "david@example.com", buyerLocation: "Mombasa, Kenya", farmerId: "f1", farmerName: "Kiambu Green Pastures", items: [{ listingId: "l2", title: "Galla Doe — Excellent for breeding", price: 15000, quantity: 2 }], subtotal: 30000, deliveryFee: 3000, total: 33000, status: "pending", paymentMethod: "mpesa", paymentStatus: "pending", deliveryAddress: "Mombasa, Nyali Bridge", notes: "Call when arriving.", timeline: [{ status: "pending", date: new Date(Date.now() - 1 * 86400000).toISOString(), note: "Order placed" }], createdAt: new Date(Date.now() - 1 * 86400000).toISOString() },
    ];
  }
  if (_reviews.length === 0) {
    _reviews = [
      { id: "r1", orderId: "o1", listingId: "l1", buyerId: "b1", buyerName: "Amina Wanjiru", rating: 5, comment: "Excellent bull, very healthy and well-maintained.", createdAt: new Date(Date.now() - 4 * 86400000).toISOString() },
      { id: "r2", orderId: "o1", listingId: "l2", buyerId: "b1", buyerName: "Amina Wanjiru", rating: 4, comment: "Good goats, healthy and as described.", createdAt: new Date(Date.now() - 4 * 86400000).toISOString() },
    ];
  }
  if (_transactions.length === 0) {
    _transactions = [
      { id: "t1", reference: "TXN-2024-001", orderId: "o1", orderNumber: "FM-2201", buyerId: "b1", buyerName: "Amina Wanjiru", farmerId: "f1", farmerName: "Kiambu Green Pastures", amount: 87000, type: "sale", status: "completed", paymentMethod: "mpesa", createdAt: new Date(Date.now() - 5 * 86400000).toISOString() },
      { id: "t2", reference: "TXN-2024-002", orderId: "o2", orderNumber: "FM-2202", buyerId: "b1", buyerName: "Amina Wanjiru", farmerId: "f2", farmerName: "Nakuru Boran Ranch", amount: 125000, type: "sale", status: "completed", paymentMethod: "bank", createdAt: new Date(Date.now() - 2 * 86400000).toISOString() },
    ];
  }
  if (_disputes.length === 0) {
    _disputes = [
      { id: "d1", orderId: "o3", orderNumber: "FM-2203", buyerId: "b2", buyerName: "David Ochieng", farmerId: "f1", farmerName: "Kiambu Green Pastures", reason: "Goat weight mismatch vs listing description.", status: "open", createdAt: new Date(Date.now() - 1 * 86400000).toISOString() },
    ];
  }
  if (_announcements.length === 0) {
    _announcements = [
      { id: "a1", title: "Welcome to Farmart", message: "Platform is now live. Buy and sell livestock directly from farmers.", audience: "all", published: true, createdAt: new Date(Date.now() - 30 * 86400000).toISOString() },
    ];
  }
  persistAll();
}

ensureDemoData();

export const api = {
  delay,

  getUsers: async () => { await delay(); return [..._users]; },
  getUser: async (id) => { await delay(); return _users.find((u) => u.id === id) || null; },
  updateUser: async (id, updates) => { await delay(); const idx = _users.findIndex((u) => u.id === id); if (idx === -1) throw new Error("User not found"); _users[idx] = { ..._users[idx], ...updates }; persistAll(); return _users[idx]; },
  deleteUser: async (id) => { await delay(); _users = _users.filter((u) => u.id !== id); persistAll(); return { success: true }; },

  getListings: async (filters = {}) => { await delay(); let result = [..._listings]; if (filters.farmerId) result = result.filter((l) => l.farmerId === filters.farmerId); if (filters.status) result = result.filter((l) => l.status === filters.status); if (filters.flaggedOnly) result = result.filter((l) => l.isFlagged); if (filters.type) result = result.filter((l) => l.type === filters.type); if (filters.search) { const s = filters.search.toLowerCase(); result = result.filter((l) => l.title.toLowerCase().includes(s) || l.breed.toLowerCase().includes(s) || l.location.toLowerCase().includes(s) || l.farmerName.toLowerCase().includes(s)); } result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); return result; },
  getListing: async (id) => { await delay(); return _listings.find((l) => l.id === id) || null; },
  createListing: async (data) => { await delay(400); const listing = { ...data, id: "l" + Date.now(), status: data.status || "active", isFlagged: false, flagReason: null, rating: 0, reviewCount: 0, createdAt: new Date().toISOString() }; _listings.push(listing); persistAll(); return listing; },
  updateListing: async (id, updates) => { await delay(400); const idx = _listings.findIndex((l) => l.id === id); if (idx === -1) throw new Error("Listing not found"); _listings[idx] = { ..._listings[idx], ...updates }; persistAll(); return _listings[idx]; },
  deleteListing: async (id) => { await delay(); _listings = _listings.filter((l) => l.id !== id); persistAll(); return { success: true }; },
  approveListing: async (id) => { await delay(); const idx = _listings.findIndex((l) => l.id === id); if (idx !== -1) { _listings[idx] = { ..._listings[idx], isFlagged: false, flagReason: null, status: "active" }; persistAll(); } return { id, isFlagged: false }; },
  suspendListing: async (id) => { await delay(); const idx = _listings.findIndex((l) => l.id === id); if (idx !== -1) { _listings[idx] = { ..._listings[idx], status: "archived" }; persistAll(); } return { id, status: "archived" }; },

  getOrders: async (filters = {}) => { await delay(); let result = [..._orders]; if (filters.buyerId) result = result.filter((o) => o.buyerId === filters.buyerId); if (filters.farmerId) result = result.filter((o) => o.farmerId === filters.farmerId); if (filters.status) result = result.filter((o) => o.status === filters.status); result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); return result; },
  getOrder: async (id) => { await delay(); return _orders.find((o) => o.id === id) || null; },
  createOrder: async (data) => { await delay(500); const order = { ...data, id: "o" + Date.now(), orderNumber: "FM-" + (2200 + _orders.length + 1), status: "pending", paymentStatus: "pending", timeline: [{ status: "pending", date: new Date().toISOString(), note: "Order placed" }], createdAt: new Date().toISOString() }; _orders.push(order); persistAll(); return order; },
  updateOrderStatus: async (id, status, note) => { await delay(); const idx = _orders.findIndex((o) => o.id === id); if (idx === -1) throw new Error("Order not found"); _orders[idx].status = status; _orders[idx].timeline.push({ status, date: new Date().toISOString(), note: note || status }); persistAll(); return _orders[idx]; },
  cancelOrder: async (id) => { await delay(); const idx = _orders.findIndex((o) => o.id === id); if (idx === -1) throw new Error("Order not found"); if (["delivered", "cancelled"].includes(_orders[idx].status)) throw new Error("Cannot cancel this order."); _orders[idx].status = "cancelled"; _orders[idx].timeline.push({ status: "cancelled", date: new Date().toISOString(), note: "Order cancelled" }); persistAll(); return _orders[idx]; },

  getReviews: async (filters = {}) => { await delay(); let result = [..._reviews]; if (filters.listingId) result = result.filter((r) => r.listingId === filters.listingId); if (filters.buyerId) result = result.filter((r) => r.buyerId === filters.buyerId); result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); return result; },
  createReview: async (data) => { await delay(300); const review = { ...data, id: "r" + Date.now(), createdAt: new Date().toISOString() }; _reviews.push(review); persistAll(); return review; },

  getTransactions: async () => { await delay(); return [..._transactions].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); },
  createTransaction: async (data) => { await delay(); const txn = { ...data, id: "t" + Date.now(), reference: "TXN-2024-" + String(_transactions.length + 1).padStart(3, "0"), createdAt: new Date().toISOString() }; _transactions.push(txn); persistAll(); return txn; },

  getDisputes: async (filters = {}) => { await delay(); let result = [..._disputes]; if (filters.status) result = result.filter((d) => d.status === filters.status); result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); return result; },
  resolveDispute: async (id) => { await delay(); const idx = _disputes.findIndex((d) => d.id === id); if (idx === -1) throw new Error("Dispute not found"); _disputes[idx].status = "resolved"; persistAll(); return { id, status: "resolved" }; },

  getAnnouncements: async () => { await delay(); return [..._announcements].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); },
  createAnnouncement: async (data) => { await delay(); const ann = { ...data, id: "a" + Date.now(), published: true, createdAt: new Date().toISOString() }; _announcements.push(ann); persistAll(); return ann; },
  deleteAnnouncement: async (id) => { await delay(); _announcements = _announcements.filter((a) => a.id !== id); persistAll(); return { success: true }; },

  getCart: async () => { await delay(); return [..._cart]; },
  addToCart: async (item) => { await delay(); const existing = _cart.find((c) => c.listingId === item.listingId); if (existing) { existing.quantity += item.quantity || 1; } else { _cart.push({ ...item, quantity: item.quantity || 1, addedAt: new Date().toISOString() }); } persistAll(); return _cart; },
  removeFromCart: async (listingId) => { await delay(); _cart = _cart.filter((c) => c.listingId !== listingId); persistAll(); return _cart; },
  updateCartQuantity: async (listingId, quantity) => { await delay(); if (quantity <= 0) { _cart = _cart.filter((c) => c.listingId !== listingId); } else { const item = _cart.find((c) => c.listingId === listingId); if (item) item.quantity = quantity; } persistAll(); return _cart; },
  clearCart: async () => { await delay(); _cart = []; persistAll(); return []; },

  getWishlist: async () => { await delay(); return [..._wishlist]; },
  addToWishlist: async (item) => { await delay(); if (!_wishlist.find((w) => w.listingId === item.listingId)) { _wishlist.push({ ...item, addedAt: new Date().toISOString() }); persistAll(); } return _wishlist; },
  removeFromWishlist: async (listingId) => { await delay(); _wishlist = _wishlist.filter((w) => w.listingId !== listingId); persistAll(); return _wishlist; },
  isInWishlist: async (listingId) => { await delay(); return _wishlist.some((w) => w.listingId === listingId); },

  getNotifications: async () => { await delay(); return [..._notifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); },
  addNotification: async (notification) => { await delay(); _notifications.push({ ...notification, id: "n" + Date.now(), read: false, createdAt: new Date().toISOString() }); persistAll(); return _notifications; },
  markNotificationRead: async (id) => { await delay(); const n = _notifications.find((x) => x.id === id); if (n) { n.read = true; persistAll(); } return n; },
  markAllNotificationsRead: async () => { await delay(); _notifications.forEach((n) => { n.read = true; }); persistAll(); return _notifications; },
  clearNotifications: async () => { await delay(); _notifications = []; persistAll(); return []; },

  login: async (email, password) => { await delay(500); const user = _users.find((u) => u.email === email && u.password === password); if (!user) throw new Error("Invalid email or password."); return { id: user.id, email: user.email, name: user.name, role: user.role, farmName: user.farmName, location: user.location, contact: user.contact, description: user.description, isVerified: user.isVerified, rating: user.rating, reviewCount: user.reviewCount, joinedAt: user.joinedAt }; },
  register: async (data) => { await delay(500); if (_users.some((u) => u.email === data.email)) throw new Error("An account with this email already exists."); const user = { id: "u" + Date.now(), ...data, isVerified: false, rating: 0, reviewCount: 0, joinedAt: new Date().toISOString() }; _users.push(user); persistAll(); return { id: user.id, email: user.email, name: user.name, role: user.role, farmName: user.farmName, location: user.location, contact: user.contact, description: user.description, isVerified: user.isVerified, rating: user.rating, reviewCount: user.reviewCount, joinedAt: user.joinedAt }; },

  getMetrics: async () => { await delay(); return { totalUsers: _users.length, farmers: _users.filter((u) => u.role === "farmer").length, buyers: _users.filter((u) => u.role === "buyer").length, activeListings: _listings.filter((l) => l.status === "active").length, gmvThisMonth: _orders.filter((o) => o.status !== "cancelled").reduce((sum, o) => sum + o.total, 0), openDisputes: _disputes.filter((d) => d.status === "open").length, totalOrders: _orders.length, totalRevenue: _transactions.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.amount, 0) }; },
  getPendingFarmers: async () => { await delay(); return _users.filter((u) => u.role === "farmer" && !u.isVerified); },
  verifyFarmer: async (userId) => { await delay(); const idx = _users.findIndex((u) => u.id === userId); if (idx !== -1) { _users[idx].isVerified = true; persistAll(); } return { id: userId, isVerified: true }; },
  rejectFarmer: async (userId) => { await delay(); _users = _users.filter((u) => u.id !== userId); persistAll(); return { id: userId, isVerified: false }; },

  resetAll: async () => { await delay(); localStorage.removeItem("farmart_users"); localStorage.removeItem("farmart_listings"); localStorage.removeItem("farmart_orders"); localStorage.removeItem("farmart_reviews"); localStorage.removeItem("farmart_transactions"); localStorage.removeItem("farmart_disputes"); localStorage.removeItem("farmart_announcements"); localStorage.removeItem("farmart_cart"); localStorage.removeItem("farmart_wishlist"); localStorage.removeItem("farmart_notifications"); _users = []; _listings = []; _orders = []; _reviews = []; _transactions = []; _disputes = []; _announcements = []; _cart = []; _wishlist = []; _notifications = []; ensureDemoData(); return { success: true }; },
};
