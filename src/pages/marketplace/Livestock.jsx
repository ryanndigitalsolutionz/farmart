import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLivestock } from '../../context/LivestockContext'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useNotifications } from '../../context/NotificationContext'
import { SORT_OPTIONS, LISTING_CATEGORIES, HEALTH_STATUS_OPTIONS, KENYAN_LOCATIONS, BREEDS } from '../../constants/livestockTypes'
import { Search, SlidersHorizontal } from 'lucide-react'
import LivestockCard from '../../components/livestock/LivestockCard'

const Marketplace = () => {
  const navigate = useNavigate()
  const { listings, searchListings, sortListings } = useLivestock()
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { addNotification } = useNotifications()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState({
    breed: 'all',
    ageMin: '',
    ageMax: '',
    minPrice: '',
    maxPrice: '',
    location: 'all',
    healthStatus: 'all',
  })

  const filteredListings = useMemo(() => {
    let results = searchListings(searchQuery, {
      type: selectedCategory,
      breed: filters.breed,
      location: filters.location,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      healthStatus: filters.healthStatus,
      ageMin: filters.ageMin,
      ageMax: filters.ageMax,
    })

    results = sortListings(results, sortBy)

    return results.filter((l) => l.status === 'approved')
  }, [searchQuery, selectedCategory, sortBy, filters, searchListings, sortListings])

  const handleCardClick = (id) => {
    navigate(`/livestock/${id}`)
  }

  const handleWishlistToggle = (listing) => {
    toggleWishlist(listing)
    const inWishlist = isInWishlist(listing.id)
    addNotification({
      type: inWishlist ? 'review_received' : 'listing_approved',
      title: inWishlist ? 'Removed from Wishlist' : 'Added to Wishlist',
      message: `${listing.name} has been ${inWishlist ? 'removed from' : 'added to'} your wishlist.`,
      link: '/buyer/wishlist',
    })
  }

  const handleAddToCart = (listing) => {
    addToCart({
      livestockId: listing.id,
      name: listing.name,
      price: listing.price,
      image: listing.images?.[0],
      farmerId: listing.farmerId,
      farmerName: listing.farmerName,
    })
    addNotification({
      type: 'order_placed',
      title: 'Added to Cart',
      message: `${listing.name} has been added to your cart.`,
      link: '/buyer/cart',
    })
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      breed: 'all',
      ageMin: '',
      ageMax: '',
      minPrice: '',
      maxPrice: '',
      location: 'all',
      healthStatus: 'all',
    })
    setSearchQuery('')
    setSelectedCategory('all')
  }

  const categoryCounts = useMemo(() => {
    const counts = { all: listings.filter((l) => l.status === 'approved').length }
    listings.forEach((l) => {
      if (l.status === 'approved') {
        counts[l.type] = (counts[l.type] || 0) + 1
      }
    })
    return counts
  }, [listings])

  const activeFiltersCount = Object.entries(filters).filter(([, val]) => val && val !== 'all').length + (selectedCategory !== 'all' ? 1 : 0) + (searchQuery ? 1 : 0)

  return (
    <div className="marketplace-page">
      <div className="marketplace-header">
        <div className="marketplace-header-top">
          <h1 className="marketplace-title">Marketplace</h1>
          <p className="marketplace-subtitle">Browse quality livestock from trusted farmers across Kenya</p>
        </div>
        <div className="marketplace-controls">
          <div className="search-bar-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="form-input search-input"
              placeholder="Search by name, breed, type, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className={`btn btn-secondary btn-md ${showFilters ? 'btn-active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal size={18} />
            Filters
            {activeFiltersCount > 0 && <span className="filter-badge">{activeFiltersCount}</span>}
          </button>
          <select className="form-select sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <div className="view-toggle">
            <button className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setViewMode('grid')}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1" /><rect x="9" y="1" width="6" height="6" rx="1" /><rect x="1" y="9" width="6" height="6" rx="1" /><rect x="9" y="9" width="6" height="6" rx="1" /></svg>
            </button>
            <button className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setViewMode('list')}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="2" width="14" height="3" rx="1" /><rect x="1" y="7" width="14" height="3" rx="1" /><rect x="1" y="12" width="14" height="3" rx="1" /></svg>
            </button>
          </div>
        </div>

        <div className="category-filters">
          <button
            className={`category-btn ${selectedCategory === 'all' ? 'category-btn-active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All
            <span className="category-count">{categoryCounts.all || 0}</span>
          </button>
          {LISTING_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`category-btn ${selectedCategory === cat.id ? 'category-btn-active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.icon}</span>
              {cat.name}
              <span className="category-count">{categoryCounts[cat.id] || 0}</span>
            </button>
          ))}
        </div>

        {showFilters && (
          <div className="advanced-filters">
            <div className="filters-grid">
              <div className="form-group">
                <label className="form-label">Breed</label>
                <select className="form-select" value={filters.breed} onChange={(e) => handleFilterChange('breed', e.target.value)}>
                  <option value="all">All Breeds</option>
                  {selectedCategory !== 'all' && BREEDS[selectedCategory] ? (
                    <optgroup label={selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}>
                      {BREEDS[selectedCategory].map((breed) => (
                        <option key={breed} value={breed}>{breed}</option>
                      ))}
                    </optgroup>
                  ) : (
                    Object.entries(BREEDS).map(([type, breedList]) => (
                      <optgroup key={type} label={type.charAt(0).toUpperCase() + type.slice(1)}>
                        {breedList.map((breed) => (
                          <option key={`${type}-${breed}`} value={breed}>{breed}</option>
                        ))}
                      </optgroup>
                    ))
                  )}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Min Age (years)</label>
                <input type="number" className="form-input" value={filters.ageMin} onChange={(e) => handleFilterChange('ageMin', e.target.value)} placeholder="0" min="0" />
              </div>
              <div className="form-group">
                <label className="form-label">Max Age (years)</label>
                <input type="number" className="form-input" value={filters.ageMax} onChange={(e) => handleFilterChange('ageMax', e.target.value)} placeholder="Any" min="0" />
              </div>
              <div className="form-group">
                <label className="form-label">Min Price (KSh)</label>
                <input type="number" className="form-input" value={filters.minPrice} onChange={(e) => handleFilterChange('minPrice', e.target.value)} placeholder="0" min="0" />
              </div>
              <div className="form-group">
                <label className="form-label">Max Price (KSh)</label>
                <input type="number" className="form-input" value={filters.maxPrice} onChange={(e) => handleFilterChange('maxPrice', e.target.value)} placeholder="Any" min="0" />
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <select className="form-select" value={filters.location} onChange={(e) => handleFilterChange('location', e.target.value)}>
                  <option value="all">All Locations</option>
                  {KENYAN_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Health Status</label>
                <select className="form-select" value={filters.healthStatus} onChange={(e) => handleFilterChange('healthStatus', e.target.value)}>
                  <option value="all">All Statuses</option>
                  {HEALTH_STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="filters-actions">
              <button className="btn btn-secondary btn-sm" onClick={clearFilters}>Clear Filters</button>
            </div>
          </div>
        )}
      </div>

        <div className="marketplace-results">
          <div className="results-header">
            <p className="results-count">
              {`${filteredListings.length} result${filteredListings.length !== 1 ? 's' : ''} found`}
            </p>
            {activeFiltersCount > 0 && (
              <button className="clear-filters-btn" onClick={clearFilters}>
                Clear all filters
              </button>
            )}
          </div>

          {filteredListings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Search size={48} />
              </div>
              <h3 className="empty-state-title">No listings found</h3>
              <p className="empty-state-message">Try adjusting your search or filters to find what you're looking for.</p>
              <button className="btn btn-primary btn-md" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
          <div className={`${viewMode === 'grid' ? 'livestock-grid-view' : 'livestock-list-view'}`}>
            {filteredListings.map((listing) => (
              <LivestockCard
                key={listing.id}
                listing={listing}
                viewMode={viewMode}
                onClick={() => handleCardClick(listing.id)}
                onWishlistToggle={() => handleWishlistToggle(listing)}
                onAddToCart={() => handleAddToCart(listing)}
                isWishlisted={isInWishlist(listing.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Marketplace
