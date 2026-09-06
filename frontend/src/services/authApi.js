const API_BASE_URL = "http://127.0.0.1:5000";

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
