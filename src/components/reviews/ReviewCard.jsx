import { Star } from 'lucide-react'
import { formatDate } from '../../utils/formatDate'

const ReviewCard = ({ review }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={18}
                className={star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
        </div>
        <p className="text-gray-700 text-sm">{review.comment}</p>
        {review.buyerName && (
          <p className="text-xs text-gray-500 mt-2">by {review.buyerName}</p>
        )}
      </div>
    </div>
  )
}

export default ReviewCard
