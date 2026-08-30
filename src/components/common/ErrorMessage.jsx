
const outer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
  padding: "18px 20px",
  background: "#fff5f5",
  border: "1px solid #feb2b2",
  borderRadius: 12,
  color: "#742a2a",
};

const text = {
  fontSize: 14,
  lineHeight: 1.5,
  textAlign: "center",
};

export default function ErrorMessage({ message, onRetry, retryLabel = "Try again" }) {
  return (
    <div style={outer} role="alert">
      <span style={{ fontSize: 22 }} aria-hidden="true">⚠️</span>
      <p style={text}>{message}</p>
      {typeof onRetry === "function" && (
        <button
          type="button"
          onClick={onRetry}
          style={{
            padding: "6px 14px",
            borderRadius: 8,
            border: "1px solid #742a2a",
            background: "#742a2a",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
}
