import { useState, useMemo } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { useLivestock } from '../../context/LivestockContext'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'
import { LISTING_STATUS } from '../../constants/userRoles'

const AdminListings = () => {
  const { approveListing, rejectListing, suspendListing } = useAdmin()
  const { listings, updateListing } = useLivestock()
  const [statusFilter, setStatusFilter] = useState('pending')
  const [selectedListing, setSelectedListing] = useState(null)

  const filteredListings = useMemo(() => {
    return listings.filter((l) => statusFilter === 'all' || l.status === statusFilter)
  }, [listings, statusFilter])

  const handleApprove = (listingId) => {
    updateListing(listingId, { status: LISTING_STATUS.APPROVED })
    if (approveListing) approveListing(listingId)
  }

  const handleReject = (listingId) => {
    updateListing(listingId, { status: LISTING_STATUS.REJECTED })
    if (rejectListing) rejectListing(listingId)
  }

  const handleSuspend = (listingId) => {
    updateListing(listingId, { status: LISTING_STATUS.SUSPENDED })
    if (suspendListing) suspendListing(listingId)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved': return 'badge-green'
      case 'pending': return 'badge-yellow'
      case 'rejected': return 'badge-red'
      case 'suspended': return 'badge-orange'
      case 'sold': return 'badge-blue'
      default: return 'badge-purple'
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Listings Management</h1>
        <div className="flex gap-2">
          <select
            className="form-select"
            style={{ width: 'auto' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      <div className="card">
        <div className="card-body" style={{ padding: 0 }}>
          <div className="overflow-x-auto">
            <table className="table table-auto w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Listing</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Farmer</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Type</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Price</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Date</th>
                  <th className="text-right p-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredListings.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center p-8 text-gray-500">No listings found</td>
                  </tr>
                ) : (
                  filteredListings.map((listing) => (
                    <tr key={listing.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={listing.images?.[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{listing.name}</p>
                            <p className="text-xs text-gray-500">{listing.breed}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-900">{listing.farmerName}</td>
                      <td className="p-4 text-sm text-gray-900">{listing.type}</td>
                      <td className="p-4 text-sm font-semibold text-gray-900">{formatCurrency(listing.price)}</td>
                      <td className="p-4">
                        <span className={`badge ${getStatusBadge(listing.status)}`}>{listing.status}</span>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{formatDate(listing.createdAt)}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="btn btn-sm btn-secondary" onClick={() => setSelectedListing(listing)}>View</button>
                          {listing.status === 'pending' && (
                            <>
                              <button className="btn btn-sm btn-primary" onClick={() => handleApprove(listing.id)}>Approve</button>
                              <button className="btn btn-sm btn-danger" onClick={() => handleReject(listing.id)}>Reject</button>
                            </>
                          )}
                          {listing.status === 'approved' && (
                            <button className="btn btn-sm btn-warning" onClick={() => handleSuspend(listing.id)}>Suspend</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedListing && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div className="card" style={{ width: '100%', maxWidth: '600px', margin: '1rem' }}>
            <div className="card-header">
              <h3 className="font-semibold text-gray-900">Listing Details</h3>
              <button className="btn btn-sm btn-secondary" onClick={() => setSelectedListing(null)}>Close</button>
            </div>
            <div className="card-body">
              <div className="flex gap-4 mb-4">
                <img src={selectedListing.images?.[0]} alt="" className="w-32 h-32 rounded-lg object-cover" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">{selectedListing.name}</p>
                  <p className="text-sm text-gray-600">{selectedListing.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Farmer</p>
                  <p className="text-sm font-medium text-gray-900">{selectedListing.farmerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="text-sm font-medium text-gray-900">{selectedListing.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Breed</p>
                  <p className="text-sm font-medium text-gray-900">{selectedListing.breed}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="text-sm font-medium text-gray-900">{formatCurrency(selectedListing.price)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Age</p>
                  <p className="text-sm font-medium text-gray-900">{selectedListing.age} years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Weight</p>
                  <p className="text-sm font-medium text-gray-900">{selectedListing.weight} kg</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="text-sm font-medium text-gray-900">{selectedListing.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`badge ${getStatusBadge(selectedListing.status)}`}>{selectedListing.status}</span>
                </div>
              </div>
              <div className="flex gap-3 justify-end mt-6">
                {selectedListing.status === 'pending' && (
                  <>
                    <button className="btn btn-primary" onClick={() => { handleApprove(selectedListing.id); setSelectedListing(null); }}>Approve</button>
                    <button className="btn btn-danger" onClick={() => { handleReject(selectedListing.id); setSelectedListing(null); }}>Reject</button>
                  </>
                )}
                {selectedListing.status === 'approved' && (
                  <button className="btn btn-warning" onClick={() => { handleSuspend(selectedListing.id); setSelectedListing(null); }}>Suspend</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminListings
