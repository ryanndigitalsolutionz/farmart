import ReviewCard from './ReviewCard'

function ReviewList({
  reviews = [],
}) {
  return (
    <section className="flex w-full flex-col gap-4">

        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
            />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-[#bdccc0] bg-[#f7faf7] 
          px-5 py-8.75 text-center font-farmart-body text-sm text-farmart-muted">
            No reviews yet.
          </div>
        )}

    </section>
  )
}

export default ReviewList
