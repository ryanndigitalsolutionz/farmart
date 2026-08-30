function ExpiryDateFilter({ expiryDate, setExpiryDate }) {
  return (
    <div>
      <label htmlFor="expiry-date">
        Expiry Date
      </label>

      <input
        id="expiry-date"
        type="date"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
      />
    </div>
  )
}

export default ExpiryDateFilter