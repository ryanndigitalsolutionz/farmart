import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import { useLivestock } from '../../context/LivestockContext'
import { useAuth } from '../../context/AuthContext'
import { LISTING_STATUS_OPTIONS, LISTING_STATUS } from '../../constants/userRoles'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import ConfirmDialog from '../../components/common/ConfirmDialog'

const Listings = () => {
  const { currentUser } = useAuth()
  const { listings, deleteListing } = useLivestock()
  const navigate = useNavigate()
  const [filterStatus, setFilterStatus] = useState('all')
  const [deleteId, setDeleteId] = useState(null)

  const farmerListings = useMemo(
    () => listings.filter((l) => l.farmerId === currentUser?.id),
    [listings, currentUser?.id]
  )

  const filteredListings = useMemo(() => {
    if (filterStatus === 'all') return farmerListings
    return farmerListings.filter((l) => l.status === filterStatus)
  }, [farmerListings, filterStatus])

  const handleDelete = useCallback(() => {
    if (deleteId) {
      deleteListing(deleteId)
      setDeleteId(null)
    }
  }, [deleteId, deleteListing])

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'yellow',
      approved: 'green',
      rejected: 'red',
      sold: 'blue',
      draft: 'gray',
      reserved: 'purple',
      suspended: 'red',
    }
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>
  }

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
          <p className="text-gray-600">Manage your livestock listings</p>
        </div>
        <Button onClick={() => navigate('/farmer/listings/create')}>
          <Plus className="w-4 h-4 mr-2" />
          Create Listing
        </Button>
      </div>

      <div className="card mb-6">
        <div className="card-body">
          <div className="flex items-center gap-4">
            <label className="form-label mb-0">Filter by Status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="form-select"
            >
              <option value="all">All Statuses</option>
              {LISTING_STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          {filteredListings.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No listings found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-auto w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-600">
                    <th className="pb-3">Image</th>
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Views</th>
                    <th className="pb-3">Created</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredListings.map((listing) => (
                    <tr key={listing.id} className="border-t border-gray-100">
                      <td className="py-3">
                        {listing.images?.[0] ? (
                          <img
                            src={listing.images[0]}
                            alt={listing.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                            No img
                          </div>
                        )}
                      </td>
                      <td className="py-3">
                        <p className="font-medium">{listing.name}</p>
                      </td>
                      <td className="py-3 capitalize">{listing.type}</td>
                      <td className="py-3 font-semibold text-green-600">
                        {new Intl.NumberFormat('en-KE', {
                          style: 'currency',
                          currency: 'KES',
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(listing.price)}
                      </td>
                      <td className="py-3">{getStatusBadge(listing.status)}</td>
                      <td className="py-3 text-sm text-gray-600">{listing.views || 0}</td>
                      <td className="py-3 text-sm text-gray-600">
                        {new Date(listing.createdAt).toLocaleDateString('en-KE')}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => navigate(`/farmer/listings/${listing.id}`)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => navigate(`/farmer/listings/${listing.id}/edit`)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          {listing.status !== LISTING_STATUS.SOLD && (
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => setDeleteId(listing.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Listing"
        message="Are you sure you want to delete this listing? This action cannot be undone."
      />
    </div>
  )
}

export default Listings
