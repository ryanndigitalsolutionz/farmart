import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useOrders } from '../../context/OrderContext'
import { useNotifications } from '../../context/NotificationContext'
import { ORDER_STATUS } from '../../constants/userRoles'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'
import { downloadInvoice } from '../../utils/downloadFile'
import OrderStatus from '../../components/orders/OrderStatus'
import OrderSummary from '../../components/orders/OrderSummary'
import OrderTimeline from '../../components/orders/OrderTimeline'
import Button from '../../components/common/Button'
import Badge from '../../components/common/Badge'
import Textarea from '../../components/common/Textarea'

const BuyerOrderDetails = () => {
  const { id } = useParams()
  const { currentUser } = useAuth()
  const { getOrderById, addReview, reviews } = useOrders()
  const { addNotification } = useNotifications()

  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')
  const [reviewError, setReviewError] = useState('')
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)

  const order = useMemo(() => getOrderById(id), [id, getOrderById])
  const orderReviews = useMemo(() => reviews.filter((r) => r.orderId === id), [id, reviews])

  const hasReviewed = orderReviews.some((r) => r.buyerId === currentUser?.id)
  const canReview = order && order.orderStatus === ORDER_STATUS.COMPLETED && !hasReviewed

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Order not found.</p>
        <Link to="/buyer/orders" className="btn btn-primary btn-md mt-4">Back to Orders</Link>
      </div>
    )
  }

  const handleDownloadInvoice = () => {
    downloadInvoice(order)
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    setReviewError('')

    if (!reviewComment.trim()) {
      setReviewError('Please enter a comment')
      return
    }

    if (reviewRating < 1 || reviewRating > 5) {
      setReviewError('Please select a rating')
      return
    }

    setIsSubmittingReview(true)
    try {
      addReview({
        orderId: order.id,
        livestockId: order.items?.[0]?.livestockId,
        buyerId: currentUser.id,
        buyerName: currentUser.name,
        rating: reviewRating,
        comment: reviewComment.trim(),
      })
      addNotification({
        type: 'review_received',
        title: 'Review Submitted',
        message: 'Thank you for your review!',
      })
      setShowReviewForm(false)
      setReviewRating(5)
      setReviewComment('')
    } catch {
      setReviewError('Failed to submit review. Please try again.')
    } finally {
      setIsSubmittingReview(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
            <p className="text-gray-600 mt-1">
              Order #{order.id?.slice(-8).toUpperCase()} · {formatDate(order.createdAt)}
            </p>
          </div>
          <OrderStatus status={order.orderStatus} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">Shipping Information</h3>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Buyer</p>
                <p className="font-semibold text-gray-900">{order.buyerName}</p>
                <p className="text-sm text-gray-600">{order.buyerPhone}</p>
                <p className="text-sm text-gray-600">{order.buyerLocation}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Farmer</p>
                <p className="font-semibold text-gray-900">{order.farmerName}</p>
                <p className="text-sm text-gray-600">{order.farmName}</p>
                <p className="text-sm text-gray-600">{order.farmerLocation}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
          </div>
          <div className="card-body">
            {order.items && order.items.length > 0 ? (
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.type} · Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-gray-900">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No items in this order.</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <OrderSummary
            subtotal={order.subtotal}
            platformFee={order.platformFee}
            total={order.total}
            paymentMethod={order.paymentMethod}
            paymentStatus={order.paymentStatus}
          />
          <OrderTimeline order={order} />
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleDownloadInvoice} variant="secondary">
            Download Invoice
          </Button>
          {canReview && (
            <Button onClick={() => setShowReviewForm(true)} variant="primary">
              Leave a Review
            </Button>
          )}
          {hasReviewed && (
            <Badge variant="green">Reviewed</Badge>
          )}
        </div>

        {showReviewForm && (
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Leave a Review</h3>
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
                  <Button type="submit" loading={isSubmittingReview}>Submit Review</Button>
                  <Button type="button" variant="secondary" onClick={() => setShowReviewForm(false)}>Cancel</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BuyerOrderDetails
