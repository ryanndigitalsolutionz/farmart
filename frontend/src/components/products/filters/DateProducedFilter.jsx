function DateProducedFilter({ dateProduced, setDateProduced }) {
  return (
    <div>
      <label htmlFor="date-produced">
        Date Produced
      </label>

      <input
        id="date-produced"
        type="date"
        value={dateProduced}
        onChange={(e) => setDateProduced(e.target.value)}
      />
    </div>
  )
}

export default DateProducedFilter