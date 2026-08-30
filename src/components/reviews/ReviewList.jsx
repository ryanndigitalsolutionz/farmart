import { useReviews } from "../../context/ReviewContext";
import ReviewCard from "./ReviewCard";

function ReviewList({ animalId }) {
    const { getReviewsForAnimal } = useReviews();
    const reviews = getReviewsForAnimal(animalId);

    if (reviews.length === 0) {
        return (
            <p className="text-gray-600 text-sm">
                No Reviews yet.
            </p>
        )
    }

  return (
    <div className="flex flex-col gap-2">
        {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
        ))}
    </div>
  )
}

export default ReviewList;