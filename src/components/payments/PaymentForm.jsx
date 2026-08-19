import Input from '../common/Input'
import Select from '../common/Select'
import ErrorMessage from '../common/ErrorMessage'
import { PAYMENT_METHODS, PAYMENT_METHOD_LABELS } from '../../constants/userRoles'

const PaymentForm = ({ selectedMethod, onMethodChange, formData, onFieldChange, errors }) => {
  const paymentMethodOptions = Object.entries(PAYMENT_METHODS).map(([, value]) => ({
    value,
    label: PAYMENT_METHOD_LABELS[value],
  }))

  const renderMethodFields = () => {
    switch (selectedMethod) {
      case PAYMENT_METHODS.MPESA:
        return (
          <div className="mt-4">
            <Input
              label="M-Pesa Phone Number"
              name="mpesaPhone"
              type="tel"
              placeholder="254712345678"
              value={formData.mpesaPhone}
              onChange={(e) => onFieldChange('mpesaPhone', e.target.value)}
              error={errors.mpesaPhone}
              required
            />
            <p className="text-sm text-gray-500 mt-1">You will receive an STK push prompt on your phone.</p>
          </div>
        )
      case PAYMENT_METHODS.CARD:
        return (
          <div className="mt-4 space-y-3">
            <Input
              label="Card Number"
              name="cardNumber"
              type="text"
              placeholder="4111 1111 1111 1111"
              value={formData.cardNumber}
              onChange={(e) => onFieldChange('cardNumber', e.target.value)}
              error={errors.cardNumber}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry Date"
                name="cardExpiry"
                type="text"
                placeholder="MM/YY"
                value={formData.cardExpiry}
                onChange={(e) => onFieldChange('cardExpiry', e.target.value)}
                error={errors.cardExpiry}
                required
              />
              <Input
                label="CVV"
                name="cardCvv"
                type="text"
                placeholder="123"
                value={formData.cardCvv}
                onChange={(e) => onFieldChange('cardCvv', e.target.value)}
                error={errors.cardCvv}
                required
              />
            </div>
          </div>
        )
      case PAYMENT_METHODS.BANK_TRANSFER:
        return (
          <div className="mt-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Bank Transfer Details</h4>
              <p className="text-sm text-gray-600">Bank: Equity Bank Kenya</p>
              <p className="text-sm text-gray-600">Account Name: Farmart Platform Ltd</p>
              <p className="text-sm text-gray-600">Account Number: 0123456789</p>
              <p className="text-sm text-gray-600">Branch: Westlands</p>
            </div>
            <Input
              label="Transfer Reference"
              name="bankReference"
              type="text"
              placeholder="Enter transfer reference"
              value={formData.bankReference}
              onChange={(e) => onFieldChange('bankReference', e.target.value)}
              error={errors.bankReference}
              required
            />
          </div>
        )
      case PAYMENT_METHODS.CASH_ON_DELIVERY:
        return (
          <div className="mt-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                Pay with cash when your order is delivered. Please ensure you have the exact amount ready.
              </p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div>
      <Select
        label="Payment Method"
        name="paymentMethod"
        value={selectedMethod}
        onChange={(e) => onMethodChange(e.target.value)}
        options={paymentMethodOptions}
        required
        error={errors.paymentMethod}
      />
      {renderMethodFields()}
      {errors.general && <ErrorMessage message={errors.general} />}
    </div>
  )
}

export default PaymentForm
