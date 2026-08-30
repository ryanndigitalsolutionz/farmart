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
    <div className="product-filter-panel">

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