
const outer = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
};

const labelStyle = {
  fontFamily: "var(--font-display, 'Fraunces', serif)",
  fontSize: 13,
  fontWeight: 600,
  color: "var(--text-dark, #1E2A1F)",
};

const textareaBase = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid var(--border, #DCE6D8)",
  fontSize: 14,
  color: "var(--text-dark, #1E2A1F)",
  background: "#fff",
  outline: "none",
  resize: "vertical",
};

const errorText = {
  color: "#c53030",
  fontSize: 12,
  marginTop: 4,
};

export default function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  error,
}) {
  return (
    <div style={outer}>
      {label && <label htmlFor={name} style={labelStyle}>{label}</label>}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        style={{
          ...textareaBase,
          borderColor: error ? "#c53030" : textareaBase.borderColor,
        }}
      />
      {error && <span style={errorText}>{error}</span>}
    </div>
  );
}
