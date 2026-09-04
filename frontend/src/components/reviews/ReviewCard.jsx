import { Star } from "lucide-react";

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
    <>
      <style>{`
        .farmart-review-card {
          width: 100%;
          padding: 20px;

          border: 1px solid #d8e3da;
          border-radius: 16px;

          background: #ffffff;

          box-shadow:
            4px 4px 12px rgba(48, 72, 56, 0.07);
        }

        .farmart-review-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
        }

        .farmart-review-buyer {
          margin: 0;

          color: #304b39;

          font-family: "IBM Plex Serif", serif;
          font-size: 16px;
          font-weight: 700;
        }

        .farmart-review-date {
          margin: 4px 0 0;

          color: #89958d;

          font-family: "Modern Antiqua", serif;
          font-size: 12px;
        }

        .farmart-review-rating {
          display: flex;
          gap: 2px;

          color: #c9a33a;
          font-size: 16px;
          letter-spacing: 1px;
        }

        .farmart-review-comment {
          margin: 16px 0 0;

          color: #627268;

          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          line-height: 1.7;
        }

        .farmart-review-empty {
          color: #7c8981;
        }
      `}</style>

      <article className="farmart-review-card">

        <div className="farmart-review-header">

          <div>
            <p className="farmart-review-buyer">
              {buyerName}
            </p>

            {createdAt && (
              <p className="farmart-review-date">
                {createdAt}
              </p>
            )}
          </div>

          <div
            className="farmart-review-rating"
            aria-label={`${rating} out of 5 stars`}
          >
            {Array.from({ length: Math.max(0, Math.min(5, rating)) }).map((_, idx) => (
              <Star key={`filled-${idx}`} size={14} className="inline-block" />
            ))}
            {Array.from({ length: Math.max(0, 5 - rating) }).map((_, idx) => (
              <Star key={`empty-${idx}`} size={14} className="inline-block opacity-20" />
            ))}
          </div>

        </div>

        {comment ? (
          <p className="farmart-review-comment">
            {comment}
          </p>
        ) : (
          <p className="farmart-review-comment farmart-review-empty">
            No comment provided.
          </p>
        )}

      </article>
    </>
  )
}

export default ReviewCard
