
const outer = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const label = {
  fontSize: 12.5,
  fontWeight: 600,
  color: "var(--text-dark, #1E2A1F)",
};

const row = {
  display: "flex",
  gap: 8,
  alignItems: "center",
};

const input = {
  padding: "9px 10px",
  borderRadius: 10,
  border: "1px solid var(--border, #DCE6D8)",
  fontSize: 13.5,
  color: "var(--text-dark, #1E2A1F)",
  background: "#fff",
  outline: "none",
  width: "100%",
};

const separator = {
  color: "var(--text-muted, #66766A)",
  fontSize: 13,
};

export default function PriceFilter({ min, max, onChange }) {
  return (
    <div style={outer}>
      <label style={label}>Price range (KES)</label>
      <div style={row}>
        <input
          type="number"
          placeholder="Min"
          value={min ?? ""}
          onChange={(e) => onChange?.(e.target.value ? Number(e.target.value) : undefined, max)}
          style={input}
        />
        <span style={separator}>—</span>
        <input
          type="number"
          placeholder="Max"
          value={max ?? ""}
          onChange={(e) => onChange?.(min, e.target.value ? Number(e.target.value) : undefined)}
          style={input}
        />
      </div>
    </div>
  );
}
