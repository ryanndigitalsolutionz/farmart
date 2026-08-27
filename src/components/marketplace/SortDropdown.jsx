
const select = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid var(--border, #DCE6D8)",
  background: "#fff",
  fontSize: 13.5,
  color: "var(--text-dark, #1E2A1F)",
  cursor: "pointer",
  outline: "none",
};

export default function SortDropdown({ value, onChange, options = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top rated" },
] }) {
  return (
    <select value={value} onChange={(e) => onChange?.(e.target.value)} style={select}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}
