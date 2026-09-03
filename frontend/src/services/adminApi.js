// TODO: replace every function below with real fetch("/api/admin/...") calls once backend endpoints are ready

const API_BASE_URL = "http://127.0.0.1:5000";

export async function getUsers() {
  const response = await fetch(`${API_BASE_URL}/api/users`);
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || "Failed to load users.");
  }
  return data.users;
}

export async function getOrders() {
  const response = await fetch(`${API_BASE_URL}/api/orders`);
  const orders = await response.json();
  return orders;
}

export async function getPayments() {
  const response = await fetch(`${API_BASE_URL}/api/payments`);
  const payments = await response.json();
  return payments;
}

export async function getFarmers() {
  const response = await fetch(`${API_BASE_URL}/api/farmers`);
  const farmers = await response.json();
  return farmers;
}

export async function getFarmerDetail(farmerId) {
  const response = await fetch(`${API_BASE_URL}/api/farmers/${farmerId}`);
  if (!response.ok) {
    throw new Error("Farmer not found.");
  }
  const farmer = await response.json();
  return farmer;
}

export async function verifyFarmer(farmerId) {
  const response = await fetch(`${API_BASE_URL}/api/farmers/${farmerId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "verify" }),
  });
  return response.json();
}

export async function rejectFarmer(farmerId, reason) {
  const response = await fetch(`${API_BASE_URL}/api/farmers/${farmerId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "reject", reason }),
  });
  return response.json();
}

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

export async function suspendUser(userId) {
  return { success: true };
}