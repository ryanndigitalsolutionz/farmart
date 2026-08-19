import { useState, useCallback } from 'react'
import Input from '../common/Input'
import Select from '../common/Select'
import Textarea from '../common/Textarea'
import Button from '../common/Button'
import { LIVESTOCK_TYPES, KENYAN_LOCATIONS, BREEDS } from '../../constants/userRoles'
import { getBreedsForType } from '../../constants/breeds'
import { HEALTH_STATUS_OPTIONS, VACCINATION_STATUS_OPTIONS } from '../../constants/livestockTypes'
import LivestockImageUpload from './LivestockImageUpload'

const ListingForm = ({
  initialData = {},
  onSubmit,
  submitLabel = 'Publish Listing',
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    type: initialData.type || '',
    breed: initialData.breed || '',
    age: initialData.age || '',
    weight: initialData.weight || '',
    price: initialData.price || '',
    location: initialData.location || '',
    healthStatus: initialData.healthStatus || '',
    vaccinationStatus: initialData.vaccinationStatus || '',
    description: initialData.description || '',
    images: initialData.images || [],
  })

  const [errors, setErrors] = useState({})

  const breeds = useCallback(
    (type) => (type ? (BREEDS[type] || getBreedsForType(type) || []) : []),
    []
  )

  const validate = useCallback(() => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.type) newErrors.type = 'Type is required'
    if (!formData.breed) newErrors.breed = 'Breed is required'
    if (!formData.age && formData.age !== 0) newErrors.age = 'Age is required'
    if (!formData.weight && formData.weight !== 0) newErrors.weight = 'Weight is required'
    if (!formData.price && formData.price !== 0) newErrors.price = 'Price is required'
    if (!formData.location) newErrors.location = 'Location is required'
    if (!formData.healthStatus) newErrors.healthStatus = 'Health status is required'
    if (!formData.vaccinationStatus) newErrors.vaccinationStatus = 'Vaccination status is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (formData.images.length === 0) newErrors.images = 'At least one image is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }, [])

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (validate()) {
        onSubmit({
          ...formData,
          age: Number(formData.age),
          weight: Number(formData.weight),
          price: Number(formData.price),
        })
      }
    },
    [formData, validate, onSubmit]
  )

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Animal Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Dairy Cow - Friesian"
          error={errors.name}
          required
        />
        <Select
          label="Animal Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          options={LIVESTOCK_TYPES}
          error={errors.type}
          required
        />
        <Select
          label="Breed"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          options={breeds(formData.type).map((b) => ({ value: b, label: b }))}
          error={errors.breed}
          required
        />
        <Input
          label="Age (years)"
          name="age"
          type="number"
          step="0.1"
          min="0"
          value={formData.age}
          onChange={handleChange}
          placeholder="e.g., 2.5"
          error={errors.age}
          required
        />
        <Input
          label="Weight (kg)"
          name="weight"
          type="number"
          step="0.1"
          min="0"
          value={formData.weight}
          onChange={handleChange}
          placeholder="e.g., 450"
          error={errors.weight}
          required
        />
        <Input
          label="Price (KSh)"
          name="price"
          type="number"
          min="0"
          value={formData.price}
          onChange={handleChange}
          placeholder="e.g., 120000"
          error={errors.price}
          required
        />
        <Select
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          options={KENYAN_LOCATIONS.map((loc) => ({ value: loc, label: loc }))}
          error={errors.location}
          required
        />
        <Select
          label="Health Status"
          name="healthStatus"
          value={formData.healthStatus}
          onChange={handleChange}
          options={HEALTH_STATUS_OPTIONS}
          error={errors.healthStatus}
          required
        />
        <Select
          label="Vaccination Status"
          name="vaccinationStatus"
          value={formData.vaccinationStatus}
          onChange={handleChange}
          options={VACCINATION_STATUS_OPTIONS}
          error={errors.vaccinationStatus}
          required
        />
      </div>
      <Textarea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Describe the animal, its condition, and any other relevant details..."
        error={errors.description}
        rows={4}
        required
      />
      <LivestockImageUpload
        images={formData.images}
        onChange={(images) => setFormData((prev) => ({ ...prev, images }))}
        error={errors.images}
      />
      <div className="flex justify-end gap-3 mt-4">
        <Button type="submit" loading={loading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

export default ListingForm
