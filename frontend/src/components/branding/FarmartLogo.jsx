const sizes = {
  sm: { width: 22, height: 22 },
  md: { width: 28, height: 28 },
  lg: { width: 36, height: 36 },
};

export default function FarmartLogo({ size = "md", className, style }) {
  const { width, height } = sizes[size] || sizes.md;

  return (
    <img
      src="/favicon/farm.png"
      alt="Farmart"
      className={className}
      style={{
        width,
        height,
        objectFit: "contain",
        display: "block",
        ...style,
      }}
    />
  );
}
