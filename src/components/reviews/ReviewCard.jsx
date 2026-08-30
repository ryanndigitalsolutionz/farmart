function ReviewCard({
  review,
}) {
  if (!review) return null

  const {
    rating = 0,
    comment,
    buyerName = 'Buyer',
    createdAt,
  } = review

  return (
    <article className="w-full rounded-2xl border border-[#d8e3da] bg-white p-5 
    shadow-[4px_4px_12px_rgba(48,72,56,0.07)]">

        <div className="flex items-start justify-between gap-3.75">

          <div>
            <p className="m-0 font-farmart-display text-base font-bold text-[#304b39]">
              {buyerName}
            </p>

            {createdAt && (
              <p className="mb-0 mt-1 font-farmart-body text-xs text-[#89958d]">
                {createdAt}
              </p>
            )}
          </div>

          <div
            className="flex gap-0.5 font-farmart-body text-base tracking-[1px] text-[#c9a33a]"
            aria-label={`${rating} out of 5 stars`}
          >
            {'★'.repeat(Math.max(0, Math.min(5, rating)))}
            {'☆'.repeat(Math.max(0, 5 - rating))}
          </div>

        </div>

        {comment ? (
          <p className="mb-0 mt-4 font-farmart-body text-sm leading-[1.7] text-[#627268]">
            {comment}
          </p>
        ) : (
          <p className="mb-0 mt-4 font-farmart-body text-sm leading-[1.7] text-[#7c8981]">
            No comment provided.
          </p>
        )}

    </article>
  )
}

export default ReviewCard
