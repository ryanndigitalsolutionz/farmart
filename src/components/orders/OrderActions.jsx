import { ORDER_STATUS } from '../../constants/userRoles'

const actionConfig = {
  accept: { label: 'Accept', variant: 'primary', from: ORDER_STATUS.PENDING, to: ORDER_STATUS.PROCESSING },
  reject: { label: 'Reject', variant: 'danger', from: ORDER_STATUS.PENDING, to: ORDER_STATUS.CANCELLED },
  process: { label: 'Process', variant: 'secondary', from: ORDER_STATUS.PROCESSING, to: ORDER_STATUS.PROCESSING },
  complete: { label: 'Mark Complete', variant: 'primary', from: ORDER_STATUS.PROCESSING, to: ORDER_STATUS.COMPLETED },
}

const OrderActions = ({ order, onAction, disabled = false }) => {
  const actions = []

  if (!disabled) {
    if (order.orderStatus === ORDER_STATUS.PENDING) {
      actions.push('accept', 'reject')
    }
    if (order.orderStatus === ORDER_STATUS.PROCESSING) {
      actions.push('process', 'complete')
    }
  }

  if (actions.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((actionKey) => {
        const config = actionConfig[actionKey]
        return (
          <button
            key={actionKey}
            className={`btn btn-${config.variant} btn-sm`}
            onClick={() => onAction(actionKey, order)}
          >
            {config.label}
          </button>
        )
      })}
    </div>
  )
}

export default OrderActions
