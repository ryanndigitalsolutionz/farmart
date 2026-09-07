import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const buttonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  borderRadius: "var(--radius-sm, 8px)",
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  color: "var(--color-text)",
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",
  transition: "background 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.2s ease",
};

const iconContainerStyle = {
  position: "relative",
  width: 18,
  height: 18,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function ThemeToggle({ ariaLabel = "Toggle theme" }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={ariaLabel}
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      style={buttonStyle}
    >
      <div style={iconContainerStyle}>
        {theme === "light" ? (
          <Moon size={18} style={{ position: "absolute", transition: "opacity 0.2s ease, transform 0.2s ease" }} />
        ) : (
          <Sun size={18} style={{ position: "absolute", transition: "opacity 0.2s ease, transform 0.2s ease" }} />
        )}
      </div>
    </button>
  );
}
