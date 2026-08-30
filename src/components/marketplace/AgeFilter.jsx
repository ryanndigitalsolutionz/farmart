
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

const input = {
  padding: "9px 10px",
  borderRadius: 10,
  border: "1px solid var(--border, #DCE6D8)",
  fontSize: 13.5,
  color: "var(--text-dark, #1E2A1F)",
  background: "#fff",
  outline: "none",
};

export default function AgeFilter({ value, onChange }) {
  return (
    <div style={outer}>
      <label style={label}>Age range</label>
      <select
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
        style={input}
      >
        <option value="">Any</option>
        <option value="under 1">Under 1 year</option>
        <option value="1-2">1 - 2 years</option>
        <option value="2-5">2 - 5 years</option>
        <option value="5+">5+ years</option>
      </select>
    </div>
  );
}
