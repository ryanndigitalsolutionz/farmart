export const ROLES = {
  BUYER: 'buyer',
  FARMER: 'farmer',
  ADMIN: 'admin',
}

export const USER_ROLES = {
  [ROLES.BUYER]: 'Buyer',
  [ROLES.FARMER]: 'Farmer',
  [ROLES.ADMIN]: 'Admin',
}

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
}

export const LISTING_STATUS = {
  DRAFT: 'draft',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SOLD: 'sold',
  RESERVED: 'reserved',
  SUSPENDED: 'suspended',
}

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
}

export const PAYMENT_METHODS = {
  MPESA: 'mpesa',
  CARD: 'card',
  BANK_TRANSFER: 'bank_transfer',
  CASH_ON_DELIVERY: 'cash_on_delivery',
}

export const PAYMENT_METHOD_LABELS = {
  [PAYMENT_METHODS.MPESA]: 'M-Pesa',
  [PAYMENT_METHODS.CARD]: 'Card',
  [PAYMENT_METHODS.BANK_TRANSFER]: 'Bank Transfer',
  [PAYMENT_METHODS.CASH_ON_DELIVERY]: 'Cash on Delivery',
}

export const DISPUTE_STATUS = {
  OPEN: 'open',
  INVESTIGATING: 'investigating',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
}

export const NOTIFICATION_TYPES = {
  ORDER_PLACED: 'order_placed',
  ORDER_ACCEPTED: 'order_accepted',
  ORDER_REJECTED: 'order_rejected',
  PAYMENT_RECEIVED: 'payment_received',
  LISTING_APPROVED: 'listing_approved',
  LISTING_REJECTED: 'listing_rejected',
  LISTING_SOLD: 'listing_sold',
  PAYOUT_COMPLETED: 'payout_completed',
  REVIEW_RECEIVED: 'review_received',
}

export const LIVESTOCK_TYPES = {
  CATTLE: 'cattle',
  GOATS: 'goats',
  SHEEP: 'sheep',
  PIGS: 'pigs',
  POULTRY: 'poultry',
}

export const LIVESTOCK_TYPE_LABELS = {
  [LIVESTOCK_TYPES.CATTLE]: 'Cattle',
  [LIVESTOCK_TYPES.GOATS]: 'Goats',
  [LIVESTOCK_TYPES.SHEEP]: 'Sheep',
  [LIVESTOCK_TYPES.PIGS]: 'Pigs',
  [LIVESTOCK_TYPES.POULTRY]: 'Poultry',
}

export const HEALTH_STATUS = {
  EXCELLENT: 'excellent',
  GOOD: 'good',
  FAIR: 'fair',
  POOR: 'poor',
}

export const VACCINATION_STATUS = {
  FULLY_VACCINATED: 'fully_vaccinated',
  PARTIALLY_VACCINATED: 'partially_vaccinated',
  NOT_VACCINATED: 'not_vaccinated',
}

export const LISTING_STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'pending', label: 'Pending Approval' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'sold', label: 'Sold' },
  { value: 'reserved', label: 'Reserved' },
  { value: 'suspended', label: 'Suspended' },
]

export const KENYAN_LOCATIONS = [
  'Nairobi',
  'Nakuru',
  'Kiambu',
  'Eldoret',
  'Kisumu',
  'Nyeri',
  'Meru',
  'Machakos',
  'Mombasa',
  'Kakamega',
  'Nanyuki',
  'Thika',
]

export const PLATFORM_FEE_RATE = 0.02

export const BREEDS = {
  [LIVESTOCK_TYPES.CATTLE]: [
    'Friesian',
    'Ayrshire',
    'Guernsey',
    'Jersey',
    'Sahiwal',
    'Zebu',
    'Borana',
    'Maasai Zebu',
  ],
  [LIVESTOCK_TYPES.GOATS]: [
    'Boer',
    'Toggenburg',
    'Saanen',
    'Alpine',
    'Local Indigenous',
    'Somali',
  ],
  [LIVESTOCK_TYPES.SHEEP]: [
    'Merino',
    'Dorper',
    'Suffolk',
    'Romney',
    'Local Indigenous',
    'Red Maasai',
  ],
  [LIVESTOCK_TYPES.PIGS]: [
    'Large White',
    'Landrace',
    'Duroc',
    'Hampshire',
    'Local Indigenous',
  ],
  [LIVESTOCK_TYPES.POULTRY]: [
    'Broiler',
    'Layer',
    'Kienyeji',
    'Rhode Island Red',
    'Sussex',
    'Leghorn',
  ],
}

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'age', label: 'Age' },
  { value: 'popular', label: 'Most Popular' },
]

export const ROUTES = {
  HOME: '/',
  MARKETPLACE: '/marketplace',
  LIVESTOCK_DETAILS: '/livestock/:id',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  WELCOME: '/welcome',
  FARM_SETUP: '/farm-setup',

  BUYER_DASHBOARD: '/buyer',
  BUYER_CART: '/buyer/cart',
  BUYER_WISHLIST: '/buyer/wishlist',
  BUYER_ORDERS: '/buyer/orders',
  BUYER_ORDER_DETAILS: '/buyer/orders/:id',
  BUYER_PROFILE: '/buyer/profile',
  BUYER_REVIEWS: '/buyer/reviews',

  FARMER_DASHBOARD: '/farmer',
  FARMER_LISTINGS: '/farmer/listings',
  FARMER_CREATE_LISTING: '/farmer/listings/create',
  FARMER_EDIT_LISTING: '/farmer/listings/:id/edit',
  FARMER_ORDERS: '/farmer/orders',
  FARMER_PROFILE: '/farmer/profile',
  FARMER_ANALYTICS: '/farmer/analytics',
  FARMER_SALES_HISTORY: '/farmer/sales-history',
  FARMER_EARNINGS: '/farmer/earnings',

  ADMIN_DASHBOARD: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_FARMERS: '/admin/farmers',
  ADMIN_BUYERS: '/admin/buyers',
  ADMIN_LISTINGS: '/admin/listings',
  ADMIN_DISPUTES: '/admin/disputes',
  ADMIN_TRANSACTIONS: '/admin/transactions',
  ADMIN_REPORTS: '/admin/reports',
}

export const NAV_LINKS = {
  [ROLES.BUYER]: [
    { path: ROUTES.BUYER_DASHBOARD, label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: ROUTES.MARKETPLACE, label: 'Marketplace', icon: 'Store' },
    { path: ROUTES.BUYER_WISHLIST, label: 'Wishlist', icon: 'Heart' },
    { path: ROUTES.BUYER_CART, label: 'Cart', icon: 'ShoppingCart' },
    { path: ROUTES.BUYER_ORDERS, label: 'Orders', icon: 'ClipboardList' },
    { path: ROUTES.BUYER_PROFILE, label: 'Profile', icon: 'User' },
  ],
  [ROLES.FARMER]: [
    { path: ROUTES.FARMER_DASHBOARD, label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: ROUTES.FARMER_LISTINGS, label: 'My Listings', icon: 'Package' },
    { path: ROUTES.FARMER_ORDERS, label: 'Orders', icon: 'ClipboardList' },
    { path: ROUTES.FARMER_ANALYTICS, label: 'Analytics', icon: 'BarChart3' },
    { path: ROUTES.FARMER_EARNINGS, label: 'Earnings', icon: 'DollarSign' },
    { path: ROUTES.FARMER_PROFILE, label: 'Farm Profile', icon: 'User' },
  ],
  [ROLES.ADMIN]: [
    { path: ROUTES.ADMIN_DASHBOARD, label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: ROUTES.ADMIN_USERS, label: 'Users', icon: 'Users' },
    { path: ROUTES.ADMIN_LISTINGS, label: 'Listings', icon: 'Package' },
    { path: ROUTES.ADMIN_DISPUTES, label: 'Disputes', icon: 'AlertTriangle' },
    { path: ROUTES.ADMIN_TRANSACTIONS, label: 'Transactions', icon: 'CreditCard' },
    { path: ROUTES.ADMIN_REPORTS, label: 'Reports', icon: 'FileText' },
  ],
}
