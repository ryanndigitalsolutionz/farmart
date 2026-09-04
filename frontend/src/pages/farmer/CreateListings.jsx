import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FaArrowLeft,
  FaImage,
  FaPlus,
  FaCheck,
} from 'react-icons/fa'
import farmartImages from '../../data/farmartImages'

import API_BASE_URL from '../../api/api'

function CreateListings() {
  const navigate = useNavigate()

  const [listingType, setListingType] = useState('livestock')
  const [selectedImage, setSelectedImage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    type: 'Cattle',
    breed: '',
    title: '',
    description: '',
    price: '',
    quantity: '1',
    age: '',
    gender: 'Male',
    weight: '',
    weightUnit: 'kg',
    location: '',
    healthInfo: '',
    availability: 'Available',
    productType: 'Eggs',
    producedDate: '',
    expiryDate: '',
    productQuantity: '',
    productQuantityUnit: 'g',
  })

  const livestockImages = Object.values(
    farmartImages.livestock,
  )
    .flat()
    .filter(
      (image) =>
        ![
          farmartImages.livestock.cows[0],
          farmartImages.livestock.goats[0],
          farmartImages.livestock.sheep[0],
          farmartImages.livestock.pigs[0],
          farmartImages.livestock.poultry[0],
        ].includes(image),
    )

  const productImages = Object.values(
    farmartImages.products,
  )
    .flat()
    .filter(
      (image) =>
        ![
          farmartImages.products.eggs[0],
          farmartImages.products.milk[0],
          farmartImages.products.butter[0],
        ].includes(image),
    )

  const availableImages =
    listingType === 'livestock'
      ? livestockImages
      : productImages

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))

    if (error) {
      setError('')
    }

    if (success) {
      setSuccess('')
    }
  }

  const handleListingTypeChange = (type) => {
    setListingType(type)
    setSelectedImage('')
    setError('')
    setSuccess('')
  }

  const resetForm = () => {
    setFormData({
      type: 'Cattle',
      breed: '',
      title: '',
      description: '',
      price: '',
      quantity: '1',
      age: '',
      gender: 'Male',
      weight: '',
      weightUnit: 'kg',
      location: '',
      healthInfo: '',
      availability: 'Available',
      productType: 'Eggs',
      producedDate: '',
      expiryDate: '',
      productQuantity: '',
      productQuantityUnit: 'g',
    })
    setSelectedImage('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setSuccess('')
    setIsSubmitting(true)

    try {
      const endpoint =
        listingType === 'livestock'
          ? `${API_BASE_URL}/livestock`
          : `${API_BASE_URL}/products`

      const payload =
        listingType === 'livestock'
          ? {
              name: formData.title.trim(),
              type: formData.type,
              breed: formData.breed.trim(),
              age: Number(formData.age),
              sex: formData.gender,
              weight: formData.weight
                ? Number(formData.weight)
                : null,
              weight_unit: formData.weightUnit,
              location: formData.location.trim(),
              price: Number(formData.price),
              quantity: Number(formData.quantity),
              image: selectedImage || null,
              description: formData.description.trim(),
              health_information:
                formData.healthInfo.trim(),
              availability:
                formData.availability === 'Available'
                  ? 'available'
                  : 'unavailable',
            }
          : {
              name: formData.title.trim(),
              type: formData.productType,
              description: formData.description.trim(),
              price: Number(formData.price),
              quantity: Number(formData.productQuantity),
              unit: formData.productQuantityUnit,
              date_produced: formData.producedDate,
              expiry_date: formData.expiryDate,
              location: formData.location.trim(),
              image: selectedImage || null,
              availability:
                formData.availability === 'Available'
                  ? 'available'
                  : 'unavailable',
            }

      const response = await fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(
          data.error ||
          data.message ||
          'Unable to create this listing.',
        )
      }

      setSuccess(
        listingType === 'livestock'
          ? 'Livestock listing published successfully.'
          : 'Farm product listing published successfully.',
      )

      resetForm()
    } catch (submitError) {
      setError(
        submitError.message ||
          'Unable to connect to the Farmart server.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <style>{`
        .farmer-create-page {
          min-height: 100vh;
          padding: 38px 34px 70px;
          background: var(--farm-background);
          color: var(--farm-text);
          box-sizing: border-box;
        }

        .farmer-create-container {
          width: min(100%, 1050px);
          margin: 0 auto;
        }

        .farmer-create-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 28px;
          border: none;
          background: transparent;
          color: var(--farm-mint);
          font-family: "IBM Plex Serif", serif;
          font-size: 17px;
          font-weight: 700;
          cursor: pointer;
        }

        .farmer-create-back:hover {
          opacity: 0.85;
        }

        .farmer-create-header {
          margin-bottom: 30px;
        }

        .farmer-create-title {
          margin: 0;
          color: var(--farm-text);
          font-family: "IBM Plex Serif", serif;
          font-size: 34px;
          line-height: 1.2;
        }

        .farmer-create-description {
          margin: 9px 0 0;
          color: var(--farm-muted);
          font-family: "Modern Antiqua", serif;
          font-size: 15px;
        }

        .farmer-create-card {
          padding: 30px;
          border: 1px solid var(--farm-green-border);
          border-radius: 20px;
          background: var(--farm-green-soft);
          box-shadow:
            0 16px 35px var(--farm-green-glow),
            0 4px 16px var(--farm-green-glow);
          box-sizing: border-box;
        }

        .farmer-listing-switch {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 32px;
          padding: 5px;
          border: 1px solid var(--farm-green-border);
          border-radius: 14px;
          background: var(--farm-background);
        }

        .farmer-listing-switch-button {
          min-height: 48px;
          border: 1px solid transparent;
          border-radius: 10px;
          background: transparent;
          color: var(--farm-muted);
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }

        .farmer-listing-switch-button:hover {
          color: var(--farm-text);
        }

        .farmer-listing-switch-button.active {
          border-color: var(--green-700);
          background: var(--green-700);
          color: #ffffff;
        }

        .farmer-form {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .farmer-form-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .farmer-form-section-title {
          margin: 10px 0 4px;
          color: var(--farm-text);
          font-family: "IBM Plex Serif", serif;
          font-size: 20px;
          font-weight: 500;
        }

        .farmer-form-label {
          color: var(--farm-text);
          font-family: "IBM Plex Serif", serif;
          font-size: 14px;
        }

        .farmer-required {
          color: #df8062;
        }

        .farmer-form-input,
        .farmer-form-select,
        .farmer-form-textarea {
          width: 100%;
          border: 1px solid var(--farm-green-border);
          border-radius: 10px;
          background: var(--auth-logo-bg);
          color: #304b39;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          outline: none;
          box-sizing: border-box;
        }

        .farmer-form-input,
        .farmer-form-select {
          min-height: 50px;
          padding: 0 15px;
        }

        .farmer-form-textarea {
          min-height: 105px;
          padding: 14px 15px;
          resize: vertical;
        }

        .farmer-form-input:focus,
        .farmer-form-select:focus,
        .farmer-form-textarea:focus {
          border-color: var(--farm-mint);
          box-shadow: 0 0 0 3px var(--farm-green-glow);
        }

        .farmer-form-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .farmer-form-grid.two {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .farmer-image-section {
          margin-top: 8px;
        }

        .farmer-image-heading {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 6px;
        }

        .farmer-image-heading svg {
          color: var(--farm-gold);
        }

        .farmer-image-help {
          margin: 0 0 16px;
          color: var(--farm-muted);
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
          line-height: 1.6;
        }

        .farmer-image-grid {
          display: grid;
          grid-template-columns:
            repeat(auto-fill, minmax(125px, 1fr));
          gap: 12px;
        }

        .farmer-image-option {
          position: relative;
          aspect-ratio: 1;
          overflow: hidden;
          padding: 0;
          border: 2px solid transparent;
          border-radius: 12px;
          background: var(--farm-background);
          cursor: pointer;
        }

        .farmer-image-option:hover {
          border-color: var(--farm-mint);
        }

        .farmer-image-option.selected {
          border-color: var(--farm-gold);
        }

        .farmer-image-option img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .farmer-image-check {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 25px;
          height: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--farm-gold);
          color: var(--farm-background);
        }

        .farmer-no-images {
          padding: 30px;
          border: 1px dashed var(--farm-green-border);
          border-radius: 12px;
          color: var(--farm-muted);
          font-family: "Modern Antiqua", serif;
          text-align: center;
        }

        .farmer-form-message {
          padding: 13px 15px;
          border-radius: 10px;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          line-height: 1.5;
        }

        .farmer-form-message.error {
          border: 1px solid rgba(223, 128, 98, 0.35);
          background: rgba(223, 128, 98, 0.1);
          color: #df8062;
        }

        .farmer-form-message.success {
          border: 1px solid rgba(111, 201, 138, 0.35);
          background: var(--farm-green-glow);
          color: var(--farm-mint);
        }

        .farmer-form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 13px;
          margin-top: 10px;
          padding-top: 25px;
          border-top: 1px solid var(--farm-green-border);
        }

        .farmer-form-button {
          min-height: 52px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 23px;
          border-radius: 12px;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }

        .farmer-form-button:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .farmer-form-button.cancel {
          border: 1px solid var(--farm-green-border);
          background: transparent;
          color: var(--farm-muted);
        }

        .farmer-form-button.cancel:hover:not(:disabled) {
          color: var(--farm-text);
          border-color: var(--farm-mint);
        }

        .farmer-form-button.submit {
          border: 1px solid var(--green-700);
          background: var(--green-700);
          color: #ffffff;
        }

        .farmer-form-button.submit:hover:not(:disabled) {
          filter: brightness(1.08);
          box-shadow: 0 8px 20px var(--farm-green-glow);
        }

        @media (max-width: 750px) {
          .farmer-create-page {
            padding: 28px 18px 55px;
          }

          .farmer-create-card {
            padding: 22px;
          }

          .farmer-form-grid,
          .farmer-form-grid.two {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 500px) {
          .farmer-create-card {
            padding: 17px;
          }

          .farmer-listing-switch {
            grid-template-columns: 1fr;
          }

          .farmer-form-actions {
            flex-direction: column;
          }

          .farmer-form-button {
            width: 100%;
          }
        }
      `}</style>

      <main className="farmer-create-page">
        <div className="farmer-create-container">
          <button
            type="button"
            className="farmer-create-back"
            onClick={() => navigate('/farmer/dashboard')}
          >
            <FaArrowLeft size={18} />
            Back to Dashboard
          </button>

          <header className="farmer-create-header">
            <h1 className="farmer-create-title">
              Create Listing
            </h1>

            <p className="farmer-create-description">
              List livestock or farm products for buyers on Farmart.
            </p>
          </header>

          <section className="farmer-create-card">
            <div className="farmer-listing-switch">
              <button
                type="button"
                className={`farmer-listing-switch-button ${
                  listingType === 'livestock' ? 'active' : ''
                }`}
                onClick={() =>
                  handleListingTypeChange('livestock')
                }
              >
                Livestock
              </button>

              <button
                type="button"
                className={`farmer-listing-switch-button ${
                  listingType === 'product' ? 'active' : ''
                }`}
                onClick={() =>
                  handleListingTypeChange('product')
                }
              >
                Farm Products
              </button>
            </div>

            <form
              className="farmer-form"
              onSubmit={handleSubmit}
            >
              {listingType === 'livestock' ? (
                <>
                  <h2 className="farmer-form-section-title">
                    Livestock Information
                  </h2>

                  <div className="farmer-form-grid">
                    <div className="farmer-form-section">
                      <label className="farmer-form-label">
                        Livestock Type{' '}
                        <span className="farmer-required">
                          *
                        </span>
                      </label>

                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="farmer-form-select"
                        required
                      >
                        <option value="Cattle">
                          Cattle
                        </option>
                        <option value="Goat">
                          Goat
                        </option>
                        <option value="Sheep">
                          Sheep
                        </option>
                        <option value="Pig">
                          Pig
                        </option>
                        <option value="Poultry">
                          Poultry
                        </option>
                      </select>
                    </div>

                    <div className="farmer-form-section">
                      <label className="farmer-form-label">
                        Breed{' '}
                        <span className="farmer-required">
                          *
                        </span>
                      </label>

                      <input
                        name="breed"
                        value={formData.breed}
                        onChange={handleChange}
                        className="farmer-form-input"
                        placeholder="e.g. Boran"
                        required
                      />
                    </div>
                  </div>

                  <div className="farmer-form-section">
                    <label className="farmer-form-label">
                      Title{' '}
                      <span className="farmer-required">
                        *
                      </span>
                    </label>

                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="farmer-form-input"
                      placeholder="Short descriptive title"
                      required
                    />
                  </div>

                  <div className="farmer-form-section">
                    <label className="farmer-form-label">
                      Description{' '}
                      <span className="farmer-required">
                        *
                      </span>
                    </label>

                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="farmer-form-textarea"
                      placeholder="Describe condition, health, and the animal."
                      required
                    />
                  </div>

                  <div className="farmer-form-grid">
                    <div className="farmer-form-section">
                      <label className="farmer-form-label">
                        Price (KES){' '}
                        <span className="farmer-required">
                          *
                        </span>
                      </label>

                      <input
                        type="number"
                        name="price"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        className="farmer-form-input"
                        placeholder="0"
                        required
                      />
                    </div>

                    <div className="farmer-form-section">
                      <label className="farmer-form-label">
                        Quantity{' '}
                        <span className="farmer-required">
                          *
                        </span>
                      </label>

                      <input
                        type="number"
                        name="quantity"
                        min="1"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="farmer-form-input"
                        required
                      />
                    </div>

                    <div className="farmer-form-section">
                      <label className="farmer-form-label">
                        Age{' '}
                        <span className="farmer-required">
                          *
                        </span>
                      </label>

                      <input
                        type="number"
                        name="age"
                        min="0"
                        value={formData.age}
                        onChange={handleChange}
                        className="farmer-form-input"
                        placeholder="Age in years"
                        required
                      />
                    </div>
                  </div>

                  <div className="farmer-form-grid">
                    <div className="farmer-form-section">
                      <label className="farmer-form-label">
                        Gender
                      </label>

                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="farmer-form-select"
                      >
                        <option value="Male">
                          Male
                        </option>
                        <option value="Female">
                          Female
                        </option>
                      </select>
                    </div>

                    <div className="farmer-form-section">
                      <label className="farmer-form-label">
                        Weight
                      </label>

                      <input
                        type="number"
                        name="weight"
                        min="0"
                        step="0.01"
                        value={formData.weight}
                        onChange={handleChange}
                        className="farmer-form-input"
                        placeholder="0"
                      />
                    </div>

                    <div className="farmer-form-section">
                      <label className="farmer-form-label">
                        Weight Unit
                      </label>

                      <select
                        name="weightUnit"
                        value={formData.weightUnit}
                        onChange={handleChange}
                        className="farmer-form-select"
                      >
                        <option value="kg">
                          kg
                        </option>
                        <option value="g">
                          g
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="farmer-form-section">
                    <label className="farmer-form-label">
                      Location{' '}
                      <span className="farmer-required">
                        *
                      </span>
                    </label>

                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="farmer-form-input"
                      placeholder="Town, County"
                      required
                    />
                  </div>

                  <div className="farmer-form-section">
                    <label className="farmer-form-label">
                      Health Information
                    </label>

                    <textarea
                      name="healthInfo"
                      value={formData.healthInfo}
                      onChange={handleChange}
                      className="farmer-form-textarea"
                      placeholder="Vaccinations, vet records, and other health information."
                    />
                  </div>
                </>
              ) : (
                <>
                  <h2 className="farmer-form-section-title">
                    Farm Product Information
                  </h2>

                  <div className="farmer-form-grid two">
                    <div className="farmer-form-section">
                      <label className="farmer-form-label">
                        Product{' '}
                        <span className="farmer-required">
                          *
                        </span>
                      </label>

                      <select
                        name="productType"
                        value={formData.productType}
                        onChange={(event) => {
                          handleChange(event)
                          setSelectedImage('')
                        }}
                        className="farmer-form-select"
                        required
                      >
                        <option value="Eggs">
                          Eggs
                        </option>
                        <option value="Milk">
                          Milk
                        </option>
                        <option value="Butter">
                          Butter
                        </option>
                      </select>
                    </div>

                    <div className="farmer-form-section">
                      <label className="farmer-form-label">
                        Title{' '}
                        <span className="farmer-required">
                          *
                        </span>
                      </label>

                      <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="farmer-form-input"
                        placeholder="e.g. Fresh farm eggs"
                        required
                      />
                    </div>
                  </div>

                  <div className="farmer-form-section">
                    <label className="farmer-form-label">
                      Description{' '}
                      <span className="farmer-required">
                        *
                      </span>
                    </label>

                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="farmer-form-textarea"
                      placeholder="Describe your farm product."
                      required
                    />
                  </div>

                  <div className="farmer-form-grid">
                    <div className="farmer-form-section">
                      <label className="farmer-form-label">
                        Price (KES){' '}
                        <span className="farmer-required">
                          *
                        </span>
                      </label>

                      <input
                        type="number"
                        name="price"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        className="farmer-form-input"
                        placeholder="0"
                        required
                      />
                    </div>

                    <div className="farmer-form-section">
                      <label className="farmer-form-label">
                        Quantity{' '}
                        <span className="farmer-required">
                          *
                        </span>
                      </label>

                      <input
                        type="number"
                        name="productQuantity"
                        min="0"
                        step="0.01"
                        value={formData.productQuantity}
                        onChange={handleChange}
                        className="farmer-form-input"
                        placeholder="e.g. 500"
                        required
                      />
                    </div>

                    <div className="farmer-form-section">
                      <label className="farmer-form-label">
                        Unit{' '}
                        <span className="farmer-required">
                          *
                        </span>
                      </label>

                      <select
                        name="productQuantityUnit"
                        value={formData.productQuantityUnit}
                        onChange={handleChange}
                        className="farmer-form-select"
                        required
                      >
                        <option value="g">
                          g
                        </option>
                        <option value="kg">
                          kg
                        </option>
                        <option value="L">
                          L
                        </option>
                        <option value="units">
                          units
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="farmer-form-grid two">
                    <div className="farmer-form-section">
                      <label className="farmer-form-label">
                        Date Produced{' '}
                        <span className="farmer-required">
                          *
                        </span>
                      </label>

                      <input
                        type="date"
                        name="producedDate"
                        value={formData.producedDate}
                        onChange={handleChange}
                        className="farmer-form-input"
                        required
                      />
                    </div>

                    <div className="farmer-form-section">
                      <label className="farmer-form-label">
                        Expiry Date{' '}
                        <span className="farmer-required">
                          *
                        </span>
                      </label>

                      <input
                        type="date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        className="farmer-form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="farmer-form-section">
                    <label className="farmer-form-label">
                      Location{' '}
                      <span className="farmer-required">
                        *
                      </span>
                    </label>

                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="farmer-form-input"
                      placeholder="Town, County"
                      required
                    />
                  </div>
                </>
              )}

              <section className="farmer-image-section">
                <div className="farmer-image-heading">
                  <FaImage size={19} />

                  <h2 className="farmer-form-section-title">
                    Listing Image
                  </h2>
                </div>

                <p className="farmer-image-help">
                  Select one image for this listing. These images are
                  provided for Farmart testing.
                </p>

                {availableImages.length > 0 ? (
                  <div className="farmer-image-grid">
                    {availableImages.map((image, index) => (
                      <button
                        type="button"
                        key={image}
                        className={`farmer-image-option ${
                          selectedImage === image
                            ? 'selected'
                            : ''
                        }`}
                        onClick={() =>
                          setSelectedImage(image)
                        }
                        aria-label={`Select listing image ${index + 1}`}
                        aria-pressed={
                          selectedImage === image
                        }
                      >
                        <img
                          src={image}
                          alt={`Listing option ${index + 1}`}
                        />

                        {selectedImage === image && (
                          <span className="farmer-image-check">
                            <FaCheck size={15} />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="farmer-no-images">
                    No images are currently available.
                  </div>
                )}
              </section>

              <div className="farmer-form-section">
                <label className="farmer-form-label">
                  Availability
                </label>

                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="farmer-form-select"
                >
                  <option value="Available">
                    Available
                  </option>

                  <option value="Unavailable">
                    Unavailable
                  </option>
                </select>
              </div>

              {error && (
                <div className="farmer-form-message error">
                  {error}
                </div>
              )}

              {success && (
                <div className="farmer-form-message success">
                  {success}
                </div>
              )}

              <div className="farmer-form-actions">
                <button
                  type="button"
                  className="farmer-form-button cancel"
                  onClick={() =>
                    navigate('/farmer/dashboard')
                  }
                  disabled={isSubmitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="farmer-form-button submit"
                  disabled={isSubmitting}
                >
                  <FaPlus size={18} />
                  {isSubmitting
                    ? 'Publishing...'
                    : 'Publish Listing'}
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </>
  )
}

export default CreateListings
