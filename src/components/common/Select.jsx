
const outer = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
};

const labelStyle = {
  fontFamily: "var(--font-display, 'Fraunces', serif)",
  fontSize: 13,
  fontWeight: 600,
  color: "var(--color-text)",
};

const selectBase = {
  padding: "10px 12px",
  borderRadius: "var(--radius-md, 12px)",
  border: "1px solid var(--color-border)",
  fontSize: 14,
  color: "var(--color-text)",
  background: "var(--color-surface)",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

const errorText = {
  color: "var(--color-danger)",
  fontSize: 12,
  marginTop: 4,
};

export default function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder,
  error,
}) {
  return (
    <div style={outer}>
      {label && <label htmlFor={name} style={labelStyle}>{label}</label>}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        style={{
          ...selectBase,
          borderColor: error ? "var(--color-danger)" : selectBase.borderColor,
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
      {error && <span style={errorText}>{error}</span>}
    </div>
  );
}
