import LivestockTypeFilter from './LivestockTypeFilter'
import BreedFilter from './BreedFilter'
import AgeFilter from './AgeFilter'
import SexFilter from './SexFilter'
import PriceFilter from './PriceFilter'

function FilterPanel({
  type,
  setType,
  breed,
  setBreed,
  age,
  setAge,
  sex,
  setSex,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) {
  return (
    <div className="filter-panel flex flex-wrap overflow-hidden gap-2 items-center p-4 border-2 rounded-2xl border-(--farm-green-border) w-full">

      <LivestockTypeFilter
        type={type}
        setType={setType}
      />

      <BreedFilter
        breed={breed}
        setBreed={setBreed}
      />

      <AgeFilter
        age={age}
        setAge={setAge}
      />

      <SexFilter
        sex={sex}
        setSex={setSex}
      />

      <PriceFilter
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />

    </div>
  )
}

export default FilterPanel// commit 48
