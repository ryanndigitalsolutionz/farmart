import API_BASE_URL from "../api/api";

async function parseJsonOrThrow(response, fallbackMessage) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.error || data.message || fallbackMessage
    );
  }

  return data;
}

export async function getMyProfile() {
  const response = await fetch(
    `${API_BASE_URL}/api/profile/me`,
    {
      credentials: "include",
    }
  );

  return parseJsonOrThrow(
    response,
    "Failed to load your profile."
  );
}

export async function createFarmProfile(userId, data) {
  const response = await fetch(
    `${API_BASE_URL}/api/profile/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );

  return parseJsonOrThrow(
    response,
    "Failed to save your farm profile."
  );
}

export async function updateFarmProfile(userId, data) {
  const response = await fetch(
    `${API_BASE_URL}/api/profile/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );

  return parseJsonOrThrow(
    response,
    "Failed to update your farm profile."
  );
}
