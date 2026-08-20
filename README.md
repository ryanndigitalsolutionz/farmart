# Farmart — Team Role Assignments

| Member | Role / Flow | Pages | Components | Shared files used |
|---|---|---|---|---|
| **Ryan** | Auth Flow | Welcome.jsx, Login.jsx, Register.jsx, FarmSetup.jsx | components/common/ (Button, Input, Select, Textarea, Modal, Badge, Spinner, Loader, ErrorMessage) | AuthContext.jsx, authApi.js, useAuth.js, ProtectedRoute.jsx |
| **Faith** | Buyer Flow | marketplace/Livestock.jsx, marketplace/LivestockDetails.jsx, buyer/Cart.jsx, buyer/Orders.jsx | components/livestock/, components/marketplace/, components/cart/, components/orders/, components/reviews/ | CartContext.jsx, OrderContext.jsx, WishlistContext.jsx, livestockApi.js, buyerApi.js, orderApi.js, paymentApi.js, useCart.js, useOrders.js, useWishlist.js, useDebounce.js, BuyerRoute.jsx |
| **Martin** | Farmer Flow | farmer/Dashboard.jsx, farmer/CreateListing.jsx, farmer/Orders.jsx, farmer/Analytics.jsx | components/farmer/, components/listings/ | farmerApi.js, orderApi.js, useFarmers.js, FarmerRoute.jsx |
| **Yoshua** | Admin Flow | admin/Dashboard.jsx, admin/Listings.jsx, admin/Disputes.jsx | components/layout/ (Sidebar, DashboardLayout, PageHeader) | AdminContext.jsx, adminApi.js, AdminRoute.jsx |
| **Shadrack** | Shared Foundation (build first — others depend on this) | — (no pages) | components/layout/ (Navbar, Footer, MobileNav), components/payments/ | apiClient.js, storageService.js, useLocalStorage.js, NotificationContext.jsx, routes/AppRoutes.jsx, constants/*, utils/*, data/* |

## Notes

- **Shadrack's work lands first.** Everyone else's pages import from `apiClient.js`, `constants/`, and the mock `data/` files, so at minimum those need to exist before the other four can wire up real calls. Until then, others can build UI against hardcoded placeholder data.
- **`orderApi.js` and order-related context are shared between Faith and Martin** — buyers place orders (buyer/Cart.jsx, buyer/Orders.jsx) and farmers accept/reject them (farmer/Orders.jsx). Coordinate before both editing the same file independently; agree on the shape of an "order" object early.
- **`components/common/` (Button, Modal, Input, etc.) is used by every single page in the app.** Rome should treat this as day-one priority even before finishing the Auth pages themselves, since Faith, Martin, and Yoshua are all blocked on it for their own UI.
- **Cart.jsx (Faith) covers checkout + payment in one page** — no separate Checkout.jsx or Payment.jsx files exist in this trimmed structure.
- **buyer/Orders.jsx (Faith) has Orders and Wishlist as tabs on the same page** — no separate Wishlist.jsx file.


This is our Farmart Project