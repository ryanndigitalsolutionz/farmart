import { useMemo, useState, useEffect } from 'react'
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
import useLivestock from '../../hooks/useLivestock'

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

  const { livestock, loading } = useLivestock()


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
<style>{`

  .marketplace-page {
  background:
    radial-gradient(
      circle at 50% 0%,
      var(--farm-green-glow),
      transparent 34%
    ),
    var(--farm-background);
}
`}</style>

      <main className="marketplace-page min-h-screen text-[var(--farm-text)] 
      transition-[background_color, color] duration-180 ease-[ease]">
        <div className="marketplace-container w-[min(1200px,calc(100%-40px))] mx-auto pt-[34px] pb-[70px] max-[620px]:w-[min(100%-28px,560px)] max-[620px]:pt-[24px]">

          <header className="marketplace-top flex flex-col items-center text-center">

            <div className="marketplace-logo w-[190px] h-[68px] mb-[22px] max-[620px]:w-[160px] max-[620px]:h-[58px]">
              <img
                src="/logo/farmart_full_logo_testing.png"
                alt="Farmart"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="marketplace-heading">
              <h1 className=' m-0 text-[var(--farm-text)] font-[var(--farm-heading-font)] 
              text-[clamp(36px,6vw,50px)] font-bold leading-[1.1] tracking-[-1px]'
              >
                Find what your farm has to offer.
              </h1>

              <p className='max-w-[620px] mx-auto mt-[14px] text-[var(--farm-muted)] 
              font-[var(--farm-body-font)] text-[15px] leading-[1.8]'>
                Discover livestock and farm products directly
                from farmers, with transparent prices and
                trustworthy listings.
              </p>
            </div>

            <div className="marketplace-search-wrapper w-min[680px,100%] mt-[30px] mx-auto">
              <SearchBar
                search={search}
                setSearch={setSearch}
              />
            </div>

            <div 
              className="category-switch flex justify-center gap-[5px] mx-auto mt-[30px] p-[5px] border 
              border-[var(--farm-green-border)] rounded-[15px] bg-[var(--farm-green-soft)] max-[620px]:w-full">
              <button
                type="button"
                className={`category-button min-w-[150px] py-[12px] px-[20px] border-0 
                  rounded-[11px] bg-transparent text-[var(--farm-muted)] font-[var(--farm-body-font)] 
                  text-[14px] font-semibold cursor-pointer transition-[background,color] 
                  duration-[160ms] ease-[ease] 
                  ${
                    category === 'livestock' 
                    ? 'bg-[var(--farm-green)] text-[#ffffff]' 
                    : ''
                }`}
                onClick={() => setCategory('livestock')}
              >
                Livestock
              </button>

              <button
                type="button"
                className={`category-button min-w-[150px] py-[12px] px-[20px] border-0 
                  rounded-[11px] bg-transparent text-[var(--farm-muted)] font-[var(--farm-body-font)] 
                  text-[14px] font-semibold cursor-pointer transition-[background,color] duration-[160ms] ease-[ease] 
                  max-[620px]:min-w-0 max-[620px]:w-1/2 max-[620px]:px-[8px] max-[620px]:py-[11px]
                ${
                  category === 'products' 
                  ? 'bg-[var(--farm-green)] text-[#ffffff]' 
                  : ''
                }`}
                onClick={() => setCategory('products')}
              >
                Farm Products
              </button>
            </div>

          </header>

          <section className="marketplace-layout mt-[42px]">

            <div className="marketplace-toolbar flex items-center justify-between gap-[20px] mb-[18px]
              max-[620px]:items-start max-[620px]:flex-col">

              <div className="marketplace-results">
                <h2 className="m-0 text-[var(--farm-text)] font-[var(--farm-heading-font)] text-[27px]">
                  {category === 'livestock'
                    ? 'Available Livestock'
                    : 'Farm Products'}
                </h2>

                <p className="m-0 mt-[7px] text-[var(--farm-muted)] font-[var(--farm-body-font)] text-[13px]">
                  {visibleItems.length}{' '}
                  {visibleItems.length === 1
                    ? 'listing'
                    : 'listings'}{' '}
                  available
                </p>
              </div>

              <div className="toolbar-actions flex gap-[10px]">

                <button
                  type="button"
                  className="toolbar-button inline-flex items-center gap-[8px] py-[10px] px-[14px]
                    border border-[var(--farm-green-border)] rounded-[11px] bg-[var(--farm-green-soft)] 
                    text-[var(--farm-text)] font-[var(--farm-body-font)] text-[13px] font-semibold cursor-pointer 
                    transition-[border-color,background,color] duration-[160ms] ease-[ease] 
                    hover:border-[var(--farm-green)] hover:bg-[var(--farm-green-soft)]"
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
              <div 
                className="filter-wrapper mb-[28px] p-[18px] border 
                border-[var(--farm-green-border)] rounded-[17px] 
                bg-[var(--farm-green-soft)]"
              >

                <div className="filter-heading flex items-center justify-between mb-[15px]">
                  <h3 className="m-0 text-[var(--farm-text)] font-[var(--farm-heading-font)] text-[18px]">
                    {category === 'livestock'
                      ? 'Filter Livestock'
                      : 'Filter Farm Products'}
                  </h3>

                  <button
                    type="button"
                    className="clear-filters border-0 bg-transparent text-[var(--farm-green)] 
                      font-[var(--farm-body-font)] text-[13px] font-semibold cursor-pointer hover:text-[var(--farm-green-dark)]"
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
              <div className="marketplace-grid grid grid-cols-[repeat(3,1fr)] 
              max-[900px]:grid-cols-[repeat(2,1fr)] max-[620px]:grid-cols-[1fr] gap-[20px]">

                {visibleItems.map((item) => (
                  <article
                    key={`${category}-${item.id}`}
                    className="marketplace-card overflow-hidden border border-[var(--farm-green-border)]
                     rounded-[19px] bg-[var(--farm-green-soft)] shadow-[0_8px_25px_var(--farm-green-glow)]
                     transition-[border-color,box-shadow,background] duration-[180ms] ease-[ease]
                     hover:border-[var(--farm-green)] hover:shadow-[0_14px_32px_var(--farm-green-glow)]"
                  >

                    <div className="marketplace-image w-full h-[220px] bg-[var(--farm-background)] max-[620px]:h-[240px]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className='w-full h-full object-cover'
                      />
                    </div>

                    <div className="marketplace-card-body p-[20px]">

                      <div className="marketplace-card-type text-[var(--farm-green)] 
                      font-[var(--farm-body-font)] text-[12px] font-bold uppercase tracking-[0.7px]">
                        {item.type}
                      </div>

                      <h3 
                      className="marketplace-card-title mt-[7px] mr-0 mb-0 ml-0text-[var(--farm-text)] 
                      font-[var(--farm-heading-font)] text-[21px] font-bold">
                        {item.name}
                      </h3>

                      <div className="marketplace-card-info grid grid-cols-[repeat(2,1fr)] gap-[8px] mt-[15px]">

                        {category === 'livestock' ? (
                          <>
                            <div className="marketplace-info-item text-[var(--farm-muted)] font-[var(--farm-body-font)] text-[12px] leading-[1.5]">
                              Breed: {item.breed}
                            </div>

                            <div className="marketplace-info-item text-[var(--farm-muted)] font-[var(--farm-body-font)] text-[12px] leading-[1.5]">
                              Age: {item.age} years
                            </div>

                            <div className="marketplace-info-item text-[var(--farm-muted)] font-[var(--farm-body-font)] text-[12px] leading-[1.5]">
                              Sex: {item.sex}
                            </div>

                            <div className="marketplace-info-item text-[var(--farm-muted)] font-[var(--farm-body-font)] text-[12px] leading-[1.5]">
                              Location: {item.location}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="marketplace-info-item text-[var(--farm-muted)] font-[var(--farm-body-font)] text-[12px] leading-[1.5]">
                              Produced: {item.dateProduced}
                            </div>

                            <div className="marketplace-info-item text-[var(--farm-muted)] font-[var(--farm-body-font)] text-[12px] leading-[1.5]">
                              Expires: {item.expiryDate}
                            </div>

                            <div className="marketplace-info-item text-[var(--farm-muted)] font-[var(--farm-body-font)] text-[12px] leading-[1.5]">
                              Quantity: {item.quantity} g
                            </div>
                          </>
                        )}

                      </div>

                      <div className="marketplace-price mt-[18px] text-[var(--farm-text)] 
                      font-[var(--farm-heading-font)] text-[21px] font-bold">
                        KSh {item.price.toLocaleString()}
                      </div>

                      <Link to="/your-route" className="block w-full">
                        <button
                            type="button"
                            className="marketplace-card-button w-full mt-[15px] p-[12px]
                            border border-[var(--farm-green)] rounded-[11px] bg-[var(--farm-green)]
                            text-white font-[var(--farm-body-font)] text-[13px] font-semibold cursor-pointer
                            transition-[background,transform] duration-[160ms] ease-[ease]
                            hover:bg-[var(--farm-green-dark)] hover:translate-y-[-1px]"
                        >
                            View livestock
                        </button>
                      </Link>

                    </div>

                  </article>
                ))}

              </div>
            ) : (
              <div 
              className="empty-state py-[70px] px-[24px] border border-[var(--farm-green-border)]
               rounded-[20px] bg-[var(--farm-green-soft)] text-center">

                <h3 className="m-0 text-[var(--farm-text)] font-[var(--farm-heading-font)] text-[25px]">
                  {category === 'products'
                    ? "Sorry, but there's no produce recorded this month."
                    : 'No livestock matches your filters.'}
                </h3>

                <p className="mt-[12px] mr-auto ml-auto mb-0 text-[var(--farm-muted)] font-[var(--farm-body-font)] text-[14px]">
                  {category === 'products'
                    ? 'Check back later for new farm products.'
                    : 'Try changing or clearing your filters.'}
                </p>

              </div>
            )}

          </section>

          <nav 
            className="buyer-actions flex justify-center flex-wrap gap-[10px] mt-[52px] 
            pt-[24px] border-t border-[var(--farm-green-border)] max-[620px]:flex-col ">

            <Link
              to="/buyer/checkout"
              className="buyer-action inline-flex items-center gap-[8px] py-[11px] px-[15px] border 
              border-[var(--farm-green-border)] rounded-[11px] bg-[var(--farm-green-soft)] text-[var(--farm-muted)] 
              font-[var(--farm-body-font)] text-[13px] font-semibold no-underline cursor-pointer transition-[border-color,background,color] duration-[160ms] ease-[ease] 
              hover:border-[var(--farm-green)] hover:bg-[var(--farm-green-soft)] max-[620px]:justify-center"
            >
              <FaShoppingCart size={13} />
              Checkout
            </Link>

            <Link
              to="/buyer/orders"
              className="buyer-action inline-flex items-center gap-[8px] py-[11px] px-[15px] border 
              border-[var(--farm-green-border)] rounded-[11px] bg-[var(--farm-green-soft)] text-[var(--farm-muted)] 
              font-[var(--farm-body-font)] text-[13px] font-semibold no-underline cursor-pointer transition-[border-color,background,color] duration-[160ms] ease-[ease] 
              hover:border-[var(--farm-green)] hover:bg-[var(--farm-green-soft)] max-[620px]:justify-center"
            >
              <FaClipboardList size={13} />
              Orders
            </Link>

            <Link
              to="/buyer/wishlist"
              className="buyer-action inline-flex items-center gap-[8px] py-[11px] px-[15px] border 
              border-[var(--farm-green-border)] rounded-[11px] bg-[var(--farm-green-soft)] text-[var(--farm-muted)] 
              font-[var(--farm-body-font)] text-[13px] font-semibold no-underline cursor-pointer transition-[border-color,background,color] duration-[160ms] ease-[ease] 
              hover:border-[var(--farm-green)] hover:bg-[var(--farm-green-soft)] max-[620px]:justify-center"
            >
              <FaHeart size={13} />
              Wishlist
            </Link>

            <Link
              to="/buyer/reviews"
              className="buyer-action inline-flex items-center gap-[8px] py-[11px] px-[15px] border 
              border-[var(--farm-green-border)] rounded-[11px] bg-[var(--farm-green-soft)] text-[var(--farm-muted)] 
              font-[var(--farm-body-font)] text-[13px] font-semibold no-underline cursor-pointer transition-[border-color,background,color] duration-[160ms] ease-[ease] 
              hover:border-[var(--farm-green)] hover:bg-[var(--farm-green-soft)] max-[620px]:justify-center"
            >
              <FaStar size={13} />
              Reviews
            </Link>

            <Link
              to="/buyer/profile"
              className="buyer-action inline-flex items-center gap-[8px] py-[11px] px-[15px] border 
              border-[var(--farm-green-border)] rounded-[11px] bg-[var(--farm-green-soft)] text-[var(--farm-muted)] 
              font-[var(--farm-body-font)] text-[13px] font-semibold no-underline cursor-pointer transition-[border-color,background,color] duration-[160ms] ease-[ease] 
              hover:border-[var(--farm-green)] hover:bg-[var(--farm-green-soft)] max-[620px]:justify-center"
            >
              <FaUser size={13} />
              Profile
            </Link>

            <Link
              to="/buyer/reports"
              className="buyer-action inline-flex items-center gap-[8px] py-[11px] px-[15px] border 
              border-[var(--farm-green-border)] rounded-[11px] bg-[var(--farm-green-soft)] text-[var(--farm-muted)] 
              font-[var(--farm-body-font)] text-[13px] font-semibold no-underline cursor-pointer transition-[border-color,background,color] duration-[160ms] ease-[ease] 
              hover:border-[var(--farm-green)] hover:bg-[var(--farm-green-soft)] max-[620px]:justify-center"
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