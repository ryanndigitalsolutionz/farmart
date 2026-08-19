import { useState, useMemo } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useOrders } from '../../context/OrderContext'
import { ORDER_STATUS } from '../../constants/userRoles'
import { Star } from 'lucide-react'
import ReviewList from '../../components/reviews/ReviewList'
import Button from '../../components/common/Button'
import Badge from '../../components/common/Badge'
import Textarea from '../../components/common/Textarea'

const BuyerReviews = () => {
  const { currentUser } = useAuth()
  const { reviews, orders, addReview } = useOrders()

  const [selectedOrder, setSelectedOrder] = useState(null)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')
  const [reviewError, setReviewError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const myReviews = useMemo(() => {
    if (!currentUser) return []
    return reviews.filter((r) => r.buyerId === currentUser.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }, [reviews, currentUser])

  const completedOrdersWithoutReview = useMemo(() => {
    if (!currentUser) return []
    return orders.filter((o) => {
      const isBuyerOrder = o.buyerId === currentUser.id
      const isCompleted = o.orderStatus === ORDER_STATUS.COMPLETED
      const hasReview = reviews.some((r) => r.orderId === o.id && r.buyerId === currentUser.id)
      return isBuyerOrder && isCompleted && !hasReview
    })
  }, [orders, reviews, currentUser])

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    setReviewError('')

    if (!reviewComment.trim()) {
      setReviewError('Please enter a comment')
      return
    }

    if (!selectedOrder) {
      setReviewError('Please select an order to review')
      return
    }

    setIsSubmitting(true)
    try {
      addReview({
        orderId: selectedOrder.id,
        livestockId: selectedOrder.items?.[0]?.livestockId,
        buyerId: currentUser.id,
        buyerName: currentUser.name,
        rating: reviewRating,
        comment: reviewComment.trim(),
      })
      setReviewRating(5)
      setReviewComment('')
      setSelectedOrder(null)
    } catch {
      setReviewError('Failed to submit review. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!currentUser) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Please log in to view your reviews.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
        <p className="text-gray-600 mt-1">Reviews you've submitted for completed orders</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {completedOrdersWithoutReview.length > 0 && !selectedOrder && (
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Leave a Review</h3>
              <p className="text-sm text-gray-600">You have completed orders waiting for your review</p>
            </div>
            <div className="card-body">
              <div className="space-y-3 mb-4">
                {completedOrdersWithoutReview.map((order) => (
                  <div
                    key={order.id}
                    className="flex justify-between items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div>
                      <p className="font-medium text-gray-900">Order #{order.id?.slice(-8).toUpperCase()}</p>
                      <p className="text-sm text-gray-500">{order.items?.map((i) => i.name).join(', ')}</p>
                    </div>
                    <Badge variant="green">Completed</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedOrder && (
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Review Order #{selectedOrder.id?.slice(-8).toUpperCase()}</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmitReview}>
                <div className="form-group mb-4">
                  <label className="form-label">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                      >
                        <Star
                          size={24}
                          className={star <= reviewRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <Textarea
                  name="comment"
                  label="Comment"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your experience..."
                  error={reviewError}
                  required
                />
                <div className="flex gap-2 mt-4">
                  <Button type="submit" loading={isSubmitting}>Submit Review</Button>
                  <Button type="button" variant="secondary" onClick={() => setSelectedOrder(null)}>Cancel</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Reviews</h3>
          <ReviewList reviews={myReviews} emptyMessage="You haven't submitted any reviews yet." />
        </div>
      </div>
    </div>
  )
}

export default BuyerReviews
