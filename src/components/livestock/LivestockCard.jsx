import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'react-icons/fa'

function LivestockCard({ livestock, onAddToCart, onToggleWishlist, isWishlisted = false }) {
  if (!livestock) return null
  const { id, name, breed, type, location, age, sex, weight, price, seller, image, availability } = livestock

  return (
    <article className="w-full max-w-90 overflow-hidden rounded-[18px] border border-[#b9c8bc] bg-[#172019] text-[#edf4ee]
     shadow-[0_12px_28px_rgba(25,48,33,0.12)] transition-[box-shadow,border-color] duration-180 hover:border-[#83a58d] 
     hover:shadow-[0_16px_34px_rgba(25,48,33,0.18)]">
      <Link 
        to={`/buyer/livestock/${id}`} 
        className="block h-50 w-full bg-[#edf5e9] no-underline min-[501px]:h-55" 
        aria-label={`View ${name}`}
      >
        {image ? <img src={image} alt={name} className="block h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center font-farmart-body text-base text-[#61736a]">No image</div>}
      </Link>
      <div className="p-4.5 min-[501px]:px-5.25 min-[501px]:pb-5.5 min-[501px]:pt-5">
        <div className="flex items-start justify-between gap-3">
          <Link to={`/buyer/livestock/${id}`} className="min-w-0 text-[#f0f5f0] no-underline hover:text-[#72c9a3]"><h2 className="m-0 font-farmart-display text-lg font-bold leading-[1.3] min-[501px]:text-xl">{name}</h2></Link>
          <button 
            type="button" 
            className={`flex h-8.5 w-8.5 shrink-0 cursor-pointer items-center justify-center border-0 
              bg-transparent text-[#789184] transition-colors duration-180 hover:rounded-full 
              hover:bg-[rgba(230,198,92,0.08)] hover:text-[#e6c65c] ${isWishlisted ? 'text-[#e6c65c]' : ''}`}
            onClick={() => onToggleWishlist?.(livestock)} 
            aria-label={
              isWishlisted 
              ? 'Remove from wishlist' 
              : 'Add to wishlist'} aria-pressed={isWishlisted}
            >
              <Heart size={19} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
        </div>
        <p className="mb-0 mt-1.25 font-farmart-body text-sm leading-normal text-[#71847a]">{breed || type}{location ? ` • ${location}` : ''}</p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.75 font-farmart-body text-[13px] leading-normal text-[#81948a]">
          {age !== undefined && age !== null && <span>Age: {age}</span>}
          {sex && <span>Gender: {sex}</span>}
          {weight !== undefined && weight !== null && <span>Weight: {weight}kg</span>}
        </div>
        <div className="mb-4.25 mt-3.75 h-px bg-[#526259]" />
        <div className="flex items-end justify-between gap-3.75 min-[501px]:items-center">
          <div className="min-w-0">
            <p className="m-0 font-farmart-display text-[22px] font-bold leading-[1.2] text-[#4fdc82]">
              KES {Number(price || 0).toLocaleString()}
            </p>
            {seller && 
              <p className="mb-0 mt-1 truncate font-farmart-body text-[13px] leading-[1.4] text-[#71847a]">{seller}</p>}
            </div>
          {availability !== 'unavailable' ? 
            <button 
              type="button" 
              className="inline-flex min-h-11.5 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[13px] 
                border border-[#4a9f7b] bg-linear-to-br from-[#72c9a3] to-[#4a9f7b] px-3.25 
                font-farmart-body text-sm font-semibold text-white shadow-[0_7px_16px_rgba(74,159,123,0.18),inset_0_1px_0_rgba(255,255,255,0.25)] 
                transition-all duration-180 hover:from-[#82d4af] hover:to-[#55aa85] hover:shadow-[0_9px_20px_rgba(74,159,123,0.23),inset_0_1px_0_rgba(255,255,255,0.30)] 
                active:shadow-[inset_3px_3px_7px_rgba(0,0,0,0.14)] min-[501px]:min-h-13 min-[501px]:px-4.25" onClick={() => onAddToCart?.(livestock)}
            >
                <ShoppingCart size={16} />
                Add to cart
            </button> : 
            <span className="font-farmart-body text-[13px] text-[#b8c2bb]">Unavailable</span>}
        </div>
      </div>
    </article>
  )
}

export default LivestockCard
