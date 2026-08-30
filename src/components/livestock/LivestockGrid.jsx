import LivestockCard from './LivestockCard'

function LivestockGrid({
  livestock = [],
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
}) {
  if (livestock.length === 0) {
    return (
      <>
        <div className="flex w-full flex-col items-center justify-center rounded-[20px] 
          border border-dashed border-[#b9c8bc] bg-[rgba(237,245,233,0.45)] px-6 py-15 text-center">
          <h2 className="mb-2 mt-0 font-serif text-[22px] text-[#385442]">No livestock found</h2>

          <p className="m-0 max-w-105 font-serif text-sm leading-[1.7] text-[#71847a]">
            Sorry, but there is no livestock matching
            your current search or filters.
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="grid w-full grid-cols-1 justify-center gap-6 min-[651px]:grid-cols-[repeat(auto-fit,minmax(280px,360px))]">
        {livestock.map((animal) => (
          <LivestockCard
            key={animal.id}
            livestock={animal}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            isWishlisted={wishlistIds.includes(animal.id)}
          />
        ))}
      </div>
    </>
  )
}

export default LivestockGrid
