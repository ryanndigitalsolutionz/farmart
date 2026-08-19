import { formatCurrency } from '../../utils/formatCurrency'
import { formatDateOnly } from '../../utils/formatDate'

const FarmerProfile = ({ farmer }) => {
  if (!farmer) return null

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-xl font-semibold">Farm Profile</h3>
      </div>
      <div className="card-body">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={farmer.avatar}
            alt={farmer.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{farmer.name}</h2>
            <p className="text-lg text-gray-700">{farmer.farmName}</p>
            <p className="text-gray-600">{farmer.location}</p>
          </div>
        </div>
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-1">About</h4>
          <p className="text-gray-600">{farmer.farmDescription}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium">{farmer.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-medium">{farmer.phone}</p>
          </div>
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
      </div>
    </div>
  )
}

export default FarmerProfile
