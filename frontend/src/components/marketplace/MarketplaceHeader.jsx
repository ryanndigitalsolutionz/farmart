import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";

const outer = {
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
  alignItems: "center",
  justifyContent: "space-between",
};

const left = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const title = {
  fontFamily: "var(--font-display, 'Fraunces', serif)",
  fontSize: 20,
  fontWeight: 700,
  color: "var(--text-dark, #1E2A1F)",
  margin: 0,
};

const subtitle = {
  fontSize: 13,
  color: "var(--text-muted, #66766A)",
  margin: 0,
};

const right = {
  display: "flex",
  gap: 10,
  alignItems: "center",
};

export default function MarketplaceHeader({ titleText = "Marketplace", subtitleText, onSearch, onSortChange, sortValue }) {
  return (
    <div style={outer}>
      <div style={left}>
        <h1 style={title}>{titleText}</h1>
        {subtitleText && <p style={subtitle}>{subtitleText}</p>}
      </div>
      <div style={right}>
        <SearchBar onChange={onSearch} />
        <SortDropdown value={sortValue} onChange={onSortChange} />
      </div>
    </div>
  );
}
