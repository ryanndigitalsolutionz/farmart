import { useState } from "react";
import Modal from "../common/Modal";
import StarRating from "./StarRating";
import { useReviews } from "../../context/ReviewContext";
import { MdOutlineReorder } from "react-icons/md";

function ReviewModal() {
  const { addReview } = useReviews();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  if (!order) return null;

  const animal = order.items?.[0];

  const handClose = () => {
    setRating(0);
    setComment("");
    setError("");
    onclose();
  }
  const handleSubmit = () => {
    if (rating === 0 ){
      setError("please select a star rating before submitting.");
      return;
    }

    // TODO(backend): this becimes addReview() calling POST /api/reviews;

    addReview({
      orderId: order.id,
      animalId: animal?.id,
      buyerName: MdOutlineReorder.buyer?.name || "Anonymous",
      rating,
      comment: comment.trim(),
    });

    handClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handClose} title="Rate your Purchase">
      <div className="flex flex-col gap-3">
        {animal && (
          <p className="font-semibold">
            How was <span>{animal.breed}{animal.type}</span>from{""}
            <span className="font-semibolda">{animal.seller?.name || "your seller"}</span>
            ?
            </p>          
        )}
        <StarRating value={rating} onchange={setRating} />

        <textarea 
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell other buyers about your experience (optional)"
          rows={4}
          className="w-full border border-gray-300 rounded-lg p-2 
          resize-none focus:outline-none focus:ring-green-500"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-green-600 font-semibold p-2 rounded-lg cursor-pointer
             transition-all duration-200 hover:-transition-y-1 hover:scale-105 hover:shadow-lg "
          >
            Submit
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 border border-gray-300 text-gray-600 font-semibold
            p-1 rounded-lg cursor-pointer hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ReviewModal;