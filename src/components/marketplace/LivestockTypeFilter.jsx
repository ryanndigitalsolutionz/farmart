import Select from "../../common/Select";

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

export default function LivestockTypeFilter({ value, onChange, options = [
  { value: "", label: "All types" },
  { value: "cattle", label: "Cattle" },
  { value: "goat", label: "Goat" },
  { value: "sheep", label: "Sheep" },
  { value: "poultry", label: "Poultry" },
] }) {
  return (
    <div style={outer}>
      <label style={label}>Type</label>
      <Select value={value} onChange={onChange} options={options} />
    </div>
  );
}
