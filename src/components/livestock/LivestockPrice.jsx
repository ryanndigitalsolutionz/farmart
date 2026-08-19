import { formatCurrency } from '../../utils/formatCurrency'

const LivestockPrice = ({ price, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
  }

  return (
    <div className={`livestock-price ${sizeClasses[size] || sizeClasses.md} ${className}`}>
      <span className="livestock-price-amount font-bold text-green-600">{formatCurrency(price)}</span>
    </div>
  )
}

export default LivestockPrice
