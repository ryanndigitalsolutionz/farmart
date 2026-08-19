import { Star, CheckCircle } from 'lucide-react'
import { formatCurrency } from '../../utils/formatCurrency'

const FarmerCard = ({ farmer }) => {
  if (!farmer) return null

  return (
    <div className="card">
      <div className="card-body">
        <div className="flex items-center gap-4">
          <img
            src={farmer.avatar}
            alt={farmer.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{farmer.name}</h3>
            <p className="text-sm text-gray-600">{farmer.farmName}</p>
            <p className="text-sm text-gray-600">{farmer.location}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600">Rating</p>
            <div className="flex items-center justify-center gap-1">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-yellow-600">{(farmer.rating?.toFixed(1) || 'N/A')}</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">Sales</p>
            <p className="font-semibold">{farmer.totalSales || 0}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Earnings</p>
            <p className="font-semibold text-green-600">{formatCurrency(farmer.totalEarnings || 0)}</p>
          </div>
        </div>
        {farmer.verified && (
          <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
            <CheckCircle size={16} />
            <span>Verified Farmer</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default FarmerCard
