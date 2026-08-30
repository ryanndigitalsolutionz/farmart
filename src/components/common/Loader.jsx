import Spinner from "./Spinner";

const outer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  minHeight: 160,
};

const text = {
  fontFamily: "var(--font-body, 'Modern Antiqua', serif)",
  color: "var(--color-text-muted)",
  fontSize: 15,
};

export default function Loader({ message = "Loading..." }) {
  return (
    <div style={outer}>
      <Spinner size={40} />
      {message && <span style={text}>{message}</span>}
    </div>
  );
}
