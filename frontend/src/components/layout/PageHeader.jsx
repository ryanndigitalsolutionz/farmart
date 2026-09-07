export default function PageHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: "var(--green-900, #163420)" }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{ fontSize: 13, color: "var(--text-muted, #66766A)", marginTop: 4 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
