import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { useLivestock } from '../../context/LivestockContext'
import { useNotifications } from '../../context/NotificationContext'
import { NOTIFICATION_TYPES } from '../../constants/userRoles'
import ListingForm from '../../components/listings/ListingForm'
import Button from '../../components/common/Button'

const EditListing = () => {
  const { id } = useParams()
  const { getListingById, updateListing } = useLivestock()
  const { addNotification } = useNotifications()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [listing, setListing] = useState(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (id && !initializedRef.current) {
      initializedRef.current = true
      const found = getListingById(id)
      setListing(found)
    }
  }, [id, getListingById])

  const handleSubmit = useCallback(
    async (data) => {
      setLoading(true)
      try {
        updateListing(id, {
          ...data,
          status: 'pending',
        })

        addNotification({
          type: NOTIFICATION_TYPES.LISTING_APPROVED,
          title: 'Listing Updated',
          message: `Your listing has been updated and submitted for approval.`,
        })

        setSuccess(true)
        setTimeout(() => navigate('/farmer/listings'), 1500)
      } catch (error) {
        console.error('Failed to update listing:', error)
      } finally {
        setLoading(false)
      }
    },
    [id, updateListing, addNotification, navigate]
  )

  if (success) {
    return (
      <div className="max-w-4xl mx-auto w-full">
        <div className="card">
          <div className="card-body text-center py-12">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Listing Updated!</h2>
            <p className="text-gray-600">Your listing has been updated and submitted for approval.</p>
          </div>
        </div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="max-w-4xl mx-auto w-full">
        <div className="card">
          <div className="card-body text-center py-12">
            <p className="text-gray-500">Listing not found</p>
            <Button onClick={() => navigate('/farmer/listings')} className="mt-4">
              Back to Listings
            </Button>
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
          <h1 className="text-2xl font-bold text-gray-900">Edit Listing</h1>
          <p className="text-gray-600">Update your livestock listing</p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <ListingForm
            initialData={listing}
            onSubmit={handleSubmit}
            submitLabel="Update Listing"
            loading={loading}
          />
        </div>
      </div>
    </div>
  )
}

export default EditListing
