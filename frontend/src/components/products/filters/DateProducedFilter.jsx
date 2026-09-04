function DateProducedFilter({ dateProduced, setDateProduced }) {
  return (
    <div className="flex items-center gap-4">
      <label htmlFor="date-produced">
        Date Produced
      </label>

      <input
        id="date-produced"
        type="date"
        value={dateProduced}
        onChange={(e) => setDateProduced(e.target.value)}
        className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700
          outline-none transition hover:border-gray-300
          focus:border-[var(--farm-green)] focus:ring-2 focus:ring-[var(--farm-green)]/10"
      />
    </div>
  )
}

export default DateProducedFilter