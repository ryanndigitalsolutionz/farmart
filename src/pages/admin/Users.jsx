import { useState, useMemo } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useAdmin } from '../../context/AdminContext'
import { formatDate } from '../../utils/formatDate'
import { ROLES } from '../../constants/userRoles'

const AdminUsers = () => {
  const { usersList, currentUser } = useAuth()
  const { suspendUser, activateUser, deleteUserAccount } = useAdmin()
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [selectedUser, setSelectedUser] = useState(null)
  const [actionLoading, setActionLoading] = useState(false)

  const filteredUsers = useMemo(() => {
    return usersList.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())
      const matchesRole = roleFilter === 'all' || user.role === roleFilter
      return matchesSearch && matchesRole
    })
  }, [usersList, search, roleFilter])

  const handleSuspend = async (userId) => {
    setActionLoading(true)
    await new Promise((r) => setTimeout(r, 300))
    suspendUser(userId)
    setActionLoading(false)
    setSelectedUser(null)
  }

  const handleActivate = async (userId) => {
    setActionLoading(true)
    await new Promise((r) => setTimeout(r, 300))
    activateUser(userId)
    setActionLoading(false)
    setSelectedUser(null)
  }

  const handleDelete = async (userId) => {
    setActionLoading(true)
    await new Promise((r) => setTimeout(r, 300))
    deleteUserAccount(userId)
    setActionLoading(false)
    setSelectedUser(null)
  }

  const getRoleBadge = (role) => {
    switch (role) {
      case ROLES.ADMIN: return 'badge-purple'
      case ROLES.FARMER: return 'badge-green'
      case ROLES.BUYER: return 'badge-blue'
      default: return 'badge-gray'
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Users Management</h1>
      </div>

      <div className="card mb-6">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name or email..."
                className="form-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              <select
                className="form-select"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value={ROLES.BUYER}>Buyer</option>
                <option value={ROLES.FARMER}>Farmer</option>
                <option value={ROLES.ADMIN}>Admin</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body" style={{ padding: 0 }}>
          <div className="overflow-x-auto">
            <table className="table table-auto w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">User</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Email</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Role</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Joined</th>
                  <th className="text-right p-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center p-8 text-gray-500">No users found</td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={user.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.phone || ''}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-900">{user.email}</td>
                      <td className="p-4">
                        <span className={`badge ${getRoleBadge(user.role)}`}>{user.role}</span>
                      </td>
                      <td className="p-4">
                        <span className={`badge ${user.status === 'suspended' ? 'badge-red' : 'badge-green'}`}>
                          {user.status || 'active'}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{formatDate(user.memberSince)}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => setSelectedUser({ ...user, action: 'view' })}
                          >
                            View
                          </button>
                          {user.id !== currentUser?.id && user.role !== ROLES.ADMIN && (
                            <>
                              {user.status === 'suspended' ? (
                                <button
                                  className="btn btn-sm btn-primary"
                                  onClick={() => handleActivate(user.id)}
                                  disabled={actionLoading}
                                >
                                  Activate
                                </button>
                              ) : (
                                <button
                                  className="btn btn-sm btn-warning"
                                  onClick={() => handleSuspend(user.id)}
                                  disabled={actionLoading}
                                >
                                  Suspend
                                </button>
                              )}
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => setSelectedUser({ ...user, action: 'delete' })}
                                disabled={actionLoading}
                              >
                                Delete
                              </button>
                            </>
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

      {selectedUser && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', margin: '1rem' }}>
            <div className="card-header">
              <h3 className="font-semibold text-gray-900">
                {selectedUser.action === 'delete' ? 'Delete User' : 'User Details'}
              </h3>
              <button className="btn btn-sm btn-secondary" onClick={() => setSelectedUser(null)}>Close</button>
            </div>
            <div className="card-body">
              {selectedUser.action === 'delete' ? (
                <div>
                  <p className="text-gray-900 mb-4">Are you sure you want to delete user <strong>{selectedUser.name}</strong>? This action cannot be undone.</p>
                  <div className="flex gap-3 justify-end">
                    <button className="btn btn-secondary" onClick={() => setSelectedUser(null)}>Cancel</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(selectedUser.id)} disabled={actionLoading}>
                      {actionLoading ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <img src={selectedUser.avatar} alt="" className="w-16 h-16 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-gray-900">{selectedUser.name}</p>
                      <p className="text-sm text-gray-600">{selectedUser.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="text-sm font-medium text-gray-900">{selectedUser.phone || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="text-sm font-medium text-gray-900">{selectedUser.location || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Role</p>
                      <span className={`badge ${getRoleBadge(selectedUser.role)}`}>{selectedUser.role}</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <span className={`badge ${selectedUser.status === 'suspended' ? 'badge-red' : 'badge-green'}`}>
                        {selectedUser.status || 'active'}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-600">Member Since</p>
                      <p className="text-sm font-medium text-gray-900">{formatDate(selectedUser.memberSince)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminUsers
