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

        .farmart-review-list-empty {
          padding: 35px 20px;

          border: 1px dashed #bdccc0;
          border-radius: 16px;

          background: #f7faf7;

          color: #718078;

          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          text-align: center;
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
          <div className="farmart-review-list-empty">
            No reviews yet.
          </div>
        )}

      </section>
    </>
  )
}

export default ReviewList
