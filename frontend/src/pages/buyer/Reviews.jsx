import { useState } from 'react'
import { FaStar, FaEdit, FaTrash, FaPen } from 'react-icons/fa'

function Reviews() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      farmer: 'Jomo Farm',
      item: 'Friesian Cow',
      rating: 5,
      comment:
        'The cow was healthy and exactly as described. The farmer was also very helpful throughout the purchase.',
      date: '8/24/2026',
    },
    {
      id: 2,
      farmer: 'Green Valley Farm',
      item: 'Fresh Eggs',
      rating: 4,
      comment:
        'Good quality eggs and they arrived fresh. I would definitely order from this farm again.',
      date: '8/18/2026',
    },
  ])

  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  const startEditing = (review) => {
    setEditingId(review.id)
    setEditText(review.comment)
  }

  const saveEdit = (reviewId) => {
    if (!editText.trim()) return

    setReviews((currentReviews) =>
      currentReviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              comment: editText.trim(),
            }
          : review,
      ),
    )

    setEditingId(null)
    setEditText('')
  }

  const deleteReview = (reviewId) => {
    setReviews((currentReviews) =>
      currentReviews.filter(
        (review) => review.id !== reviewId,
      ),
    )
  }

  return (
    <>
      <style>{`
        .buyer-reviews-page {
          min-height: 100vh;
          padding: 42px 36px 70px;
          background: #f4f8f2;
          color: #173d28;
          box-sizing: border-box;
        }

        .buyer-reviews-container {
          width: min(100%, 1050px);
          margin: 0 auto;
        }

        .buyer-reviews-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 25px;
          margin-bottom: 32px;
        }

        .buyer-reviews-title {
          margin: 0;
          color: #173d28;
          font-family: "IBM Plex Serif", serif;
          font-size: 36px;
        }

        .buyer-reviews-subtitle {
          margin: 10px 0 0;
          color: #748078;
          font-family: "Modern Antiqua", serif;
          font-size: 16px;
        }

        .buyer-reviews-count {
          padding: 9px 15px;
          border: 1px solid #d1e1d3;
          border-radius: 999px;
          background: #eef6ef;
          color: #2d7042;
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;
        }

        .buyer-reviews-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .buyer-review-card {
          padding: 27px 30px;
          border: 1px solid #d1e1d3;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.8);
          box-shadow:
            7px 7px 16px rgba(45, 112, 66, 0.07),
            -5px -5px 13px rgba(255, 255, 255, 0.8);
        }

        .buyer-review-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
        }

        .buyer-review-farmer {
          margin: 0;
          color: #173d28;
          font-family: "IBM Plex Serif", serif;
          font-size: 21px;
        }

        .buyer-review-item {
          margin: 6px 0 0;
          color: #748078;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
        }

        .buyer-review-rating {
          display: flex;
          gap: 4px;
          flex-shrink: 0;
        }

        .buyer-review-star {
          color: #d4a938;
        }

        .buyer-review-star.empty {
          color: #d7ddd8;
        }

        .buyer-review-comment {
          margin: 22px 0 0;
          color: #425248;
          font-family: "Modern Antiqua", serif;
          font-size: 15px;
          line-height: 1.75;
        }

        .buyer-review-edit-area {
          margin-top: 20px;
        }

        .buyer-review-textarea {
          width: 100%;
          min-height: 120px;
          padding: 14px 16px;
          border: 1px solid #b9ccbD;
          border-radius: 12px;
          outline: none;
          resize: vertical;
          background: #ffffff;
          color: #173d28;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          line-height: 1.6;
          box-sizing: border-box;
        }

        .buyer-review-textarea:focus {
          border-color: #2d7042;
          box-shadow: 0 0 0 3px rgba(45, 112, 66, 0.1);
        }

        .buyer-review-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-top: 21px;
          padding-top: 17px;
          border-top: 1px solid #dfe8df;
        }

        .buyer-review-date {
          color: #8a968e;
          font-family: "Modern Antiqua", serif;
          font-size: 12px;
        }

        .buyer-review-buttons {
          display: flex;
          gap: 9px;
        }

        .buyer-review-button {
          min-height: 37px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 0 13px;
          border: 1px solid #ccdacf;
          border-radius: 9px;
          background: #ffffff;
          color: #53645a;
          font-family: "Modern Antiqua", serif;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition:
            border-color 180ms ease,
            background 180ms ease,
            color 180ms ease;
        }

        .buyer-review-button:hover {
          border-color: #2d7042;
          background: #eef6ef;
          color: #2d7042;
        }

        .buyer-review-delete {
          border-color: #e0c4bf;
          color: #a3483b;
        }

        .buyer-review-delete:hover {
          border-color: #b85a4c;
          background: #f8e9e6;
          color: #9c3f32;
        }

        .buyer-review-save {
          border-color: #2d7042;
          background: #2d7042;
          color: #ffffff;
        }

        .buyer-review-save:hover {
          background: #245d36;
          color: #ffffff;
        }

        .buyer-review-cancel {
          background: transparent;
        }

        .buyer-reviews-empty {
          padding: 70px 30px;
          border: 1px dashed #b9ccbD;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.55);
          text-align: center;
        }

        .buyer-reviews-empty-icon {
          width: 58px;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 17px;
          border-radius: 50%;
          background: #eef6ef;
          color: #2d7042;
        }

        .buyer-reviews-empty h2 {
          margin: 0;
          color: #173d28;
          font-family: "IBM Plex Serif", serif;
          font-size: 23px;
        }

        .buyer-reviews-empty p {
          max-width: 500px;
          margin: 9px auto 0;
          color: #748078;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          line-height: 1.6;
        }

        @media (max-width: 650px) {
          .buyer-reviews-page {
            padding: 30px 18px 55px;
          }

          .buyer-reviews-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .buyer-review-card {
            padding: 22px;
          }

          .buyer-review-top {
            flex-direction: column;
          }

          .buyer-review-rating {
            order: -1;
          }

          .buyer-review-actions {
            align-items: flex-start;
            flex-direction: column;
          }

          .buyer-review-buttons {
            width: 100%;
          }

          .buyer-review-button {
            flex: 1;
          }
        }
      `}</style>

      <main className="buyer-reviews-page">
        <div className="buyer-reviews-container">

          <header className="buyer-reviews-header">
            <div>
              <h1 className="buyer-reviews-title">
                My Reviews
              </h1>

              <p className="buyer-reviews-subtitle">
                Share your experience with farmers and their
                products.
              </p>
            </div>

            <span className="buyer-reviews-count">
              {reviews.length}{' '}
              {reviews.length === 1 ? 'Review' : 'Reviews'}
            </span>
          </header>

          {reviews.length === 0 ? (
            <section className="buyer-reviews-empty">
              <div className="buyer-reviews-empty-icon">
                <FaPen size={21} />
              </div>

              <h2>
                You haven't written any reviews yet.
              </h2>

              <p>
                Once you purchase something through Farmart,
                you'll be able to share your experience here.
              </p>
            </section>
          ) : (
            <section className="buyer-reviews-list">
              {reviews.map((review) => (
                <article
                  className="buyer-review-card"
                  key={review.id}
                >
                  <div className="buyer-review-top">
                    <div>
                      <h2 className="buyer-review-farmer">
                        {review.farmer}
                      </h2>

                      <p className="buyer-review-item">
                        {review.item}
                      </p>
                    </div>

                    <div
                      className="buyer-review-rating"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          size={17}
                          className={
                            star <= review.rating
                              ? 'buyer-review-star'
                              : 'buyer-review-star empty'
                          }
                        />
                      ))}
                    </div>
                  </div>

                  {editingId === review.id ? (
                    <div className="buyer-review-edit-area">
                      <textarea
                        className="buyer-review-textarea"
                        value={editText}
                        onChange={(event) =>
                          setEditText(event.target.value)
                        }
                        aria-label="Edit review"
                      />

                      <div className="buyer-review-actions">
                        <span className="buyer-review-date">
                          Originally written {review.date}
                        </span>

                        <div className="buyer-review-buttons">
                          <button
                            type="button"
                            className="buyer-review-button buyer-review-cancel"
                            onClick={() => {
                              setEditingId(null)
                              setEditText('')
                            }}
                          >
                            Cancel
                          </button>

                          <button
                            type="button"
                            className="buyer-review-button buyer-review-save"
                            onClick={() =>
                              saveEdit(review.id)
                            }
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="buyer-review-comment">
                        {review.comment}
                      </p>

                      <div className="buyer-review-actions">
                        <span className="buyer-review-date">
                          {review.date}
                        </span>

                        <div className="buyer-review-buttons">
                          <button
                            type="button"
                            className="buyer-review-button"
                            onClick={() =>
                              startEditing(review)
                            }
                          >
                            <FaEdit />
                            Edit
                          </button>

                          <button
                            type="button"
                            className="buyer-review-button buyer-review-delete"
                            onClick={() =>
                              deleteReview(review.id)
                            }
                          >
                            <FaTrash />
                            Delete
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </article>
              ))}
            </section>
          )}

        </div>
      </main>
    </>
  )
}

export default Reviews