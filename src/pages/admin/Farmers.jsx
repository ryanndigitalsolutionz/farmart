import { useState, useMemo } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useAdmin } from '../../context/AdminContext'
import { formatDate } from '../../utils/formatDate'
import { ROLES } from '../../constants/userRoles'

const AdminFarmers = () => {
  const { getUsersByRole } = useAuth()
  const { suspendUser, activateUser } = useAdmin()
  const [search, setSearch] = useState('')
  const [selectedFarmer, setSelectedFarmer] = useState(null)

  const farmers = useMemo(() => getUsersByRole(ROLES.FARMER), [getUsersByRole])

  const filteredFarmers = useMemo(() => {
    return farmers.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()) || f.email.toLowerCase().includes(search.toLowerCase()) || (f.farmName && f.farmName.toLowerCase().includes(search.toLowerCase())))
  }, [farmers, search])

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Farmers Management</h1>
      </div>

      <div className="card mb-6">
        <div className="card-body">
          <input
            type="text"
            placeholder="Search farmers by name, email, or farm..."
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
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Farmer</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Farm Name</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Location</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Rating</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Joined</th>
                  <th className="text-right p-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFarmers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center p-8 text-gray-500">No farmers found</td>
                  </tr>
                ) : (
                  filteredFarmers.map((farmer) => (
                    <tr key={farmer.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={farmer.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{farmer.name}</p>
                            <p className="text-xs text-gray-500">{farmer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-900">{farmer.farmName || 'N/A'}</td>
                      <td className="p-4 text-sm text-gray-900">{farmer.location || 'N/A'}</td>
                      <td className="p-4 text-sm text-gray-900">{farmer.rating || 'N/A'}</td>
                      <td className="p-4">
                        <span className={`badge ${farmer.status === 'suspended' ? 'badge-red' : 'badge-green'}`}>
                          {farmer.status || 'active'}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{formatDate(farmer.memberSince)}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="btn btn-sm btn-secondary" onClick={() => setSelectedFarmer(farmer)}>View</button>
                          {farmer.status === 'suspended' ? (
                            <button className="btn btn-sm btn-primary" onClick={() => activateUser(farmer.id)}>Activate</button>
                          ) : (
                            <button className="btn btn-sm btn-warning" onClick={() => suspendUser(farmer.id)}>Suspend</button>
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

      {selectedFarmer && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div className="card" style={{ width: '100%', maxWidth: '600px', margin: '1rem' }}>
            <div className="card-header">
              <h3 className="font-semibold text-gray-900">Farmer Details</h3>
              <button className="btn btn-sm btn-secondary" onClick={() => setSelectedFarmer(null)}>Close</button>
            </div>
            <div className="card-body">
              <div className="flex items-center gap-4 mb-4">
                <img src={selectedFarmer.avatar} alt="" className="w-20 h-20 rounded-full object-cover" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">{selectedFarmer.name}</p>
                  <p className="text-sm text-gray-600">{selectedFarmer.email}</p>
                  <span className={`badge ${selectedFarmer.status === 'suspended' ? 'badge-red' : 'badge-green'}`}>
                    {selectedFarmer.status || 'active'}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Farm Name</p>
                  <p className="text-sm font-medium text-gray-900">{selectedFarmer.farmName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="text-sm font-medium text-gray-900">{selectedFarmer.location || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="text-sm font-medium text-gray-900">{selectedFarmer.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <p className="text-sm font-medium text-gray-900">{selectedFarmer.rating || 'N/A'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="text-sm font-medium text-gray-900">{selectedFarmer.farmDescription || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Sales</p>
                  <p className="text-sm font-medium text-gray-900">{selectedFarmer.totalSales || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Earnings</p>
                  <p className="text-sm font-medium text-gray-900">{selectedFarmer.totalEarnings || 0}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="text-sm font-medium text-gray-900">{formatDate(selectedFarmer.memberSince)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminFarmers
