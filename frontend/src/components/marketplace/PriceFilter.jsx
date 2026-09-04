function PriceFilter({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[13px] font-semibold text-[var(--farm-text)]">
        Price
      </label>

      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          placeholder="Min price"
          min="0"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="
            w-full box-border
            px-3 py-2.5
            border border-[var(--farm-green-border)]
            rounded-[10px]
            bg-[var(--farm-background)]
            text-[var(--farm-text)]
            text-[13px]
            font-[var(--farm-body-font)]
            outline-none
            transition-[border-color,box-shadow] duration-160
            placeholder:text-[var(--farm-muted)]
            focus:border-[var(--farm-green)]
            focus:ring-2
            focus:ring-[var(--farm-green-glow)]
          "
        />

        <input
          type="number"
          placeholder="Max price"
          min="0"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="
            w-full box-border
            px-3 py-2.5
            border border-[var(--farm-green-border)]
            rounded-[10px]
            bg-[var(--farm-background)]
            text-[var(--farm-text)]
            text-[13px]
            font-[var(--farm-body-font)]
            outline-none
            transition-[border-color,box-shadow] duration-160
            placeholder:text-[var(--farm-muted)]
            focus:border-[var(--farm-green)]
            focus:ring-2
            focus:ring-[var(--farm-green-glow)]
          "
        />
      </div>
    </div>
  )
}

export default PriceFilter

