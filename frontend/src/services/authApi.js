import API_BASE_URL from "../api/api";

export async function logout() {
  try {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } finally {
    localStorage.removeItem("farmartUser");
  }
}
