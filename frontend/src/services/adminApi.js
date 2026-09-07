import API_BASE_URL from "../api/api";

async function request(url, options = {}) {
  const response = await fetch(url, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.error ||
      data.message ||
      "The request could not be completed."
    );
  }

  return data;
}

export async function getCurrentUser() {
  return request(`${API_BASE_URL}/api/profile/me`);
}

export async function getOverview() {
  return request(`${API_BASE_URL}/api/admin/overview`);
}

export async function getUsers() {
  const data = await request(`${API_BASE_URL}/api/users`);
  return data.users || data;
}

export async function getOrders() {
  return request(`${API_BASE_URL}/api/orders`);
}

export async function getPayments() {
  return request(`${API_BASE_URL}/api/payments`);
}

export async function getFarmers() {
  return request(`${API_BASE_URL}/api/farmers`);
}

export async function getFarmerDetail(farmerId) {
  return request(`${API_BASE_URL}/api/farmers/${farmerId}`);
}

export async function verifyFarmer(farmerId) {
  return request(`${API_BASE_URL}/api/farmers/${farmerId}`, {
    method: "PATCH",
    body: JSON.stringify({
      action: "verify",
    }),
  });
}

export async function rejectFarmer(farmerId, reason) {
  return request(`${API_BASE_URL}/api/farmers/${farmerId}`, {
    method: "PATCH",
    body: JSON.stringify({
      action: "reject",
      reason,
    }),
  });
}

export async function getBuyerDetail(buyerId) {
  const data = await request(`${API_BASE_URL}/api/users/${buyerId}`);
  return data.user || data;
}

export async function suspendUser(userId) {
  return request(`${API_BASE_URL}/api/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({
      action: "suspend",
    }),
  });
}

export async function getCommissionRate() {
  return request(`${API_BASE_URL}/api/admin/commission`);
}

export async function updateCommissionRate(percentage) {
  return request(`${API_BASE_URL}/api/admin/commission`, {
    method: "PATCH",
    body: JSON.stringify({
      percentage,
    }),
  });
}

export async function getAnnouncements() {
  return request(`${API_BASE_URL}/api/announcements`);
}

export async function sendAnnouncement({ authorId, title, message }) {
  return request(`${API_BASE_URL}/api/announcements`, {
    method: "POST",
    body: JSON.stringify({
      author_id: authorId,
      title,
      message,
    }),
  });
}

export async function getListingsForReview() {
  return [];
}

export async function approveListing() {
  return { success: true };
}

export async function suspendListing() {
  return { success: true };
}

export async function getDisputes() {
  return [];
}

export async function resolveDispute() {
  return { success: true };
}
