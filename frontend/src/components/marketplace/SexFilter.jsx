function SexFilter({ sex, setSex }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor="sex-filter"
        className="text-[13px] font-semibold text-[var(--farm-text)]"
      >
        Sex
      </label>

      <select
        id="sex-filter"
        value={sex}
        onChange={(e) => setSex(e.target.value)}
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
        <option value="">All Sexes</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>
  )
}

export default SexFilter

