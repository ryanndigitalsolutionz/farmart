function LivestockTypeFilter({ type, setType }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor="livestock-type-filter"
        className="text-[13px] font-semibold text-[var(--farm-text)]"
      >
        Livestock Type
      </label>

      <select
        id="livestock-type-filter"
        value={type}
        onChange={(e) => setType(e.target.value)}
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
          cursor-pointer
          transition-[border-color,box-shadow] duration-160
          focus:border-[var(--farm-green)]
          focus:ring-2
          focus:ring-[var(--farm-green-glow)]
        "
      >
        <option value="">All Livestock</option>
        <option value="Goat">Goats</option>
        <option value="Cow">Cows</option>
        <option value="Sheep">Sheep</option>
        <option value="Poultry">Poultry</option>
        <option value="Pig">Pigs</option>
      </select>
    </div>
  )
}

export default LivestockTypeFilter

