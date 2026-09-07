
const root = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "3px 10px",
  borderRadius: 999,
  fontSize: 12.5,
  fontWeight: 700,
  lineHeight: 1.4,
};

const variants = {
  success: { background: "rgba(39, 122, 68, 0.1)", color: "var(--color-primary)" },
  warning: { background: "rgba(232, 185, 61, 0.15)", color: "var(--color-warning)" },
  danger: { background: "rgba(197, 48, 48, 0.1)", color: "var(--color-danger)" },
  info: { background: "var(--color-surface-secondary)", color: "var(--color-text-muted)" },
};

export default function Badge({ children, variant = "info" }) {
  const style = { ...root, ...(variants[variant] || variants.info) };
  return <span style={style}>{children}</span>;
}
