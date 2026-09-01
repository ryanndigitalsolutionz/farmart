function QuantityFilter({
  minQuantity,
  setMinQuantity,
  maxQuantity,
  setMaxQuantity,
}) {
  return (
    <div>
      <input
        type="number"
        placeholder="Min Quantity (g)"
        min="0"
        value={minQuantity}
        onChange={(e) => setMinQuantity(e.target.value)}
      />

      <input
        type="number"
        placeholder="Max Quantity (g)"
        min="0"
        value={maxQuantity}
        onChange={(e) => setMaxQuantity(e.target.value)}
      />
    </div>
  )
}

export default QuantityFilter