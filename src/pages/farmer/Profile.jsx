import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Phone, MapPin, Calendar, Award } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useLivestock } from '../../context/LivestockContext'
import { formatDateOnly } from '../../utils/formatDate'
import { formatCurrency } from '../../utils/formatCurrency'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import Textarea from '../../components/common/Textarea'
import Button from '../../components/common/Button'
import { KENYAN_LOCATIONS } from '../../constants/userRoles'

const Profile = () => {
  const { currentUser, updateProfile } = useAuth()
  const { getListingsByFarmer } = useLivestock()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    farmName: '',
    farmDescription: '',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const prevUserIdRef = useRef(null)

  const farmerListings = currentUser ? getListingsByFarmer(currentUser.id) : []

  useEffect(() => {
    if (currentUser && currentUser.id !== prevUserIdRef.current) {
      prevUserIdRef.current = currentUser.id
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        location: currentUser.location || '',
        farmName: currentUser.farmName || '',
        farmDescription: currentUser.farmDescription || '',
      })
    }
  }, [currentUser])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleSave = useCallback(async () => {
    setSaving(true)
    try {
      await updateProfile(formData)
      setIsEditing(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Failed to update profile:', error)
    } finally {
      setSaving(false)
    }
  }, [formData, updateProfile])

  if (!currentUser) return null

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Farm Profile</h1>
          <p className="text-gray-600">View and manage your farm information</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </div>

      {saved && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          Profile updated successfully!
        </div>
      )}

      <div className="card">
        <div className="card-body">
          <div className="flex items-center gap-6 mb-6">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{currentUser.name}</h2>
              <p className="text-lg text-gray-700">{currentUser.farmName}</p>
              <p className="text-gray-600">{currentUser.location}</p>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <Select
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                options={KENYAN_LOCATIONS.map((loc) => ({ value: loc, label: loc }))}
              />
              <Input
                label="Farm Name"
                name="farmName"
                value={formData.farmName}
                onChange={handleChange}
              />
              <Textarea
                label="Farm Description"
                name="farmDescription"
                value={formData.farmDescription}
                onChange={handleChange}
                rows={4}
              />
              <div className="flex gap-3">
                <Button onClick={handleSave} loading={saving}>
                  Save Changes
                </Button>
                <Button variant="secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{currentUser.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{currentUser.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium">{currentUser.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Member Since</p>
                    <p className="font-medium">{formatDateOnly(currentUser.memberSince)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Rating</p>
                    <p className="font-medium text-yellow-600">⭐ {currentUser.rating?.toFixed(1) || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {currentUser.farmDescription && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">About the Farm</h3>
                  <p className="text-gray-600">{currentUser.farmDescription}</p>
                </div>
              )}

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Stats</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold">{farmerListings.length}</p>
                    <p className="text-sm text-gray-600">Listings</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold">{currentUser.totalSales || 0}</p>
                    <p className="text-sm text-gray-600">Animals Sold</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(currentUser.totalEarnings || 0)}
                    </p>
                    <p className="text-sm text-gray-600">Total Earnings</p>
                  </div>
                </div>
              </div>

              <div>
                <Button variant="secondary" onClick={() => navigate('/farmer/listings')}>
                  View All Animals
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
