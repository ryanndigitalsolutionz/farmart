import PageHeader from "../../components/layout/PageHeader";
import { useState } from "react";

export default function Announcements() {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    setSending(true);
    setSent(false);
    try {
      await fetch("/api/admin/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({ message }),
      });
      setSent(true);
      setMessage("");
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <PageHeader title="Announcements" subtitle="Broadcast a message to all users" />
      <div style={{ maxWidth: 480 }}>
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
      </div>
    </div>
  );
}// commit 25
