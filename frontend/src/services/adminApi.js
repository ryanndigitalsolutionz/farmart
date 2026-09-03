// TODO: replace every function below with real fetch("/api/admin/...") calls once backend endpoints are ready

export async function getListingsForReview({ flaggedOnly } = {}) {
  return []; // mock: no flagged listings yet
}

export async function approveListing(animalId) {
  return { success: true };
}

export async function suspendListing(animalId, reason) {
  return { success: true };
}

export async function getCommissionRate() {
  return { percentage: 10 };
}

export async function updateCommissionRate(percentage) {
  return { success: true };
}

export async function getDisputes({ status } = {}) {
  return []; // mock: no open disputes yet
}

export async function resolveDispute(disputeId, notes) {
  return { success: true };
}

export async function getFarmerDetail(farmerId) {
  // mock: replace with real fetch(`/api/admin/farmers/${farmerId}`) once backend is ready
  return {
    id: farmerId,
    farm_name: "Sample Farm",
    location: "Kiambu",
    joined_date: "2026-01-01",
    listing_count: 0,
    animals_sold: 0,
    rating: null,
    phone_number: "—",
    email: "—",
    description: "",
    is_verified: false,
    user_id: farmerId,
  };
}

export async function verifyFarmer(farmerId) {
  return { success: true };
}

export async function rejectFarmer(farmerId, reason) {
  return { success: true };
}

export async function suspendUser(userId) {
  return { success: true };
}