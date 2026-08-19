import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, ShoppingCart } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { useOrders } from '../../context/OrderContext'
import { useNotifications } from '../../context/NotificationContext'
import { KENYAN_LOCATIONS, PAYMENT_METHODS } from '../../constants/userRoles'
import { routes } from '../../constants/routes'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import Textarea from '../../components/common/Textarea'
import CartList from '../../components/cart/CartList'
import PaymentForm from '../../components/payments/PaymentForm'
import PaymentSummary from '../../components/payments/PaymentSummary'
import ErrorMessage from '../../components/common/ErrorMessage'

const STEPS = ['Cart Review', 'Shipping', 'Payment', 'Confirmation']

const CheckoutPage = () => {
  const { cartItems, updateQuantity, removeFromCart, subtotal, platformFee, total, clearCart } = useCart()
  const { currentUser } = useAuth()
  const { createOrder } = useOrders()
  const { addNotification } = useNotifications()
  const navigate = useNavigate()

  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [completedOrderId, setCompletedOrderId] = useState(null)

  const [shippingForm, setShippingForm] = useState({
    fullName: currentUser?.name || '',
    phone: '',
    location: '',
    specialInstructions: '',
  })

  const [paymentForm, setPaymentForm] = useState({
    paymentMethod: '',
    mpesaPhone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    bankReference: '',
  })

  const [errors, setErrors] = useState({})

  const handleShippingChange = (field, value) => {
    setShippingForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const handlePaymentChange = (field, value) => {
    setPaymentForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const handleMethodChange = (method) => {
    setPaymentForm((prev) => ({
      ...prev,
      paymentMethod: method,
      mpesaPhone: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvv: '',
      bankReference: '',
    }))
    if (errors.paymentMethod) {
      setErrors((prev) => ({ ...prev, paymentMethod: '' }))
    }
  }

  const validateShipping = () => {
    const newErrors = {}
    if (!shippingForm.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!shippingForm.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!shippingForm.location) newErrors.location = 'Delivery location is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePayment = () => {
    const newErrors = {}
    if (!paymentForm.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method'
    } else {
      switch (paymentForm.paymentMethod) {
        case PAYMENT_METHODS.MPESA:
          if (!paymentForm.mpesaPhone.trim()) newErrors.mpesaPhone = 'Phone number is required'
          break
        case PAYMENT_METHODS.CARD:
          if (!paymentForm.cardNumber.trim()) newErrors.cardNumber = 'Card number is required'
          if (!paymentForm.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry date is required'
          if (!paymentForm.cardCvv.trim()) newErrors.cardCvv = 'CVV is required'
          break
        case PAYMENT_METHODS.BANK_TRANSFER:
          if (!paymentForm.bankReference.trim()) newErrors.bankReference = 'Transfer reference is required'
          break
        default:
          break
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (currentStep === 1 && !validateShipping()) return
    if (currentStep === 2 && !validatePayment()) return
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handlePlaceOrder = async () => {
    if (!currentUser) {
      navigate(routes.LOGIN)
      return
    }
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const order = createOrder({
        buyerId: currentUser.id,
        buyerName: shippingForm.fullName,
        items: cartItems.map((item) => ({
          livestockId: item.livestockId,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          farmerId: item.farmerId,
        })),
        subtotal,
        platformFee,
        total,
        shipping: {
          fullName: shippingForm.fullName,
          phone: shippingForm.phone,
          location: shippingForm.location,
          specialInstructions: shippingForm.specialInstructions,
        },
        payment: {
          method: paymentForm.paymentMethod,
          status: 'pending',
          details: paymentForm,
        },
        orderStatus: 'pending',
      })
      clearCart()
      addNotification({
        type: 'order_placed',
        title: 'Order Placed Successfully',
        message: `Your order ${order.id} has been placed and is being processed.`,
        orderId: order.id,
      })
      setCompletedOrderId(order.id)
      setCurrentStep(3)
    } catch {
      setErrors({ general: 'Failed to place order. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleViewOrder = () => {
    navigate(`/buyer/orders/${completedOrderId}`)
  }

  const handleContinueShopping = () => {
    navigate(routes.MARKETPLACE)
  }

  const locationOptions = KENYAN_LOCATIONS.map((loc) => ({ value: loc, label: loc }))

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Review Your Cart</h2>
            <CartList
              items={cartItems}
              onUpdateQuantity={(id, qty) => updateQuantity(id, qty)}
              onRemove={(id) => removeFromCart(id)}
            />
          </div>
        )
      case 1:
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Information</h2>
            <div className="card">
              <div className="card-body">
                <Input
                  label="Full Name"
                  name="fullName"
                  value={shippingForm.fullName}
                  onChange={(e) => handleShippingChange('fullName', e.target.value)}
                  error={errors.fullName}
                  required
                  placeholder="John Doe"
                />
                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={shippingForm.phone}
                  onChange={(e) => handleShippingChange('phone', e.target.value)}
                  error={errors.phone}
                  required
                  placeholder="254712345678"
                />
                <Select
                  label="Delivery Location"
                  name="location"
                  value={shippingForm.location}
                  onChange={(e) => handleShippingChange('location', e.target.value)}
                  options={locationOptions}
                  error={errors.location}
                  required
                  placeholder="Select your location"
                />
                <Textarea
                  label="Special Instructions (Optional)"
                  name="specialInstructions"
                  value={shippingForm.specialInstructions}
                  onChange={(e) => handleShippingChange('specialInstructions', e.target.value)}
                  placeholder="Any special delivery instructions..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="card">
                  <div className="card-body">
                    <PaymentForm
                      selectedMethod={paymentForm.paymentMethod}
                      onMethodChange={handleMethodChange}
                      formData={paymentForm}
                      onFieldChange={handlePaymentChange}
                      errors={errors}
                    />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <PaymentSummary
                  items={cartItems}
                  subtotal={subtotal}
                  platformFee={platformFee}
                  total={total}
                  paymentMethod={paymentForm.paymentMethod}
                />
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
            <p className="text-lg font-semibold text-green-600 mb-6">
              Order ID: {completedOrderId}
            </p>
            <p className="text-sm text-gray-500 mb-8">
              You will receive a confirmation shortly. Track your order in the Orders section.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="primary" onClick={handleViewOrder}>
                View Order Details
              </Button>
              <Button variant="secondary" onClick={handleContinueShopping}>
                Continue Shopping
              </Button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  if (!cartItems.length && currentStep < 3) {
    return (
      <div className="max-w-4xl mx-auto w-full">
        <div className="card">
          <div className="card-body text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add items to your cart before checking out.</p>
            <button className="btn btn-primary btn-md" onClick={handleContinueShopping}>
              Browse Marketplace
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto w-full">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>
      {currentStep < 3 && (
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.slice(0, 3).map((step, index) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      index <= currentStep
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium hidden sm:inline ${
                      index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {step}
                  </span>
                </div>
                {index < 2 && (
                  <div
                    className={`flex-1 h-1 mx-4 rounded ${
                      index < currentStep ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {errors.general && (
        <div className="mb-4">
          <ErrorMessage message={errors.general} />
        </div>
      )}
      <div className="mb-6">{renderStep()}</div>
      {currentStep < 3 && (
        <div className="flex justify-between mt-6">
          <Button
            variant="secondary"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          {currentStep === 2 ? (
            <Button
              variant="primary"
              onClick={handlePlaceOrder}
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Place Order
            </Button>
          ) : (
            <Button variant="primary" onClick={handleNext}>
              Next
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export default CheckoutPage
