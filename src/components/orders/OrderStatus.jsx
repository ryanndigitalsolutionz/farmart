import { ORDER_STATUS } from '../../constants/userRoles'
import Badge from '../common/Badge'

const statusConfig = {
  [ORDER_STATUS.PENDING]: { label: 'Pending', variant: 'yellow' },
  [ORDER_STATUS.PROCESSING]: { label: 'Processing', variant: 'blue' },
  [ORDER_STATUS.COMPLETED]: { label: 'Completed', variant: 'green' },
  [ORDER_STATUS.CANCELLED]: { label: 'Cancelled', variant: 'red' },
}

const OrderStatus = ({ status }) => {
  const config = statusConfig[status] || { label: status, variant: 'default' }
  return <Badge variant={config.variant}>{config.label}</Badge>
}

export default OrderStatus
