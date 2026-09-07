const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

let mockMetrics = {
  total_users: 2314,
  farmers: 320,
  buyers: 930,
  active_listings: 861,
  gmv_this_month: "3600000",
  open_disputes: 3,
};

let mockFarmers = [
  { id: 1, farm_name: "Kiambu Green Pastures", location: "Kiambu, Kenya", is_verified: false },
  { id: 2, farm_name: "Nakuru Boran Ranch", location: "Nakuru, Kenya", is_verified: false },
  { id: 3, farm_name: "Meru Highland Farm", location: "Meru, Kenya", is_verified: true },
];

let mockListings = [
  { id: 101, breed: "Boran Bull", location: "Nakuru", status: "available", is_flagged: true, flag_reason: "price outlier" },
  { id: 102, breed: "Galla Goat", location: "Meru", status: "available", is_flagged: true, flag_reason: "duplicate listing" },
];

let mockDisputes = [
  { id: 1, order_id: "FM-2231", reason: "Buyer reports animal weight mismatch vs. listing.", status: "open" },
  { id: 2, order_id: "FM-2245", reason: "Payment sent but order still shows pending.", status: "open" },
];

let mockCommission = 2.5;

const mockFarmerDetail = {
  1: {
    id: 1, user_id: 501, farm_name: "Kiambu Green Pastures", location: "Kiambu, Kenya",
    phone_number: "0712 345 678", email: "greenvalleyfarm@gmail.com",
    description: "We raise healthy livestock with love and care. Vaccinated, grass-fed.",
    is_verified: false, joined_date: "Mar 2023", listing_count: 18, animals_sold: 24, rating: 4.8,
  },
};

const mockBuyerDetail = {
  1: {
    id: 1, user_id: 601, full_name: "Amina Wanjiru", email: "amina@example.com",
    delivery_location: "Nairobi CBD", is_active: true, joined_date: "Jan 2024",
    order_count: 3, total_spent: "142000",
    recent_orders: [
      { id: "FM-2214", status: "delivered", total_amount: "78000" },
      { id: "FM-2231", status: "pending", total_amount: "12000" },
    ],
  },
};

export const getPlatformMetrics = async () => { await delay(); return mockMetrics; };
export const getUsers = async () => { await delay(); return []; };
export const suspendUser = async (userId) => { await delay(); return { id: userId, is_active: false }; };
export const reactivateUser = async (userId) => { await delay(); return { id: userId, is_active: true }; };

export const getPendingFarmers = async () => { await delay(); return mockFarmers.filter((f) => !f.is_verified); };
export const getFarmerDetail = async (farmerId) => { await delay(); return mockFarmerDetail[farmerId] || mockFarmerDetail[1]; };
export const verifyFarmer = async (farmerId) => {
  await delay();
  mockFarmers = mockFarmers.map((f) => (f.id === Number(farmerId) ? { ...f, is_verified: true } : f));
  return { id: farmerId, is_verified: true };
};
export const rejectFarmer = async (farmerId, reason) => {
  await delay();
  mockFarmers = mockFarmers.filter((f) => f.id !== Number(farmerId));
  return { id: farmerId, is_verified: false, reason };
};

export const getBuyerDetail = async (buyerId) => { await delay(); return mockBuyerDetail[buyerId] || mockBuyerDetail[1]; };

export const getListingsForReview = async ({ flaggedOnly = true } = {}) => {
  await delay();
  return flaggedOnly ? mockListings.filter((l) => l.is_flagged) : mockListings;
};
export const approveListing = async (animalId) => {
  await delay();
  mockListings = mockListings.map((l) => (l.id === animalId ? { ...l, is_flagged: false } : l));
  return { id: animalId, is_flagged: false };
};
export const suspendListing = async (animalId, reason) => {
  await delay();
  mockListings = mockListings.filter((l) => l.id !== animalId);
  return { id: animalId, status: "reserved", reason };
};
export const getCommissionRate = async () => { await delay(); return { percentage: mockCommission }; };
export const updateCommissionRate = async (percentage) => { await delay(); mockCommission = percentage; return { percentage }; };

export const getDisputes = async ({ status = "open" } = {}) => {
  await delay();
  return mockDisputes.filter((d) => d.status === status);
};
export const resolveDispute = async (disputeId, resolutionNotes) => {
  await delay();
  mockDisputes = mockDisputes.filter((d) => d.id !== disputeId);
  return { id: disputeId, status: "resolved", resolutionNotes };
};

export const getAnnouncements = async () => { await delay(); return []; };
export const saveAnnouncement = async (payload) => { await delay(); return { id: Date.now(), ...payload }; };