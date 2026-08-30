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
<style>{`
  .marketplace-page {
    min-height: 100vh;
    background:
      radial-gradient(
        circle at 50% 0%,
        var(--farm-green-glow),
        transparent 34%
      ),
      var(--farm-background);
    color: var(--farm-text);
    transition:
      background 180ms ease,
      color 180ms ease;
  }

  .marketplace-container {
    width: min(1200px, calc(100% - 40px));
    margin: 0 auto;
    padding: 34px 0 70px;
  }

  .marketplace-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .marketplace-logo {
    width: 190px;
    height: 68px;
    margin-bottom: 22px;
  }

  .marketplace-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .marketplace-heading h1 {
    margin: 0;
    color: var(--farm-text);
    font-family: "IBM Plex Serif", serif;
    font-size: clamp(36px, 6vw, 50px);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -1px;
  }

  .marketplace-heading p {
    max-width: 620px;
    margin: 14px auto 0;
    color: var(--farm-muted);
    font-family: "Modern Antiqua", serif;
    font-size: 15px;
    line-height: 1.8;
  }

  .marketplace-search-wrapper {
    width: min(680px, 100%);
    margin: 30px auto 0;
  }

  .category-switch {
    display: flex;
    justify-content: center;
    gap: 5px;
    margin: 30px auto 0;
    padding: 5px;
    border: 1px solid var(--farm-green-border);
    border-radius: 15px;
    background: var(--farm-green-soft);
  }

  .category-button {
    min-width: 150px;
    padding: 12px 20px;
    border: 0;
    border-radius: 11px;
    background: transparent;
    color: var(--farm-muted);
    font-family: "Modern Antiqua", serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition:
      background 160ms ease,
      color 160ms ease;
  }

  .category-button.active {
    background: var(--farm-green);
    color: #ffffff;
  }

  .marketplace-layout {
    margin-top: 42px;
  }

  .marketplace-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 18px;
  }

  .marketplace-results h2 {
    margin: 0;
    color: var(--farm-text);
    font-family: "IBM Plex Serif", serif;
    font-size: 27px;
  }

  .marketplace-results p {
    margin: 7px 0 0;
    color: var(--farm-muted);
    font-family: "Modern Antiqua", serif;
    font-size: 13px;
  }

  .toolbar-actions {
    display: flex;
    gap: 10px;
  }

  .toolbar-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border: 1px solid var(--farm-green-border);
    border-radius: 11px;
    background: var(--farm-green-soft);
    color: var(--farm-text);
    font-family: "Modern Antiqua", serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition:
      border-color 160ms ease,
      background 160ms ease,
      color 160ms ease;
  }

  .toolbar-button:hover {
    border-color: var(--farm-green);
    background: var(--farm-green-soft);
  }

  .filter-wrapper {
    margin-bottom: 28px;
    padding: 18px;
    border: 1px solid var(--farm-green-border);
    border-radius: 17px;
    background: var(--farm-green-soft);
  }

  .filter-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  .filter-heading h3 {
    margin: 0;
    color: var(--farm-text);
    font-family: "IBM Plex Serif", serif;
    font-size: 18px;
  }

  .clear-filters {
    border: 0;
    background: transparent;
    color: var(--farm-green);
    font-family: "Modern Antiqua", serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
  }

  .clear-filters:hover {
    color: var(--farm-green-dark);
  }

  .marketplace-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .marketplace-card {
    overflow: hidden;
    border: 1px solid var(--farm-green-border);
    border-radius: 19px;
    background: var(--farm-green-soft);
    box-shadow:
      0 8px 25px var(--farm-green-glow);
    transition:
      border-color 180ms ease,
      box-shadow 180ms ease,
      background 180ms ease;
  }

  .marketplace-card:hover {
    border-color: var(--farm-green);
    box-shadow:
      0 14px 32px var(--farm-green-glow);
  }

  .marketplace-image {
    width: 100%;
    height: 220px;
    background: var(--farm-background);
  }

  .marketplace-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .marketplace-card-body {
    padding: 20px;
  }

  .marketplace-card-type {
    color: var(--farm-green);
    font-family: "Modern Antiqua", serif;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.7px;
  }

  .marketplace-card-title {
    margin: 7px 0 0;
    color: var(--farm-text);
    font-family: "IBM Plex Serif", serif;
    font-size: 21px;
    font-weight: 700;
  }

  .marketplace-card-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 15px;
  }

  .marketplace-info-item {
    color: var(--farm-muted);
    font-family: "Modern Antiqua", serif;
    font-size: 12px;
    line-height: 1.5;
  }

  .marketplace-price {
    margin-top: 18px;
    color: var(--farm-text);
    font-family: "IBM Plex Serif", serif;
    font-size: 21px;
    font-weight: 700;
  }

  .marketplace-card-button {
    width: 100%;
    margin-top: 15px;
    padding: 12px;
    border: 1px solid var(--farm-green);
    border-radius: 11px;
    background: var(--farm-green);
    color: #ffffff;
    font-family: "Modern Antiqua", serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition:
      background 160ms ease,
      transform 160ms ease;
  }

  .marketplace-card-button:hover {
    background: var(--farm-green-dark);
    transform: translateY(-1px);
  }

  .empty-state {
    padding: 70px 24px;
    border: 1px solid var(--farm-green-border);
    border-radius: 20px;
    background: var(--farm-green-soft);
    text-align: center;
  }

  .empty-state h3 {
    margin: 0;
    color: var(--farm-text);
    font-family: "IBM Plex Serif", serif;
    font-size: 25px;
  }

  .empty-state p {
    margin: 12px auto 0;
    color: var(--farm-muted);
    font-family: "Modern Antiqua", serif;
    font-size: 14px;
  }

  .buyer-actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 52px;
    padding-top: 24px;
    border-top: 1px solid var(--farm-green-border);
  }

  .buyer-action {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 15px;
    border: 1px solid var(--farm-green-border);
    border-radius: 11px;
    background: var(--farm-green-soft);
    color: var(--farm-muted);
    font-family: "Modern Antiqua", serif;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    transition:
      border-color 160ms ease,
      color 160ms ease,
      background 160ms ease;
  }

  .buyer-action:hover {
    border-color: var(--farm-green);
    color: var(--farm-green);
    background: var(--farm-green-soft);
  }

  @media (max-width: 900px) {
    .marketplace-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 620px) {
    .marketplace-container {
      width: min(100% - 28px, 560px);
      padding-top: 24px;
    }

    .marketplace-logo {
      width: 160px;
      height: 58px;
    }

    .category-switch {
      width: 100%;
    }

    .category-button {
      min-width: 0;
      width: 50%;
      padding: 11px 8px;
    }

    .marketplace-toolbar {
      align-items: flex-start;
      flex-direction: column;
    }

    .marketplace-grid {
      grid-template-columns: 1fr;
    }

    .marketplace-image {
      height: 240px;
    }

    .buyer-actions {
      flex-direction: column;
    }

    .buyer-action {
      justify-content: center;
    }
  }
`}</style>

      <main className="marketplace-page">
        <div className="marketplace-container">

          <header className="marketplace-top">

            <div className="marketplace-logo">
              <img
                src="/logo/farmart_full_logo_testing.png"
                alt="Farmart"
              />
            </div>

            <div className="marketplace-heading">
              <h1>Find what your farm has to offer.</h1>

              <p>
                Discover livestock and farm products directly
                from farmers, with transparent prices and
                trustworthy listings.
              </p>
            </div>

            <div className="marketplace-search-wrapper">
              <SearchBar
                search={search}
                setSearch={setSearch}
              />
            </div>

            <div className="category-switch">
              <button
                type="button"
                className={`category-button ${
                  category === 'livestock' ? 'active' : ''
                }`}
                onClick={() => setCategory('livestock')}
              >
                Livestock
              </button>

              <button
                type="button"
                className={`category-button ${
                  category === 'products' ? 'active' : ''
                }`}
                onClick={() => setCategory('products')}
              >
                Farm Products
              </button>
            </div>

          </header>

          <section className="marketplace-layout">

            <div className="marketplace-toolbar">

              <div className="marketplace-results">
                <h2>
                  {category === 'livestock'
                    ? 'Available Livestock'
                    : 'Farm Products'}
                </h2>

                <p>
                  {visibleItems.length}{' '}
                  {visibleItems.length === 1
                    ? 'listing'
                    : 'listings'}{' '}
                  available
                </p>
              </div>

              <div className="toolbar-actions">

                <button
                  type="button"
                  className="toolbar-button"
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
              <div className="filter-wrapper">

                <div className="filter-heading">
                  <h3>
                    {category === 'livestock'
                      ? 'Filter Livestock'
                      : 'Filter Farm Products'}
                  </h3>

                  <button
                    type="button"
                    className="clear-filters"
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
              <div className="marketplace-grid">

                {visibleItems.map((item) => (
                  <article
                    key={`${category}-${item.id}`}
                    className="marketplace-card"
                  >

                    <div className="marketplace-image">
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    </div>

                    <div className="marketplace-card-body">

                      <div className="marketplace-card-type">
                        {item.type}
                      </div>

                      <h3 className="marketplace-card-title">
                        {item.name}
                      </h3>

                      <div className="marketplace-card-info">

                        {category === 'livestock' ? (
                          <>
                            <div className="marketplace-info-item">
                              Breed: {item.breed}
                            </div>

                            <div className="marketplace-info-item">
                              Age: {item.age} years
                            </div>

                            <div className="marketplace-info-item">
                              Sex: {item.sex}
                            </div>

                            <div className="marketplace-info-item">
                              Location: {item.location}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="marketplace-info-item">
                              Produced: {item.dateProduced}
                            </div>

                            <div className="marketplace-info-item">
                              Expires: {item.expiryDate}
                            </div>

                            <div className="marketplace-info-item">
                              Quantity: {item.quantity} g
                            </div>
                          </>
                        )}

                      </div>

                      <div className="marketplace-price">
                        KSh {item.price.toLocaleString()}
                      </div>

                      <button
                        type="button"
                        className="marketplace-card-button"
                      >
                        View listing
                      </button>

                    </div>

                  </article>
                ))}

              </div>
            ) : (
              <div className="empty-state">

                <h3>
                  {category === 'products'
                    ? "Sorry, but there's no produce recorded this month."
                    : 'No livestock matches your filters.'}
                </h3>

                <p>
                  {category === 'products'
                    ? 'Check back later for new farm products.'
                    : 'Try changing or clearing your filters.'}
                </p>

              </div>
            )}

          </section>

          <nav className="buyer-actions">

            <Link
              to="/buyer/checkout"
              className="buyer-action"
            >
              <FaShoppingCart size={13} />
              Checkout
            </Link>

            <Link
              to="/buyer/orders"
              className="buyer-action"
            >
              <FaClipboardList size={13} />
              Orders
            </Link>

            <Link
              to="/buyer/wishlist"
              className="buyer-action"
            >
              <FaHeart size={13} />
              Wishlist
            </Link>

            <Link
              to="/buyer/reviews"
              className="buyer-action"
            >
              <FaStar size={13} />
              Reviews
            </Link>

            <Link
              to="/buyer/profile"
              className="buyer-action"
            >
              <FaUser size={13} />
              Profile
            </Link>

            <Link
              to="/buyer/reports"
              className="buyer-action"
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
// commit 11
