function DateProducedFilter({ dateProduced, setDateProduced }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="date-produced"
        className="text-[13px] font-semibold text-[var(--farm-text)]"
      >
        Date Produced
      </label>

      <input
        id="date-produced"
        type="date"
        value={dateProduced}
        onChange={(e) => setDateProduced(e.target.value)}
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
      />
    </div>
  )
}

export default DateProducedFilter
