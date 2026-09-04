import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaStar,
  FaEdit,
  FaTrash,
  FaPen,
  FaArrowLeft,
} from 'react-icons/fa'

import API_BASE_URL from '../../api/api'

function Reviews() {
  const [reviews, setReviews] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [editRating, setEditRating] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(`${API_BASE}/reviews`, {
          credentials: 'include',
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.message ||
            data.error ||
            'Unable to load reviews.'
          )
        }

        const reviewList = Array.isArray(data)
          ? data
          : Array.isArray(data.reviews)
            ? data.reviews
            : []

        const normalizedReviews = reviewList.map((review) => ({
          id: review.id,
          farmer:
            review.farmer?.farm_name ||
            review.farmer?.farmName ||
            review.farmer?.name ||
            review.farmer_name ||
            review.farm_name ||
            'Farm',
          item:
            review.livestock?.name ||
            review.product?.name ||
            review.item?.name ||
            review.item_name ||
            'Farm Item',
          rating: Number(review.rating || 0),
          comment: review.comment || '',
          date: review.created_at
            ? new Date(review.created_at).toLocaleDateString()
            : review.date || '',
          livestockId:
            review.livestock_id ||
            review.livestock?.id ||
            null,
          productId:
            review.product_id ||
            review.product?.id ||
            null,
        }))

        setReviews(normalizedReviews)
      } catch (requestError) {
        setError(
          requestError.message ||
          'Unable to load reviews.'
        )
        setReviews([])
      } finally {
        setIsLoading(false)
      }
    }

    loadReviews()
  }, [])

  const startEditing = (review) => {
    setEditingId(review.id)
    setEditText(review.comment)
    setEditRating(review.rating)
    setError('')
    setSuccess('')
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditText('')
    setEditRating(0)
    setError('')
  }

  const saveEdit = async (reviewId) => {
    if (!editText.trim()) {
      setError('Review comment cannot be empty.')
      return
    }

    if (editRating < 1 || editRating > 5) {
      setError('Please select a rating from 1 to 5 stars.')
      return
    }

    try {
      setIsSaving(true)
      setError('')
      setSuccess('')

      const response = await fetch(
        `${API_BASE}/reviews/${reviewId}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            rating: editRating,
            comment: editText.trim(),
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
          data.error ||
          'Unable to update review.'
        )
      }

      const updatedReview =
        data.review ||
        data

      setReviews((currentReviews) =>
        currentReviews.map((review) =>
          review.id === reviewId
            ? {
                ...review,
                rating: Number(
                  updatedReview.rating ?? editRating
                ),
                comment:
                  updatedReview.comment ??
                  editText.trim(),
                date: updatedReview.updated_at
                  ? new Date(
                      updatedReview.updated_at
                    ).toLocaleDateString()
                  : review.date,
              }
            : review
        )
      )

      setEditingId(null)
      setEditText('')
      setEditRating(0)
      setSuccess('Review updated successfully.')
    } catch (requestError) {
      setError(
        requestError.message ||
        'Unable to update review.'
      )
    } finally {
      setIsSaving(false)
    }
  }

  const deleteReview = async (reviewId) => {
    try {
      setError('')
      setSuccess('')

      const response = await fetch(
        `${API_BASE}/reviews/${reviewId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
          data.error ||
          'Unable to delete review.'
        )
      }

      setReviews((currentReviews) =>
        currentReviews.filter(
          (review) => review.id !== reviewId
        )
      )

      if (editingId === reviewId) {
        cancelEditing()
      }

      setSuccess('Review deleted successfully.')
    } catch (requestError) {
      setError(
        requestError.message ||
        'Unable to delete review.'
      )
    }
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

        .buyer-reviews-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 25px;
          padding: 10px 15px;
          border: 1px solid #d1e1d3;
          border-radius: 10px;
          background: #ffffff;
          color: #53645a;
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition:
            border-color 180ms ease,
            background 180ms ease,
            color 180ms ease,
            transform 180ms ease;
        }

        .buyer-reviews-back:hover {
          border-color: #2d7042;
          background: #eef6ef;
          color: #2d7042;
          transform: translateX(-2px);
        }

        .buyer-reviews-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 25px;
          margin-bottom: 24px;
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

        .buyer-reviews-message {
          margin-bottom: 18px;
          padding: 13px 16px;
          border-radius: 12px;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
        }

        .buyer-reviews-error {
          border: 1px solid #dfbbb5;
          background: #faece9;
          color: #a3483b;
        }

        .buyer-reviews-success {
          border: 1px solid #c4ddc9;
          background: #eef7ef;
          color: #2d7042;
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

        .buyer-review-edit-rating {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 20px;
        }

        .buyer-review-rating-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 3px;
          border: 0;
          background: transparent;
          cursor: pointer;
        }

        .buyer-review-rating-button:disabled {
          cursor: not-allowed;
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
          border: 1px solid #b9ccbd;
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

        .buyer-review-button:hover:not(:disabled) {
          border-color: #2d7042;
          background: #eef6ef;
          color: #2d7042;
        }

        .buyer-review-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .buyer-review-delete {
          border-color: #e0c4bf;
          color: #a3483b;
        }

        .buyer-review-delete:hover:not(:disabled) {
          border-color: #b85a4c;
          background: #f8e9e6;
          color: #9c3f32;
        }

        .buyer-review-save {
          border-color: #2d7042;
          background: #2d7042;
          color: #ffffff;
        }

        .buyer-review-save:hover:not(:disabled) {
          background: #245d36;
          color: #ffffff;
        }

        .buyer-review-cancel {
          background: transparent;
        }

        .buyer-reviews-empty {
          padding: 70px 30px;
          border: 1px dashed #b9ccbd;
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

        .buyer-reviews-loading {
          padding: 70px 30px;
          border: 1px dashed #b9ccbd;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.55);
          color: #748078;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          text-align: center;
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

          <Link
            to="/buyer/marketplace"
            className="buyer-reviews-back"
          >
            <FaArrowLeft size={12} />
            Back to Marketplace
          </Link>

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
              {reviews.length === 1
                ? 'Review'
                : 'Reviews'}
            </span>
          </header>

          {error && (
            <div className="buyer-reviews-message buyer-reviews-error">
              {error}
            </div>
          )}

          {success && (
            <div className="buyer-reviews-message buyer-reviews-success">
              {success}
            </div>
          )}

          {isLoading ? (
            <section className="buyer-reviews-loading">
              Loading reviews...
            </section>
          ) : reviews.length === 0 ? (
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

                    {editingId === review.id ? (
                      <div className="buyer-review-edit-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className="buyer-review-rating-button"
                            onClick={() =>
                              setEditRating(star)
                            }
                            disabled={isSaving}
                            aria-label={`Give ${star} out of 5 stars`}
                          >
                            <FaStar
                              size={22}
                              className={
                                star <= editRating
                                  ? 'buyer-review-star'
                                  : 'buyer-review-star empty'
                              }
                            />
                          </button>
                        ))}
                      </div>
                    ) : (
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
                    )}
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
                        disabled={isSaving}
                      />

                      <div className="buyer-review-actions">
                        <span className="buyer-review-date">
                          Originally written {review.date}
                        </span>

                        <div className="buyer-review-buttons">
                          <button
                            type="button"
                            className="buyer-review-button buyer-review-cancel"
                            onClick={cancelEditing}
                            disabled={isSaving}
                          >
                            Cancel
                          </button>

                          <button
                            type="button"
                            className="buyer-review-button buyer-review-save"
                            onClick={() =>
                              saveEdit(review.id)
                            }
                            disabled={isSaving}
                          >
                            {isSaving ? 'Saving...' : 'Save'}
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
