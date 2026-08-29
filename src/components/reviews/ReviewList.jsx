import { useReviews } from "../../context/ReviewContext";
import ReviewCard from "./ReviewCard";

function ReviewList({ animalId }) {
    const { getReviewForanimal } = useReviews();
    const reviews = getReviewForanimal(animalId);

    if (reviews.length === 0) {
        return (
            <p className="text-gray-600 text-xl">
                No Reviews yet.
            </p>
        )
    }

  return (
    <div>
        {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
        ))}
    </div>
  )
}

export default ReviewList;