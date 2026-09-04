import DateProducedFilter from './DateProducedFilter'
import ExpiryDateFilter from './ExpiryDateFilter'
import QuantityFilter from './QuantityFilter'

function ProductFilterPanel({
  dateProduced,
  setDateProduced,
  expiryDate,
  setExpiryDate,
  minQuantity,
  setMinQuantity,
  maxQuantity,
  setMaxQuantity,
}) {
  return (
    <div
      className="
        grid
        grid-cols-3
        gap-4
        items-end

        max-[900px]:grid-cols-2

        max-[620px]:grid-cols-1
      "
    >
      <DateProducedFilter
        dateProduced={dateProduced}
        setDateProduced={setDateProduced}
      />

      <ExpiryDateFilter
        expiryDate={expiryDate}
        setExpiryDate={setExpiryDate}
      />

      <QuantityFilter
        minQuantity={minQuantity}
        setMinQuantity={setMinQuantity}
        maxQuantity={maxQuantity}
        setMaxQuantity={setMaxQuantity}
      />
    </div>
  )
}

export default ProductFilterPanel
