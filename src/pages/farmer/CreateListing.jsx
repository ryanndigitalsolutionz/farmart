import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { useLivestock } from '../../context/LivestockContext'
import { useAuth } from '../../context/AuthContext'
import { useNotifications } from '../../context/NotificationContext'
import { NOTIFICATION_TYPES } from '../../constants/userRoles'
import ListingForm from '../../components/listings/ListingForm'
import Button from '../../components/common/Button'

const CreateListing = () => {
  const { currentUser } = useAuth()
  const { createListing } = useLivestock()
  const { addNotification } = useNotifications()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = useCallback(
    async (data) => {
      setLoading(true)
      try {
        const listing = createListing({
          ...data,
          farmerId: currentUser.id,
          farmerName: currentUser.name,
          farmName: currentUser.farmName,
        })

        addNotification({
          type: NOTIFICATION_TYPES.LISTING_APPROVED,
          title: 'Listing Created',
          message: `Your listing "${listing.name}" has been submitted for approval.`,
        })

        setSuccess(true)
        setTimeout(() => navigate('/farmer/listings'), 1500)
      } catch (error) {
        console.error('Failed to create listing:', error)
      } finally {
        setLoading(false)
      }
    },
    [createListing, currentUser, addNotification, navigate]
  )

  if (success) {
    return (
      <div className="max-w-4xl mx-auto w-full">
        <div className="card">
          <div className="card-body text-center py-12">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Listing Created!</h2>
            <p className="text-gray-600">Your listing has been submitted for approval.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="secondary" onClick={() => navigate('/farmer/listings')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Listing</h1>
          <p className="text-gray-600">Add a new livestock listing to the marketplace</p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <ListingForm onSubmit={handleSubmit} submitLabel="Create Listing" loading={loading} />
        </div>
      </div>
    </div>
  )
}

export default CreateListing
