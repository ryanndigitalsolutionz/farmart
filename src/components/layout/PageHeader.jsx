export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        marginBottom: 20,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1
          style={{
            fontFamily: "var(--font-display, 'Fraunces', serif)",
            fontSize: 22,
            fontWeight: 600,
            color: "var(--color-text)",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p style={{ color: "var(--color-text-muted)", fontSize: 13, marginTop: 4 }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", width: "100%" }}>
          {actions}
        </div>
      )}
    </div>
  );
}
