function QuantityFilter({
  minQuantity,
  setMinQuantity,
  maxQuantity,
  setMaxQuantity,
}) {
  return (
    <div className="flex gap-2 rounded-2xl p-2 border-(--farm-green-border) w-40 ">
      <input
        type="number"
        placeholder="Min Quantity (g)"
        min="0"
        value={minQuantity}
        onChange={(e) => setMinQuantity(e.target.value)}
        className="flex items-center gap-2 border-2 rounded-2xl p-2 border-(--farm-green-border) w-40 "
      />

      <input
        type="number"
        placeholder="Max Quantity (g)"
        min="0"
        value={maxQuantity}
        onChange={(e) => setMaxQuantity(e.target.value)}
        className="flex items-center gap-2 border-2 rounded-2xl p-2 border-(--farm-green-border) w-40 "
      />
    </div>
  )
}

export default QuantityFilter