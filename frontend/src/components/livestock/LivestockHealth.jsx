
const outer = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: 10,
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 13,
  color: "var(--text-dark, #1E2A1F)",
  padding: "8px 10px",
  background: "#fff",
  borderRadius: 8,
  border: "1px solid var(--border, #DCE6D8)",
};

const label = {
  color: "var(--text-muted, #66766A)",
};

export default function LivestockHealth({ age, gender, weight, weightUnit = "kg", type, breed }) {
  return (
    <div style={outer}>
      <h4 style={{ margin: 0, fontFamily: "var(--font-display, 'Fraunces', serif)", fontSize: 14, fontWeight: 600 }}>
        Health details
      </h4>
      <div style={grid}>
        {[
          ["Type", type],
          ["Breed", breed],
          ["Age", age],
          ["Gender", gender],
          ["Weight", weight ? `${weight} ${weightUnit}` : null],
        ].map(([k, v]) => (
          <div key={k} style={row}>
            <span style={label}>{k}</span>
            <span style={{ fontWeight: 600, textTransform: "capitalize" }}>{v || "—"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
