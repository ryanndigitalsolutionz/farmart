import { formatCurrency } from '../../utils/formatCurrency'
import { formatDateOnly } from '../../utils/formatDate'

const FarmerInfo = ({ farmer }) => {
  if (!farmer) return null

  return (
    <div className="card">
      <div className="card-body">
        <div className="flex items-center gap-4">
          <img
            src={farmer.avatar}
            alt={farmer.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-900">{farmer.name}</h3>
            <p className="text-gray-700">{farmer.farmName}</p>
            <p className="text-sm text-gray-600">{farmer.location}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Member Since</p>
            <p className="font-medium">{formatDateOnly(farmer.memberSince)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Sales</p>
            <p className="font-medium">{farmer.totalSales || 0}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Earnings</p>
            <p className="font-medium text-green-600">{formatCurrency(farmer.totalEarnings || 0)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Rating</p>
            <p className="font-medium text-yellow-600">⭐ {farmer.rating?.toFixed(1) || 'N/A'}</p>
          </div>
        </div>
        {farmer.farmDescription && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">About</p>
            <p className="text-gray-700">{farmer.farmDescription}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FarmerInfo
