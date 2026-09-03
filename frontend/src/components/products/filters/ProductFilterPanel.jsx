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
    <div className="product-filter-panel flex flex-wrap gap-4 overflow-hidden 
      items-center p-4 pl-15 border-2 rounded-2xl 
      border-(--farm-green-border)  w-full shadow-xl ">

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