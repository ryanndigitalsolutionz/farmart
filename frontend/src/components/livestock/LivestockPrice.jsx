
const outer = {
  display: "inline-flex",
  flexDirection: "column",
  gap: 2,
};

const priceStyle = {
  fontSize: 20,
  fontWeight: 700,
  color: "var(--green-700, #2F6D3F)",
  fontFamily: "var(--font-display, 'Fraunces', serif)",
};

const unit = {
  fontSize: 12,
  color: "var(--text-muted, #66766A)",
  fontWeight: 500,
};

export default function LivestockPrice({ price, large = false }) {
  return (
    <div style={outer}>
      <span style={{ ...priceStyle, fontSize: large ? 22 : 16 }}>
        KES {Number(price || 0).toLocaleString("en-KE")}
      </span>
      {!large && <span style={unit}>per unit</span>}
    </div>
  );
}
