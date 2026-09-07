import API_BASE_URL from "../api/api";

export async function getAnnouncements() {
  const response = await fetch(`${API_BASE_URL}/api/announcements`);
  const announcements = await response.json();
  return announcements;
}