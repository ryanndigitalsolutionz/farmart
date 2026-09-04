function BreedFilter({ breed, setBreed }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor="breed-filter"
        className="text-[13px] font-semibold text-[var(--farm-text)]"
      >
        Breed
      </label>

      <select
        id="breed-filter"
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
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
        <option value="">All Breeds</option>
        <option value="Boer">Boer</option>
        <option value="Freshian">Freshian</option>
        <option value="Dorper">Dorper</option>
        <option value="Kienyeji">Kienyeji</option>
        <option value="Landrace">Landrace</option>
      </select>
    </div>
  )
}

export default BreedFilter

