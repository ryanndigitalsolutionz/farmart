import StarRating from "./StarRating"

function ReviewCard({ review }) {
  return (
    <div className="border border-gray-200 rounded-xl bg-white shadow-sm">
        <div className="flex justify-between items-center mb-1">
            <span className="font-semibold">
                {review.buyerName}
            </span>
            <span className="text-xs text-gray-400">
                {new Date(review.createdAt).toLocaleDateString()}
            </span>
        </div>
        <StarRating value={review.rating} size={16}/>

        {review.comment && (
            <p className="">{review.comment}</p>
        )}
    </div>
  )
}

export default ReviewCard