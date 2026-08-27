import { useState } from "react";
import LivestockTypeFilter from "./LivestockTypeFilter";
import BreedFilter from "./BreedFilter";
import AgeFilter from "./AgeFilter";
import PriceFilter from "./PriceFilter";

const outer = {
  background: "#fff",
  borderRadius: 14,
  border: "1px solid var(--border, #DCE6D8)",
  overflow: "hidden",
};

const toggle = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 14,
  background: "transparent",
  border: "none",
  fontSize: 14,
  fontWeight: 600,
  color: "var(--text-dark, #1E2A1F)",
  cursor: "pointer",
  fontFamily: "var(--font-body, 'Modern Antiqua', serif)",
};

const body = {
  padding: "0 14px 14px",
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const divider = {
  height: 1,
  background: "var(--border, #DCE6D8)",
  margin: "0 14px",
};

export default function FilterPanel({ filters, onChangeFilters, onReset }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={outer}>
      <button type="button" style={toggle} onClick={() => setOpen((v) => !v)}>
        <span>Filters</span>
        <span aria-hidden="true">{open ? "▾" : "▸"}</span>
      </button>
      {open && (
        <>
          <div style={divider} />
          <div style={body}>
            <LivestockTypeFilter
              value={filters.type}
              onChange={(type) => onChangeFilters?.({ ...filters, type })}
            />
            <BreedFilter
              value={filters.breed}
              onChange={(breed) => onChangeFilters?.({ ...filters, breed })}
            />
            <AgeFilter
              value={filters.age}
              onChange={(age) => onChangeFilters?.({ ...filters, age })}
            />
            <PriceFilter
              min={filters.minPrice}
              max={filters.maxPrice}
              onChange={(minPrice, maxPrice) => onChangeFilters?.({ ...filters, minPrice, maxPrice })}
            />
            {onReset && (
              <button
                type="button"
                onClick={onReset}
                style={{
                  alignSelf: "flex-start",
                  background: "transparent",
                  border: "none",
                  color: "var(--green-700, #2F6D3F)",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Reset filters
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
