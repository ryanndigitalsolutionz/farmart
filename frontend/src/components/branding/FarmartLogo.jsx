import { Leaf } from "lucide-react";

const sizes = {
  sm: { icon: 18, text: 16 },
  md: { icon: 22, text: 18 },
  lg: { icon: 26, text: 22 },
};

export default function FarmartLogo({ size = "md", className, style, suffix }) {
  const { icon, text } = sizes[size] || sizes.md;

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--font-display, 'Fraunces', serif)",
        fontWeight: 700,
        fontSize: text,
        textDecoration: "none",
        lineHeight: 1,
        ...style,
      }}
    >
      <Leaf size={icon} strokeWidth={1.8} className="farmart-logo-icon" />
      <span className="farmart-logo-text">Farmart</span>
      {suffix ? <span style={{ fontWeight: 500, opacity: 0.75, fontSize: text * 0.85 }}>{suffix}</span> : null}
    </span>
  );
}
