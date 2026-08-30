
const spin = {
  border: "4px solid var(--color-surface-secondary)",
  borderTop: "4px solid var(--color-primary)",
  borderRadius: "50%",
  width: 36,
  height: 36,
  animation: "spin 0.8s linear infinite",
};

export default function Spinner({ size = 36 }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      style={{
        ...spin,
        width: size,
        height: size,
        borderWidth: size / 9,
        display: "inline-block",
      }}
    />
  );
}
