const API_BASE_URL = "http://127.0.0.1:5000";

export async function getAnnouncements() {
  const response = await fetch(`${API_BASE_URL}/api/announcements`);
  const announcements = await response.json();
  return announcements;
}