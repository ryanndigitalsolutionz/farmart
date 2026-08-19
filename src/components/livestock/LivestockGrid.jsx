import LivestockCard from './LivestockCard'

const LivestockGrid = ({ listings, viewMode = 'grid', onCardClick, onWishlistToggle, onAddToCart, getWishlistedIds }) => {
  if (!listings || listings.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>
        <h3 className="empty-state-title">No listings found</h3>
        <p className="empty-state-message">Try adjusting your search or filters to find what you are looking for.</p>
      </div>
    )
  }

  return (
    <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-6' : 'flex flex-col gap-4'}`}>
      {listings.map((listing) => (
        <LivestockCard
          key={listing.id}
          listing={listing}
          viewMode={viewMode}
          onClick={() => onCardClick?.(listing.id)}
          onWishlistToggle={() => onWishlistToggle?.(listing)}
          onAddToCart={() => onAddToCart?.(listing)}
          isWishlisted={getWishlistedIds?.().includes(listing.id) || false}
        />
      ))}
    </div>
  )
}

export default LivestockGrid
