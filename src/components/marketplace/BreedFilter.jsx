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

export default function BreedFilter({ value, onChange, options = [
  { value: "", label: "All breeds" },
  { value: "Boran", label: "Boran" },
  { value: "Friesian", label: "Friesian" },
  { value: "Galla", label: "Galla" },
  { value: "Boer", label: "Boer" },
  { value: "Dorper", label: "Dorper" },
  { value: "Kienyeji", label: "Kienyeji" },
] }) {
  return (
    <div style={outer}>
      <label style={label}>Breed</label>
      <Select value={value} onChange={onChange} options={options} />
    </div>
  );
}
