import { useMemo } from "react";

function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

const colors = [
  "#277a44",
  "#216b3b",
  "#1a5c32",
  "#2F6D3F",
  "#163420",
];

export default function Avatar({ name, image, size = 34, className = "" }) {
  const initials = useMemo(() => getInitials(name), [name]);
  const colorIndex = useMemo(() => {
    if (!name) return 0;
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % colors.length;
  }, [name]);

  const style = {
    width: size,
    height: size,
    borderRadius: "50%",
    background: image ? "transparent" : colors[colorIndex],
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: size * 0.38,
    fontWeight: 700,
    border: image ? "none" : "2px solid var(--color-border)",
    overflow: "hidden",
    flexShrink: 0,
  };

  return (
    <div className={className} style={style} aria-hidden="true">
      {image ? (
        <img
          src={image}
          alt={name || "User"}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        initials
      )}
    </div>
  );
}
