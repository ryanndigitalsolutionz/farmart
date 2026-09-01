import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaClipboardList,
  FaStar,
  FaFlag,
  FaSlidersH,
} from 'react-icons/fa'

import farmartImages from '../../data/farmartImages'

import SearchBar from '../../components/marketplace/SearchBar'
import FilterPanel from '../../components/marketplace/FilterPanel'
import SortDropdown from '../../components/marketplace/SortDropdown'
import ProductFilterPanel from '../../components/products/filters/ProductFilterPanel'

function Marketplace() {
  const [category, setCategory] = useState('livestock')
  const [showFilters, setShowFilters] = useState(true)

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')

  const [type, setType] = useState('')
  const [breed, setBreed] = useState('')
  const [age, setAge] = useState('')
  const [sex, setSex] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const [dateProduced, setDateProduced] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [minQuantity, setMinQuantity] = useState('')
  const [maxQuantity, setMaxQuantity] = useState('')

  const livestock = useMemo(
    () => [
      {
        id: 1,
        name: 'Farm Cow',
        type: 'Cow',
        breed: 'Friesian',
        age: 3,
        sex: 'Female',
        weight: 420,
        location: 'Nairobi',
        price: 120000,
        image: farmartImages.livestock.cows[0],
      },
      {
        id: 2,
        name: 'Farm Goat',
        type: 'Goat',
        breed: 'Boer',
        age: 2,
        sex: 'Male',
        weight: 65,
        location: 'Kiambu',
        price: 25000,
        image: farmartImages.livestock.goats[0],
      },
      {
        id: 3,
        name: 'Farm Sheep',
        type: 'Sheep',
        breed: 'Dorper',
        age: 2,
        sex: 'Female',
        weight: 58,
        location: 'Nakuru',
        price: 18000,
        image: farmartImages.livestock.sheep[0],
      },
      {
        id: 4,
        name: 'Farm Pig',
        type: 'Pig',
        breed: 'Landrace',
        age: 1,
        sex: 'Male',
        weight: 110,
        location: 'Nyeri',
        price: 35000,
        image: farmartImages.livestock.pigs[0],
      },
      {
        id: 5,
        name: 'Farm Poultry',
        type: 'Poultry',
        breed: 'Kienyeji',
        age: 1,
        sex: 'Female',
        weight: 2.5,
        location: 'Machakos',
        price: 1500,
        image: farmartImages.livestock.poultry[0],
      },
    ],
    [],
  )

  const products = useMemo(
    () => [
      {
        id: 1,
        name: 'Fresh Eggs',
        type: 'Eggs',
        dateProduced: '2026-08-10',
        expiryDate: '2026-08-24',
        quantity: 30,
        price: 450,
        image: farmartImages.products.eggs[0],
      },
      {
        id: 2,
        name: 'Fresh Milk',
        type: 'Milk',
        dateProduced: '2026-08-25',
        expiryDate: '2026-08-30',
        quantity: 1000,
        price: 180,
        image: farmartImages.products.milk[0],
      },
      {
        id: 3,
        name: 'Farm Butter',
        type: 'Butter',
        dateProduced: '2026-08-18',
        expiryDate: '2026-09-18',
        quantity: 500,
        price: 600,
        image: farmartImages.products.butter[0],
      },
    ],
    [],
  )

  const filteredLivestock = useMemo(() => {
    let results = livestock.filter((item) => {
      const matchesSearch =
        `${item.name} ${item.type} ${item.breed} ${item.location}`
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesType =
        !type || item.type === type

      const matchesBreed =
        !breed || item.breed === breed

      const matchesAge =
        !age || item.age <= Number(age)

      const matchesSex =
        !sex || item.sex === sex

      const matchesMinPrice =
        !minPrice || item.price >= Number(minPrice)

      const matchesMaxPrice =
        !maxPrice || item.price <= Number(maxPrice)

      return (
        matchesSearch &&
        matchesType &&
        matchesBreed &&
        matchesAge &&
        matchesSex &&
        matchesMinPrice &&
        matchesMaxPrice
      )
    })

    if (sort === 'price-low') {
      results.sort((a, b) => a.price - b.price)
    }

    if (sort === 'price-high') {
      results.sort((a, b) => b.price - a.price)
    }

    if (sort === 'age-young') {
      results.sort((a, b) => a.age - b.age)
    }

    if (sort === 'age-old') {
      results.sort((a, b) => b.age - a.age)
    }

    return results
  }, [
    livestock,
    search,
    type,
    breed,
    age,
    sex,
    minPrice,
    maxPrice,
    sort,
  ])

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch =
        `${item.name} ${item.type}`
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesProduced =
        !dateProduced ||
        item.dateProduced >= dateProduced

      const matchesExpiry =
        !expiryDate ||
        item.expiryDate <= expiryDate

      const matchesMinQuantity =
        !minQuantity ||
        item.quantity >= Number(minQuantity)

      const matchesMaxQuantity =
        !maxQuantity ||
        item.quantity <= Number(maxQuantity)

      return (
        matchesSearch &&
        matchesProduced &&
        matchesExpiry &&
        matchesMinQuantity &&
        matchesMaxQuantity
      )
    })
  }, [
    products,
    search,
    dateProduced,
    expiryDate,
    minQuantity,
    maxQuantity,
  ])

  const visibleItems =
    category === 'livestock'
      ? filteredLivestock
      : filteredProducts

  const clearFilters = () => {
    setType('')
    setBreed('')
    setAge('')
    setSex('')
    setMinPrice('')
    setMaxPrice('')

    setDateProduced('')
    setExpiryDate('')
    setMinQuantity('')
    setMaxQuantity('')

    setSort('')
  }

  return (
    <>
      <main className="min-h-screen bg-[--farm-background] text-[--farm-text] transition-all duration-180" 
                      style={{backgroundImage: 'radial-gradient(circle at 50% 0%, var(--farm-green-glow), transparent 34%), var(--farm-background)'}}>
        <div className="w-full max-w-[1200px] mx-auto px-5 py-[70px] md:px-10 sm:px-3.5 sm:py-6">

          <header className="flex flex-col items-center text-center">

            <div className="w-[190px] h-[68px] mb-[22px] sm:w-[160px] sm:h-[58px]">
              <img
                src="/logo/farmart_full_logo_testing.png"
                alt="Farmart"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="">
              <h1 className="m-0 text-[--farm-text] font-farmart-display text-[clamp(36px,6vw,50px)] 
              font-bold leading-tight tracking-tight"
              >
                Find what your farm has to offer.
              </h1>

              <p className="max-w-[620px] mx-auto mt-[14px] text-[--farm-muted] font-farmart-body text-sm leading-relaxed">
                Discover livestock and farm products directly
                from farmers, with transparent prices and
                trustworthy listings.
              </p>
            </div>

            <div className="w-full max-w-[680px] mx-auto mt-[30px]">
              <SearchBar
                search={search}
                setSearch={setSearch}
              />
            </div>

            <div className="flex justify-center gap-1 mx-auto mt-[30px] p-1 border 
            border-[--farm-green-border] rounded-2xl bg-[--farm-green-soft]">
              <button
                type="button"
                className={`min-w-[150px] sm:min-w-0 sm:w-1/2 px-5 py-3 sm:px-2 sm:py-3 border-0 rounded-2xl 
                  transition-all duration-160 font-farmart-body text-sm font-semibold 
                ${
                  category === 'livestock'
                    ? 'bg-[--farm-green] text-white'
                    : 'bg-transparent text-[--farm-muted]'
                }`}
                onClick={() => setCategory('livestock')}
              >
                Livestock
              </button>

              <button
                type="button"
                className={`min-w-[150px] sm:min-w-0 sm:w-1/2 px-5 py-3 sm:px-2 sm:py-3 border-0 
                  rounded-2xl transition-all duration-160 font-farmart-body text-sm font-semibold ${
                  category === 'products'
                    ? 'bg-[--farm-green] text-white'
                    : 'bg-transparent text-[--farm-muted]'
                }`}
                onClick={() => setCategory('products')}
              >
                Farm Products
              </button>
            </div>

          </header>

          <section className="mt-[42px]">

            <div className="flex flex-col sm:flex-col items-start sm:items-start 
                            justify-between gap-5 sm:gap-5 mb-[18px]">

              <div className="">
                <h2 className="m-0 text-[--farm-text] font-farmart-display text-2xl font-bold">
                  {category === 'livestock'
                    ? 'Available Livestock'
                    : 'Farm Products'}
                </h2>

                <p className="mt-[7px] text-[--farm-muted] font-farmart-body text-xs">
                  {visibleItems.length}{' '}
                  {visibleItems.length === 1
                    ? 'listing'
                    : 'listings'}{' '}
                  available
                </p>
              </div>

              <div className="flex gap-2.5">

                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 border 
                  border-[--farm-green-border] rounded-2xl bg-[--farm-green-soft] text-[--farm-text] 
                  font-farmart-body text-xs font-semibold cursor-pointer transition-all duration-160 
                  hover:border-[--farm-green] hover:bg-[--farm-green-soft]"
                  onClick={() =>
                    setShowFilters(!showFilters)
                  }
                >
                  <FaSlidersH size={13} />
                  {showFilters
                    ? 'Hide Filters'
                    : 'Show Filters'}
                </button>

                <SortDropdown
                  sort={sort}
                  setSort={setSort}
                />

              </div>

            </div>

            {showFilters && (
              <div className="mb-7 p-[18px] border border-[--farm-green-border] 
              rounded-[17px] bg-[--farm-green-soft]">

                <div className="flex items-center justify-between mb-[15px]">
                  <h3 className="m-0 text-[--farm-text] font-farmart-display text-lg">
                    {category === 'livestock'
                      ? 'Filter Livestock'
                      : 'Filter Farm Products'}
                  </h3>

                  <button
                    type="button"
                    className="border-0 bg-transparent text-[--farm-green] font-farmart-body 
                    text-xs font-semibold cursor-pointer transition-colors 
                    duration-160 hover:text-[--farm-green-dark]"
                    onClick={clearFilters}
                  >
                    Clear filters
                  </button>
                </div>

                {category === 'livestock' ? (
                  <FilterPanel
                    type={type}
                    setType={setType}
                    breed={breed}
                    setBreed={setBreed}
                    age={age}
                    setAge={setAge}
                    sex={sex}
                    setSex={setSex}
                    minPrice={minPrice}
                    setMinPrice={setMinPrice}
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                  />
                ) : (
                  <ProductFilterPanel
                    dateProduced={dateProduced}
                    setDateProduced={setDateProduced}
                    expiryDate={expiryDate}
                    setExpiryDate={setExpiryDate}
                    minQuantity={minQuantity}
                    setMinQuantity={setMinQuantity}
                    maxQuantity={maxQuantity}
                    setMaxQuantity={setMaxQuantity}
                  />
                )}

              </div>
            )}

            {visibleItems.length > 0 ? (
              <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">

                {visibleItems.map((item) => (
                  <article
                    key={`${category}-${item.id}`}
                    className="overflow-hidden border border-[--farm-green-border] 
                    rounded-[19px] bg-[--farm-green-soft] shadow-[0_8px_25px_var(--farm-green-glow)] 
                    transition-all duration-180 hover:border-[--farm-green] 
                    hover:shadow-[0_14px_32px_var(--farm-green-glow)]"
                  >

                    <div className="w-full h-[220px] bg-[--farm-background]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-5">

                      <div className="text-[--farm-green] font-farmart-body text-xs font-bold uppercase tracking-wider">
                        {item.type}
                      </div>

                      <h3 className="mt-[7px] text-[--farm-text] font-farmart-display text-xl font-bold">
                        {item.name}
                      </h3>

                      <div className="grid grid-cols-2 gap-2 mt-[15px]">

                        {category === 'livestock' ? (
                          <>
                            <div className="text-[--farm-muted] font-farmart-body text-xs leading-relaxed">
                              Breed: {item.breed}
                            </div>

                            <div className="text-[--farm-muted] font-farmart-body text-xs leading-relaxed">
                              Age: {item.age} years
                            </div>

                            <div className="text-[--farm-muted] font-farmart-body text-xs leading-relaxed">
                              Sex: {item.sex}
                            </div>

                            <div className="text-[--farm-muted] font-farmart-body text-xs leading-relaxed">
                              Location: {item.location}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-[--farm-muted] font-farmart-body text-xs leading-relaxed">
                              Produced: {item.dateProduced}
                            </div>

                            <div className="text-[--farm-muted] font-farmart-body text-xs leading-relaxed">
                              Expires: {item.expiryDate}
                            </div>

                            <div className="text-[--farm-muted] font-farmart-body text-xs leading-relaxed">
                              Quantity: {item.quantity} g
                            </div>
                          </>
                        )}

                      </div>

                      <div className="mt-[18px] text-[--farm-text] font-farmart-display text-xl font-bold">
                        KSh {item.price.toLocaleString()}
                      </div>

                      <button
                        type="button"
                        className="w-full mt-[15px] px-3 py-3 border border-[--farm-green] 
                        rounded-2xl bg-[--farm-green] text-white font-farmart-body text-xs 
                        font-semibold cursor-pointer transition-all duration-160 
                        hover:bg-[--farm-green-dark] hover:translate-y-[-1px]"
                      >
                        View listing
                      </button>

                    </div>

                  </article>
                ))}

              </div>
            ) : (
              <div className="px-6 py-[70px] sm:px-6 border border-[--farm-green-border] 
                              rounded-[20px] bg-[--farm-green-soft] text-center"
              >

                <h3 className="m-0 text-[--farm-text] font-farmart-display text-2xl">
                  {category === 'products'
                    ? "Sorry, but there's no produce recorded this month."
                    : 'No livestock matches your filters.'}
                </h3>

                <p className="mt-3 text-[--farm-muted] font-farmart-body text-sm">
                  {category === 'products'
                    ? 'Check back later for new farm products.'
                    : 'Try changing or clearing your filters.'}
                </p>

              </div>
            )}

          </section>

          <nav className="flex flex-wrap justify-center gap-2.5 mt-[52px] 
          pt-6 border-t border-[--farm-green-border]">

            <Link
              to="/buyer/checkout"
              className="inline-flex items-center gap-2 px-[15px] py-3 border 
              border-[--farm-green-border] rounded-2xl bg-[--farm-green-soft] 
              text-[--farm-muted] font-farmart-body text-xs font-semibold no-underline 
              transition-all duration-160 hover:border-[--farm-green] 
              hover:text-[--farm-green] hover:bg-[--farm-green-soft]"
            >
              <FaShoppingCart size={13} />
              Checkout
            </Link>

            <Link
              to="/buyer/orders"
              className="inline-flex items-center gap-2 px-[15px] py-3 border 
              border-[--farm-green-border] rounded-2xl bg-[--farm-green-soft] 
              text-[--farm-muted] font-farmart-body text-xs font-semibold no-underline 
              transition-all duration-160 hover:border-[--farm-green] 
              hover:text-[--farm-green] hover:bg-[--farm-green-soft]"
            >
              <FaClipboardList size={13} />
              Orders
            </Link>

            <Link
              to="/buyer/wishlist"
              className="inline-flex items-center gap-2 px-[15px] py-3 
              border border-[--farm-green-border] rounded-2xl bg-[--farm-green-soft] 
              text-[--farm-muted] font-farmart-body text-xs font-semibold no-underline 
              transition-all duration-160 hover:border-[--farm-green] hover:text-[--farm-green] 
              hover:bg-[--farm-green-soft]"
            >
              <FaHeart size={13} />
              Wishlist
            </Link>

            <Link
              to="/buyer/reviews"
              className="inline-flex items-center gap-2 px-[15px] py-3 border 
              border-[--farm-green-border] rounded-2xl bg-[--farm-green-soft] 
              text-[--farm-muted] font-farmart-body text-xs font-semibold no-underline 
              transition-all duration-160 hover:border-[--farm-green] 
              hover:text-[--farm-green] hover:bg-[--farm-green-soft]"
            >
              <FaStar size={13} />
              Reviews
            </Link>

            <Link
              to="/buyer/profile"
              className="inline-flex items-center gap-2 px-[15px] py-3 border 
              border-[--farm-green-border] rounded-2xl bg-[--farm-green-soft] 
              text-[--farm-muted] font-farmart-body text-xs font-semibold no-underline 
              transition-all duration-160 hover:border-[--farm-green] 
              hover:text-[--farm-green] hover:bg-[--farm-green-soft]"
            >
              <FaUser size={13} />
              Profile
            </Link>

            <Link
              to="/buyer/reports"
              className="inline-flex items-center gap-2 px-[15px] py-3 border 
              border-[--farm-green-border] rounded-2xl bg-[--farm-green-soft] 
              text-[--farm-muted] font-farmart-body text-xs font-semibold no-underline 
              transition-all duration-160 hover:border-[--farm-green] 
              hover:text-[--farm-green] hover:bg-[--farm-green-soft]"
            >
              <FaFlag size={13} />
              Report
            </Link>

          </nav>

        </div>
      </main>
    </>
  )
}

export default Marketplace
