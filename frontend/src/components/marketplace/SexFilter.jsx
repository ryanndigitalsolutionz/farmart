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
      >
        <option value="">All Sexes</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>
  )
}

export default SexFilter

