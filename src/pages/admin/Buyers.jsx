import { useState, useMemo } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useAdmin } from '../../context/AdminContext'
import { formatDate } from '../../utils/formatDate'
import { ROLES } from '../../constants/userRoles'

const AdminBuyers = () => {
  const { getUsersByRole } = useAuth()
  const { suspendUser, activateUser } = useAdmin()
  const [search, setSearch] = useState('')
  const [selectedBuyer, setSelectedBuyer] = useState(null)

  const buyers = useMemo(() => getUsersByRole(ROLES.BUYER), [getUsersByRole])

  const filteredBuyers = useMemo(() => {
    return buyers.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()) || b.email.toLowerCase().includes(search.toLowerCase()))
  }, [buyers, search])

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Buyers Management</h1>
      </div>

      <div className="card mb-6">
        <div className="card-body">
          <input
            type="text"
            placeholder="Search buyers by name or email..."
            className="form-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="card">
        <div className="card-body" style={{ padding: 0 }}>
          <div className="overflow-x-auto">
            <table className="table table-auto w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Buyer</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Email</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Location</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Joined</th>
                  <th className="text-right p-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBuyers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center p-8 text-gray-500">No buyers found</td>
                  </tr>
                ) : (
                  filteredBuyers.map((buyer) => (
                    <tr key={buyer.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={buyer.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{buyer.name}</p>
                            <p className="text-xs text-gray-500">{buyer.phone || ''}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-900">{buyer.email}</td>
                      <td className="p-4 text-sm text-gray-900">{buyer.location || 'N/A'}</td>
                      <td className="p-4">
                        <span className={`badge ${buyer.status === 'suspended' ? 'badge-red' : 'badge-green'}`}>
                          {buyer.status || 'active'}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{formatDate(buyer.memberSince)}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="btn btn-sm btn-secondary" onClick={() => setSelectedBuyer(buyer)}>View</button>
                          {buyer.status === 'suspended' ? (
                            <button className="btn btn-sm btn-primary" onClick={() => activateUser(buyer.id)}>Activate</button>
                          ) : (
                            <button className="btn btn-sm btn-warning" onClick={() => suspendUser(buyer.id)}>Suspend</button>
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

      {selectedBuyer && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', margin: '1rem' }}>
            <div className="card-header">
              <h3 className="font-semibold text-gray-900">Buyer Details</h3>
              <button className="btn btn-sm btn-secondary" onClick={() => setSelectedBuyer(null)}>Close</button>
            </div>
            <div className="card-body">
              <div className="flex items-center gap-4 mb-4">
                <img src={selectedBuyer.avatar} alt="" className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">{selectedBuyer.name}</p>
                  <p className="text-sm text-gray-600">{selectedBuyer.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="text-sm font-medium text-gray-900">{selectedBuyer.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="text-sm font-medium text-gray-900">{selectedBuyer.location || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`badge ${selectedBuyer.status === 'suspended' ? 'badge-red' : 'badge-green'}`}>
                    {selectedBuyer.status || 'active'}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="text-sm font-medium text-gray-900">{formatDate(selectedBuyer.memberSince)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminBuyers
