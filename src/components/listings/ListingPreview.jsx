import { formatCurrency } from '../../utils/formatCurrency'
import { formatDateOnly } from '../../utils/formatDate'
import { LIVESTOCK_TYPE_LABELS, HEALTH_STATUS_LABELS, VACCINATION_STATUS_LABELS } from '../../constants/userRoles'
import Button from '../../components/common/Button'

const ListingPreview = ({ listing, onEdit, onPublish }) => {
  if (!listing) return null

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-xl font-semibold">Listing Preview</h3>
      </div>
      <div className="card-body">
        {listing.images && listing.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {listing.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${listing.name} ${idx + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>
        )}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{listing.name}</h2>
        <p className="text-gray-600 mb-4">{listing.description}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Type</p>
            <p className="font-semibold">{LIVESTOCK_TYPE_LABELS[listing.type] || listing.type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Breed</p>
            <p className="font-semibold">{listing.breed}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Age</p>
            <p className="font-semibold">{listing.age} years</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Weight</p>
            <p className="font-semibold">{listing.weight} kg</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Price</p>
            <p className="font-semibold text-green-600">{formatCurrency(listing.price)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Location</p>
            <p className="font-semibold">{listing.location}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Health</p>
            <p className="font-semibold">{HEALTH_STATUS_LABELS[listing.healthStatus] || listing.healthStatus}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Vaccination</p>
            <p className="font-semibold">{VACCINATION_STATUS_LABELS[listing.vaccinationStatus] || listing.vaccinationStatus}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-600">Created: {formatDateOnly(listing.createdAt)}</p>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={onEdit}>
              Edit
            </Button>
            <Button onClick={onPublish}>Publish</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingPreview
