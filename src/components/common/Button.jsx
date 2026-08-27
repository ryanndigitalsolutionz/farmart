
const base = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  padding: "10px 16px",
  borderRadius: "var(--radius-md, 12px)",
  fontFamily: "var(--font-body, 'Modern Antiqua', serif)",
  fontWeight: 600,
  fontSize: 14,
  lineHeight: 1.2,
  border: "1px solid transparent",
  cursor: "pointer",
  transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
};

const variants = {
  primary: {
    background: "var(--color-primary)",
    color: "#fff",
    borderColor: "var(--color-primary)",
  },
  secondary: {
    background: "var(--color-surface-secondary)",
    color: "var(--color-primary)",
    borderColor: "var(--color-border)",
  },
  danger: {
    background: "var(--color-danger)",
    color: "#fff",
    borderColor: "var(--color-danger)",
  },
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled,
  loading,
  fullWidth,
  type = "button",
}) {
  const style = {
    ...base,
    ...variants[variant] || variants.primary,
    opacity: disabled || loading ? 0.65 : 1,
    cursor: disabled || loading ? "not-allowed" : "pointer",
    width: fullWidth ? "100%" : undefined,
  };

  return (
    <button type={type} style={style} onClick={onClick} disabled={disabled || loading}>
      {loading && (
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: 14,
            height: 14,
            borderRadius: "50%",
            border: "2px solid currentColor",
            borderTopColor: "transparent",
            animation: "spin 0.7s linear infinite",
          }}
        />
      )}
      {children}
    </button>
  );
}
