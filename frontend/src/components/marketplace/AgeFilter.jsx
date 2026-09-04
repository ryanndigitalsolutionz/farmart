function AgeFilter({ age, setAge }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor="age-filter"
        className="text-[13px] font-semibold text-[var(--farm-text)]"
      >
        Age
      </label>

      <input
        id="age-filter"
        type="number"
        placeholder="Max age"
        min="0"
        value={age}
        onChange={(e) => setAge(e.target.value)}
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
  )
}

export default AgeFilter

