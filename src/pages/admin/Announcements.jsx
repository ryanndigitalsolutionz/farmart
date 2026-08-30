import { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import { api } from "../../api";

export default function Announcements() {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const all = await api.getAnnouncements();
        if (!cancelled) setAnnouncements(all);
      } catch {
        // ignore
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const handleSend = async () => {
    if (!message.trim()) return;
    setSending(true);
    setSent(false);
    try {
      const created = await api.createAnnouncement({
        title: message.slice(0, 60),
        message,
        audience: "all",
        published: true,
      });
      setAnnouncements((prev) => [created, ...prev]);
      setMessage("");
      setSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <PageHeader title="Announcements" subtitle="Broadcast a message to all users" />
      <div style={{ maxWidth: 480, marginBottom: 28 }}>
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
            background: "var(--white, #fff)",
            color: "var(--text-dark, #1E2A1F)",
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
      </div>

      {announcements.length > 0 && (
        <div style={{ maxWidth: 480, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Recent announcements</div>
          {announcements.map((ann) => (
            <div key={ann.id} style={{ border: "1px solid var(--border, #DCE6D8)", borderRadius: 10, padding: "10px 14px", background: "var(--white, #fff)" }}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{ann.title || "Announcement"}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted, #66766A)", marginTop: 2 }}>{ann.message}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted, #66766A)", marginTop: 4 }}>
                {ann.createdAt ? new Date(ann.createdAt).toLocaleDateString() : "—"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}