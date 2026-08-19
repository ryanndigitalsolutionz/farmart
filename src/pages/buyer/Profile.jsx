import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { formatDate } from '../../utils/formatDate'

const BuyerProfile = () => {
  const { currentUser, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    location: currentUser?.location || '',
  })
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSave = (e) => {
    e.preventDefault()
    updateProfile(formData)
    setIsEditing(false)
    setMessage('Profile updated successfully')
    setTimeout(() => setMessage(''), 3000)
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setError('')
    setMessage('Password changed successfully')
    setShowPasswordForm(false)
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">My Profile</h1>
        {!isEditing && (
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
        )}
      </div>

      {message && (
        <div className="p-4 mb-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          {message}
        </div>
      )}

      <div className="card mb-6">
        <div className="card-body">
          <div className="flex items-center gap-6 mb-6">
            <img
              src={currentUser?.avatar}
              alt=""
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{currentUser?.name}</h3>
              <p className="text-sm text-gray-600">{currentUser?.email}</p>
              <span className="badge badge-green mt-2 inline-block">Verified Buyer</span>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input className="form-input" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input className="form-input" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input className="form-input" name="location" value={formData.location} onChange={handleChange} />
                </div>
              </div>
              <div className="flex gap-3 justify-end mt-4">
                <button type="button" className="btn btn-secondary" onClick={() => { setIsEditing(false); setFormData({ name: currentUser?.name || '', email: currentUser?.email || '', phone: currentUser?.phone || '', location: currentUser?.location || '' }) }}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-sm font-medium text-gray-900">{currentUser?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="text-sm font-medium text-gray-900">{currentUser?.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="text-sm font-medium text-gray-900">{currentUser?.location || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(currentUser?.memberSince)}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="font-semibold text-gray-900">Change Password</h3>
        </div>
        <div className="card-body">
          {!showPasswordForm ? (
            <button className="btn btn-secondary" onClick={() => setShowPasswordForm(true)}>Change Password</button>
          ) : (
            <form onSubmit={handlePasswordChange}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input className="form-input" type="password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input className="form-input" type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input className="form-input" type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} required />
                </div>
              </div>
              {error && <p className="form-error">{error}</p>}
              <div className="flex gap-3 justify-end mt-4">
                <button type="button" className="btn btn-secondary" onClick={() => setShowPasswordForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Update Password</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default BuyerProfile
