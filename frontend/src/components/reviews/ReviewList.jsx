import ReviewCard from './ReviewCard'

function ReviewList({
  reviews = [],
}) {
  return (
    <>
      <style>{`
        .farmart-review-list {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
      `}</style>

      <section className="farmart-review-list">

        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
            />
          ))
        ) : (
          <div 
          className="farmart-review-list-empty bg-[#f7faf7] text-[#718078] 
          font-[var(--farm-body-font)] text-[14px] text-center">
            No reviews yet.
          </div>
        )}

      </section>
    </>
  )
}

export default ReviewList
