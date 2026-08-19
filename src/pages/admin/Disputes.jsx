import { useState, useMemo } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { formatDate } from '../../utils/formatDate'
import { DISPUTE_STATUS } from '../../constants/userRoles'

const AdminDisputes = () => {
  const { disputes, createDispute, updateDispute } = useAdmin()
  const [showForm, setShowForm] = useState(false)
  const [selectedDispute, setSelectedDispute] = useState(null)
  const [formData, setFormData] = useState({ title: '', description: '', orderId: '', buyerId: '', farmerId: '' })
  const [resolutionNotes, setResolutionNotes] = useState('')

  const filteredDisputes = useMemo(() => {
    return [...disputes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }, [disputes])

  const handleCreate = (e) => {
    e.preventDefault()
    createDispute({
      ...formData,
      buyerName: 'Buyer',
      farmerName: 'Farmer',
      resolutionNotes: '',
    })
    setFormData({ title: '', description: '', orderId: '', buyerId: '', farmerId: '' })
    setShowForm(false)
  }

  const handleStatusUpdate = (disputeId, status) => {
    updateDispute(disputeId, { status })
    if (selectedDispute?.id === disputeId) {
      setSelectedDispute({ ...selectedDispute, status })
    }
  }

  const handleAddNotes = (disputeId) => {
    if (!resolutionNotes.trim()) return
    updateDispute(disputeId, { resolutionNotes })
    if (selectedDispute?.id === disputeId) {
      setSelectedDispute({ ...selectedDispute, resolutionNotes })
    }
    setResolutionNotes('')
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'open': return 'badge-red'
      case 'investigating': return 'badge-yellow'
      case 'resolved': return 'badge-green'
      case 'closed': return 'badge-purple'
      default: return 'badge-purple'
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Disputes Management</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>Create Dispute</button>
      </div>

      {showForm && (
        <div className="card mb-6">
          <div className="card-header">
            <h3 className="font-semibold text-gray-900">Create Dispute</h3>
            <button className="btn btn-sm btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
          <div className="card-body">
            <form onSubmit={handleCreate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input className="form-input" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Order ID</label>
                  <input className="form-input" value={formData.orderId} onChange={(e) => setFormData({ ...formData, orderId: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Buyer ID</label>
                  <input className="form-input" value={formData.buyerId} onChange={(e) => setFormData({ ...formData, buyerId: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Farmer ID</label>
                  <input className="form-input" value={formData.farmerId} onChange={(e) => setFormData({ ...formData, farmerId: e.target.value })} />
                </div>
                <div className="form-group md:col-span-2">
                  <label className="form-label">Description</label>
                  <textarea className="form-textarea" rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
                </div>
              </div>
              <div className="flex gap-3 justify-end mt-4">
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Dispute</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-body" style={{ padding: 0 }}>
          <div className="overflow-x-auto">
            <table className="table table-auto w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">ID</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Title</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Created</th>
                  <th className="text-right p-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDisputes.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center p-8 text-gray-500">No disputes found</td>
                  </tr>
                ) : (
                  filteredDisputes.map((dispute) => (
                    <tr key={dispute.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4 text-sm text-gray-900">{dispute.id.slice(0, 12)}...</td>
                      <td className="p-4 text-sm text-gray-900">{dispute.title}</td>
                      <td className="p-4">
                        <span className={`badge ${getStatusBadge(dispute.status)}`}>{dispute.status}</span>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{formatDate(dispute.createdAt)}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="btn btn-sm btn-secondary" onClick={() => { setSelectedDispute(dispute); setResolutionNotes(''); }}>Manage</button>
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

      {selectedDispute && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div className="card" style={{ width: '100%', maxWidth: '600px', margin: '1rem' }}>
            <div className="card-header">
              <h3 className="font-semibold text-gray-900">Dispute: {selectedDispute.title}</h3>
              <button className="btn btn-sm btn-secondary" onClick={() => setSelectedDispute(null)}>Close</button>
            </div>
            <div className="card-body">
              <p className="text-sm text-gray-600 mb-4">{selectedDispute.description}</p>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-900 mb-2">Status</p>
                <div className="flex gap-2 flex-wrap">
                  {Object.values(DISPUTE_STATUS).map((status) => (
                    <button
                      key={status}
                      className={`btn btn-sm ${selectedDispute.status === status ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => handleStatusUpdate(selectedDispute.id, status)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-900 mb-2">Resolution Notes</p>
                <p className="text-sm text-gray-600 mb-2">{selectedDispute.resolutionNotes || 'No notes yet.'}</p>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="Add resolution notes..."
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                />
                <button className="btn btn-primary mt-2" onClick={() => handleAddNotes(selectedDispute.id)}>Add Notes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDisputes
