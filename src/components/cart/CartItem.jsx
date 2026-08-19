import { useState } from 'react'
import Button from '../common/Button'
import ConfirmDialog from '../common/ConfirmDialog'
import { formatCurrency } from '../../utils/formatCurrency'

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="flex items-center gap-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.breed || item.type}</p>
            <p className="text-green-600 font-semibold mt-1">{formatCurrency(item.price)}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              -
            </Button>
            <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
              disabled={item.quantity >= 99}
            >
              +
            </Button>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-gray-900">{formatCurrency(item.price * item.quantity)}</p>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowConfirm(true)}
              className="mt-2"
            >
              Remove
            </Button>
          </div>
        </div>
        <ConfirmDialog
          isOpen={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={() => {
            onRemove(item.cartItemId)
            setShowConfirm(false)
          }}
          title="Remove Item"
          message={`Are you sure you want to remove ${item.name} from your cart?`}
          confirmText="Remove"
        />
      </div>
    </div>
  )
}

export default CartItem
