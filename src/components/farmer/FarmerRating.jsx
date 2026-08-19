import { Star } from 'lucide-react'

const FarmerRating = ({ rating, count = 0, size = 'md' }) => {
  const fullStars = Math.floor(rating || 0)
  const hasHalfStar = (rating || 0) % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  const sizeClass = size === 'lg' ? 'text-2xl' : 'text-lg'

  return (
    <div className={`flex items-center gap-1 ${sizeClass}`}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} size={16} className="text-yellow-400 fill-yellow-400" />
      ))}
      {hasHalfStar && <Star key="half" size={16} className="text-yellow-400 fill-yellow-400 opacity-50" />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} size={16} className="text-gray-300" />
      ))}
      <span className="ml-2 text-gray-600 text-sm">
        {(rating || 0).toFixed(1)} ({count})
      </span>
    </div>
  )
}

export default FarmerRating
