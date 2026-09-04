import PageHeader from "../../components/layout/PageHeader";
import { useEffect, useState } from "react";
import { getAnnouncements, sendAnnouncement } from "../../services/adminApi";

export default function Announcements() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAnnouncements = () => {
    getAnnouncements()
      .then(setAnnouncements)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const handleSend = async () => {
    if (!title.trim() || !message.trim()) return;
    setSending(true);
    setSent(false);
    setError(null);
    try {
      await sendAnnouncement({ authorId: 1, title, message });
      setSent(true);
      setTitle("");
      setMessage("");
      loadAnnouncements();
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <PageHeader title="Announcements" subtitle="Broadcast a message to all users" />
      <div style={{ maxWidth: 480 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Announcement title…"
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 8,
            border: "1px solid var(--border, #DCE6D8)",
            marginBottom: 12,
            fontFamily: "inherit",
          }}
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="Write your announcement…"
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 8,
            border: "1px solid var(--border, #DCE6D8)",
            marginBottom: 12,
            fontFamily: "inherit",
          }}
        />
        <button
          onClick={handleSend}
          disabled={sending}
          style={{
            background: "var(--green-700, #2F6D3F)",
            color: "#fff",
            border: "none",
            padding: "9px 16px",
            borderRadius: 8,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {sending ? "Sending…" : "Send announcement"}
        </button>
        {sent && <p style={{ color: "var(--green-700, #2F6D3F)", marginTop: 8 }}>Sent.</p>}
        {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}
      </div>

      <div style={{ marginTop: 32, maxWidth: 480 }}>
        <h3 style={{ fontSize: 14, marginBottom: 10 }}>Past announcements</h3>
        {loading && <p>Loading…</p>}
        {!loading && announcements.length === 0 && <p>No announcements yet.</p>}
        {!loading &&
          announcements.map((a) => (
            <div
              key={a.id}
              style={{
                border: "1px solid var(--border, #DCE6D8)",
                borderRadius: 8,
                padding: "10px 12px",
                marginBottom: 8,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 13 }}>{a.title}</div>
              <div style={{ fontSize: 12.5, color: "var(--text-muted, #66766A)" }}>{a.message}</div>
            </div>
          ))}
      </div>
    </div>
  );
}