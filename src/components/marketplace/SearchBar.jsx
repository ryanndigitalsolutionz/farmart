
const outer = {
  position: "relative",
  width: "100%",
  maxWidth: 560,
};

const input = {
  width: "100%",
  padding: "11px 14px 11px 38px",
  borderRadius: 10,
  border: "1px solid var(--border, #DCE6D8)",
  background: "#fff",
  fontSize: 14,
  color: "var(--text-dark, #1E2A1F)",
  outline: "none",
};

const icon = {
  position: "absolute",
  left: 12,
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: 16,
  color: "var(--text-muted, #66766A)",
  pointerEvents: "none",
};

export default function SearchBar({ value, onChange, placeholder = "Search livestock..." }) {
  return (
    <div style={outer}>
      <span aria-hidden="true" style={icon}>🔍</span>
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={input}
      />
    </div>
  );
}
