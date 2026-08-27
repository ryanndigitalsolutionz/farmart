
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

const inputBase = {
  padding: "10px 12px",
  borderRadius: "var(--radius-md, 12px)",
  border: "1px solid var(--color-border)",
  fontSize: 14,
  color: "var(--color-text)",
  background: "var(--color-surface)",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

const errorInput = {
  borderColor: "var(--color-danger)",
};

const errorText = {
  color: "var(--color-danger)",
  fontSize: 12,
  marginTop: 4,
};

export default function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  required,
}) {
  return (
    <div style={outer}>
      {label && (
        <label htmlFor={name} style={labelStyle}>
          {label}
          {required && <span style={{ color: "var(--color-danger)" }}> *</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          ...inputBase,
          ...(error ? errorInput : {}),
          borderColor: error ? "var(--color-danger)" : inputBase.borderColor,
        }}
      />
      {error && <span style={errorText}>{error}</span>}
    </div>
  );
}
