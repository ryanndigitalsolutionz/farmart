const API_BASE_URL = "http://127.0.0.1:5000";

async function parseJsonOrThrow(response, fallbackMessage) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || data.message || fallbackMessage);
  }

  return data;
}

export async function getCurrentUser() {
  const response = await fetch(`${API_BASE_URL}/api/profile/me`, {
    credentials: "include",
  });
  return parseJsonOrThrow(response, "Failed to load current user.");
}

export async function getOverview() {
  const response = await fetch(`${API_BASE_URL}/api/admin/overview`, {
    credentials: "include",
  });
  return parseJsonOrThrow(response, "Failed to load dashboard overview.");
}

export async function getUsers() {
  const response = await fetch(`${API_BASE_URL}/api/users`, {
    credentials: "include",
  });
  const data = await parseJsonOrThrow(response, "Failed to load users.");
  return data.users;
}

export async function getOrders() {
  const response = await fetch(`${API_BASE_URL}/api/orders`, {
    credentials: "include",
  });
  return parseJsonOrThrow(response, "Failed to load orders.");
}

export async function getPayments() {
  const response = await fetch(`${API_BASE_URL}/api/payments`, {
    credentials: "include",
  });
  return parseJsonOrThrow(response, "Failed to load payments.");
}

export async function getFarmers() {
  const response = await fetch(`${API_BASE_URL}/api/farmers`, {
    credentials: "include",
  });
  return parseJsonOrThrow(response, "Failed to load farmers.");
}

export async function getFarmerDetail(farmerId) {
  const response = await fetch(`${API_BASE_URL}/api/farmers/${farmerId}`, {
    credentials: "include",
  });
  return parseJsonOrThrow(response, "Farmer not found.");
}

export async function verifyFarmer(farmerId) {
  const response = await fetch(`${API_BASE_URL}/api/farmers/${farmerId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ action: "verify" }),
  });
  return parseJsonOrThrow(response, "Failed to verify farmer.");
}

export async function rejectFarmer(farmerId, reason) {
  const response = await fetch(`${API_BASE_URL}/api/farmers/${farmerId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ action: "reject", reason }),
  });
  return parseJsonOrThrow(response, "Failed to reject farmer.");
}

export async function getBuyers() {
  const response = await fetch(`${API_BASE_URL}/api/buyers`, {
    credentials: "include",
  });
  return parseJsonOrThrow(response, "Failed to load buyers.");
}

export async function getBuyerDetail(buyerId) {
  const response = await fetch(`${API_BASE_URL}/api/buyers/${buyerId}`, {
    credentials: "include",
  });
  return parseJsonOrThrow(response, "Buyer not found.");
}

export async function verifyUser(userId) {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ is_verified: true }),
  });
  return parseJsonOrThrow(response, "Failed to verify account.");
}

export async function suspendUser(userId) {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ is_active: false }),
  });
  return parseJsonOrThrow(response, "Failed to suspend account.");
}

export async function reactivateUser(userId) {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ is_active: true }),
  });
  return parseJsonOrThrow(response, "Failed to reactivate account.");
}

export async function getCommissionRate() {
  const response = await fetch(`${API_BASE_URL}/api/admin/commission`, {
    credentials: "include",
  });
  return parseJsonOrThrow(response, "Failed to load commission rate.");
}

export async function updateCommissionRate(percentage) {
  const response = await fetch(`${API_BASE_URL}/api/admin/commission`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ percentage }),
  });
  return parseJsonOrThrow(response, "Failed to update commission rate.");
}

export async function getAnnouncements() {
  const response = await fetch(`${API_BASE_URL}/api/announcements`);
  return parseJsonOrThrow(response, "Failed to load announcements.");
}

export async function sendAnnouncement({ authorId, title, message }) {
  const response = await fetch(`${API_BASE_URL}/api/announcements`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ author_id: authorId, title, message }),
  });
  return parseJsonOrThrow(response, "Failed to send announcement.");
}

// The features below (listing moderation flags, buyer/farmer disputes)
// have no backing model or endpoint on the server yet. Left as inert
// stubs so the pages that call them render an empty state instead of
// crashing, until that backend work exists.

export async function getListingsForReview({ flaggedOnly } = {}) {
  void flaggedOnly;
  return [];
}

export async function approveListing(animalId) {
  void animalId;
  return { success: true };
}

export async function suspendListing(animalId, reason) {
  void animalId;
  void reason;
  return { success: true };
}

export async function getDisputes({ status } = {}) {
  void status;
  return [];
}

export async function resolveDispute(disputeId, notes) {
  void disputeId;
  void notes;
  return { success: true };
}
