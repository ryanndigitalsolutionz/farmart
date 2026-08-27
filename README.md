# Farmart — Livestock Marketplace Frontend

## What is this?

Farmart is a **frontend-only React application** for a livestock marketplace connecting farmers and buyers in Kenya. There is **no backend** — all data is stored in `localStorage` and simulated with realistic demo data.

**Stack:**
- React 19 + Vite 8
- React Router 7
- Tailwind CSS 4 (CSS imported but app uses inline styles + CSS variables)
- Framer Motion (animations)
- Lucide React (icons)
- Recharts (analytics charts)
- React Context (global state)

## How to run

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` (or the port Vite reports).

## Demo accounts

| Role | Email | Password |
|------|-------|----------|
| Farmer | jomo@greenpastures.co.ke | demo1234 |
| Buyer | amina@example.com | demo1234 |
| Admin | admin@farmart.co.ke | admin123 |

You can also click the demo account buttons on the Login page to auto-fill credentials.

## Architecture

### Single Router
`BrowserRouter` exists **only** in `src/main.jsx`. All routes are defined in `src/routes/AppRoutes.jsx`.

### Route structure

**Public:**
- `/` — Welcome / role selection
- `/login` — Login
- `/register` — Register
- `/forgot-password` — Forgot password
- `/verify-email` — Email verification (simulated)
- `/reset-password` — Reset password
- `/farm-setup` — Farmer onboarding

**Buyer (`/buyer/*`):**
- `/buyer` — Dashboard
- `/buyer/marketplace` — Browse listings
- `/buyer/cart` — Shopping cart
- `/buyer/checkout` — Checkout (simulated payment)
- `/buyer/orders` — Order history
- `/buyer/orders/:id` — Order details
- `/buyer/wishlist` — Wishlist
- `/buyer/reviews` — Reviews
- `/buyer/profile` — Profile

**Farmer (`/farmer/*`):**
- `/farmer` — Dashboard
- `/farmer/listings` — My listings
- `/farmer/listings/new` — Create listing
- `/farmer/listings/:id` — Edit listing
- `/farmer/orders` — Incoming orders
- `/farmer/orders/:id` — Order details
- `/farmer/analytics` — Sales analytics (Recharts)
- `/farmer/profile` — Profile
- `/farmer/farm-profile` — Farm profile

**Admin (`/admin/*`):**
- `/admin` — Admin dashboard
- `/admin/users` — User management
- `/admin/farmers` — Farmer management
- `/admin/farmers/:id` — Farmer details
- `/admin/listings` — Listing moderation
- `/admin/orders` — Order oversight
- `/admin/transactions` — Transaction ledger
- `/admin/disputes` — Dispute management
- `/admin/reports` — Reports & charts
- `/admin/settings` — Platform settings
- `/admin/announcements` — Announcements
- `/admin/buyers/:id` — Buyer details

**Utility:**
- `/livestock/:id` — Public listing detail
- `/unauthorized` — 403 page
- `/404` — Catch-all 404 page

### Contexts (Global State)

| Context | Purpose |
|---------|---------|
| `AuthContext` | Authentication session, current user, login/logout/register |
| `ThemeContext` | Light/dark theme toggle |
| `AdminContext` | Admin metrics, refresh triggers |
| `CartContext` | Cart items, quantities, totals |
| `OrderContext` | Orders, create/update/cancel |
| `WishlistContext` | Wishlist items |
| `LivestockContext` | Marketplace listings cache |
| `NotificationContext` | In-app notifications |

### Data / API Layer

`src/api/index.js` contains the complete frontend service layer. All methods return Promises with simulated network delays. Data is persisted to `localStorage` with the `farmart_` prefix.

Key exports:
- `api.getUsers()`, `api.getUser()`, `api.updateUser()`, `api.deleteUser()`
- `api.getListings()`, `api.getListing()`, `api.createListing()`, `api.updateListing()`, `api.deleteListing()`, `api.approveListing()`, `api.suspendListing()`
- `api.getOrders()`, `api.getOrder()`, `api.createOrder()`, `api.updateOrderStatus()`, `api.cancelOrder()`
- `api.getReviews()`, `api.createReview()`
- `api.getTransactions()`, `api.createTransaction()`
- `api.getDisputes()`, `api.resolveDispute()`
- `api.getAnnouncements()`, `api.createAnnouncement()`, `api.deleteAnnouncement()`
- `api.getCart()`, `api.addToCart()`, `api.removeFromCart()`, `api.updateCartQuantity()`, `api.clearCart()`
- `api.getWishlist()`, `api.addToWishlist()`, `api.removeFromWishlist()`, `api.isInWishlist()`
- `api.getNotifications()`, `api.addNotification()`, `api.markNotificationRead()`, `api.markAllNotificationsRead()`, `api.clearNotifications()`
- `api.login()`, `api.register()`
- `api.getMetrics()`, `api.getPendingFarmers()`, `api.verifyFarmer()`, `api.rejectFarmer()`
- `api.resetAll()` — clears all demo data and re-seeds

### LocalStorage Architecture

All persistent data uses the `farmart_` prefix via `src/hooks/useLocalStorage.jsx`:
- `farmart_users`
- `farmart_listings`
- `farmart_orders`
- `farmart_reviews`
- `farmart_transactions`
- `farmart_disputes`
- `farmart_announcements`
- `farmart_cart`
- `farmart_wishlist`
- `farmart_notifications`
- `farmart_currentUser`
- `farmart_farmProfile`
- `farmart_emailVerified`
- `farmart_theme`

### Styling

The app uses **inline styles** with CSS custom properties for consistency:
- `--green-700, #2F6D3F` — primary actions
- `--green-900, #163420` — headings
- `--green-100, #EAF3E6` — subtle backgrounds
- `--text-muted, #66766A` — secondary text
- `--text-dark, #1E2A1F` — body text
- `--border, #DCE6D8` — borders
- `--white, #fff` — cards/backgrounds

Fonts: `IBM Plex Serif` for headings, `Modern Antiqua` for body text.

### Animations

Framer Motion is used for:
- Page transitions
- Card hover effects
- Admin dashboard metric cards
- List animations in admin pages

### Error Boundary

A global `ErrorBoundary` wraps the app in `main.jsx`. If any component crashes, a fallback UI with "Try Again" and "Go Home" buttons is shown.

## Frontend-only limitations

- **No real authentication** — sessions are simulated in localStorage
- **No real payments** — checkout shows "Demo payment completed"
- **No real backend API** — all data is local
- **No real email verification** — simulated via sessionStorage
- **No real file uploads** — images use FileReader for local preview only
- **No real-time updates** — data refreshes on navigation or manual action

## Demo data

First launch seeds realistic Kenyan marketplace data:
- 6 demo users (3 farmers, 2 buyers, 1 admin)
- 6 livestock listings (cattle, goats, sheep, poultry)
- 3 demo orders with timelines
- 2 reviews
- 2 transactions
- 1 dispute
- 1 announcement

## Reset demo data

Go to **Admin → Settings** and click **Reset Demo Data** to clear all localStorage and restore the seed dataset.

## Build

```bash
npm run build   # production build to dist/
npm run lint    # ESLint (configured for React 19)
```

## Project structure

```
src/
  api/           — Frontend service layer (localStorage-backed)
  auth/          — Legacy useAuth hook (redirects to context)
  components/    — Reusable UI components
    cart/        — Cart item, summary, empty state
    common/      — Button, Input, Modal, Badge, Spinner, etc.
    farmer/      — Farmer card, profile, rating
    layout/      — DashboardLayout, Sidebar, PageHeader, Navbar, Footer
    listings/    — Listing form, preview, image upload
    livestock/   — Livestock card, details, gallery, grid
    marketplace/ — Search, filters, sort
    orders/      — Order card, timeline, actions
    payments/    — Payment form, summary
    reviews/     — Review card, list
  constants/     — Routes, user roles, breeds, livestock types, orders, payments
  context/       — React Context providers
  data/          — Mock/seed data
  hooks/         — Custom hooks (useLocalStorage, useAuth, etc.)
  pages/         — Route-level page components
    admin/       — Admin pages
    auth/        — Auth pages
    buyer/       — Buyer pages
    farmer/      — Farmer pages
    marketplace/ — Marketplace pages
  routes/        — Route guards and AppRoutes
  utils/         — Utilities (formatCurrency, formatDate, validation, etc.)
```

## Known issues / future work

- The `src/auth/useAuth.js` hook is a legacy stub that returns hardcoded admin data. Use `useAuth()` from `src/context/AuthContext.jsx` instead.
- Tailwind CSS v4 is installed but the app primarily uses inline styles. Tailwind classes are not used in component code.
- Admin pages that previously called `/api/admin/...` have been rewritten to use the local API layer.
- Some admin pages (Reports) use Recharts with computed local data.
- The `Imput.jsx` typo was fixed to `Input.jsx`.
