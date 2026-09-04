function SortDropdown({ sort, setSort }) {
  return (
    <div className="shrink-0">
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="
          min-w-[180px]
          px-3 py-2.5
          border border-[var(--farm-green-border)]
          rounded-[11px]
          bg-[var(--farm-green-soft)]
          text-[var(--farm-text)]
          text-[13px]
          font-[var(--farm-body-font)]
          font-semibold
          outline-none
          cursor-pointer
          transition-[border-color,background,box-shadow] duration-160
          focus:border-[var(--farm-green)]
          focus:ring-2
          focus:ring-[var(--farm-green-glow)]
          max-[620px]:min-w-0
        "
      >
        <option value="">Sort by</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="age-young">Age: Young to Old</option>
        <option value="age-old">Age: Old to Young</option>
      </select>
    </div>
  )
}

export default SortDropdown

