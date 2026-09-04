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
    <div
      className="
        grid
        grid-cols-4
        gap-4
        items-end
        w-full

        max-[900px]:grid-cols-2

        max-[620px]:grid-cols-1
      "
    >
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

      <div className="max-[900px]:col-span-2 max-[620px]:col-span-1">
        <PriceFilter
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />
      </div>
    </div>
  )
}

export default FilterPanel

