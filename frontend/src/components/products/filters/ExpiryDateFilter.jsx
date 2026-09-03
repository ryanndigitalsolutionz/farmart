function ExpiryDateFilter({ expiryDate, setExpiryDate }) {
  return (
    <div className="flex items-center gap-4">
      <label htmlFor="expiry-date">
        Expiry Date
      </label>

      <input
        id="expiry-date"
        type="date"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700
          outline-none transition hover:border-gray-300
          focus:border-[var(--farm-green)] focus:ring-2 focus:ring-[var(--farm-green)]/10"
      />
    </div>
  )
}

export default ExpiryDateFilter