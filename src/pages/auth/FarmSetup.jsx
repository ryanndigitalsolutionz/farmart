import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { validators, validate } from '../../utils/validation'
import { ROLES, KENYAN_LOCATIONS } from '../../constants/userRoles'
import { CheckCircle } from 'lucide-react'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import Textarea from '../../components/common/Textarea'
import ErrorMessage from '../../components/common/ErrorMessage'

const FarmSetup = () => {
  const navigate = useNavigate()
  const { currentUser, updateProfile, isAuthenticated } = useAuth()

  const [formData, setFormData] = useState({
    farmName: '',
    location: '',
    farmDescription: '',
  })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!isAuthenticated || currentUser?.role !== ROLES.FARMER) {
      navigate('/register', { replace: true })
    }
  }, [isAuthenticated, currentUser, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
    setApiError('')
  }

  const handleBlur = (name) => {
    if (name === 'farmName') {
      setErrors((prev) => ({ ...prev, farmName: validators.required(formData.farmName) }))
    }
    if (name === 'location') {
      setErrors((prev) => ({ ...prev, location: validators.required(formData.location) }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')

    const validationRules = {
      farmName: [validators.required],
      location: [validators.required],
    }

    const validationErrors = validate(formData, validationRules)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    setLoading(true)
    try {
      await updateProfile({
        farmName: formData.farmName,
        location: formData.location,
        farmDescription: formData.farmDescription,
      })
      setSuccess(true)
    } catch (err) {
      setApiError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="card max-w-md w-full">
          <div className="card-body p-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Farm Setup Complete
            </h3>
            <p className="text-gray-600 mb-4">
              Your farm profile has been set up successfully.
            </p>
            <Button onClick={() => navigate('/farmer')} className="w-full">
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const locationOptions = KENYAN_LOCATIONS.map((loc) => ({
    value: loc,
    label: loc,
  }))

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="card max-w-lg w-full">
        <div className="card-header text-center p-6">
          <h2 className="text-2xl font-bold text-gray-900">Farm Setup</h2>
          <p className="text-gray-600 mt-1">Tell us about your farm</p>
        </div>
        <div className="card-body p-6">
          {apiError && <ErrorMessage message={apiError} />}
          <form onSubmit={handleSubmit}>
            <Input
              label="Farm Name"
              name="farmName"
              value={formData.farmName}
              onChange={handleChange}
              onBlur={() => handleBlur('farmName')}
              error={errors.farmName}
              placeholder="My Awesome Farm"
              required
            />
            <Select
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              onBlur={() => handleBlur('location')}
              options={locationOptions}
              error={errors.location}
              placeholder="Select a location"
              required
            />
            <Textarea
              label="Farm Description"
              name="farmDescription"
              value={formData.farmDescription}
              onChange={handleChange}
              error={errors.farmDescription}
              placeholder="Describe your farm, livestock types, and practices..."
              rows={4}
            />
            <Button type="submit" loading={loading} className="w-full mt-2">
              {loading ? 'Saving...' : 'Complete Setup'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FarmSetup
