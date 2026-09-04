import { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa'

const API_BASE = 'http://localhost:5000'

function FarmProfile() {
  const [farm, setFarm] = useState({
    farmName: '',
    location: '',
    contact: '',
    description: '',
    verificationStatus: 'pending',
  })

  const [originalFarm, setOriginalFarm] = useState({
    farmName: '',
    location: '',
    contact: '',
    description: '',
    verificationStatus: 'pending',
  })

  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const loadFarmProfile = async () => {
      try {
        setError('')

        const response = await fetch(
          `${API_BASE}/api/profile/me`,
          {
            credentials: 'include',
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.error || 'Unable to load farm profile.'
          )
        }

        const nextFarm = {
          farmName: data.profile?.farm_name || '',
          location: data.profile?.location || '',
          contact: data.profile?.phone || '',
          description: data.profile?.description || '',
          verificationStatus:
            data.profile?.verification_status || 'pending',
        }

        setFarm(nextFarm)
        setOriginalFarm(nextFarm)
      } catch (requestError) {
        setError(
          requestError.message ||
          'Unable to load farm profile.'
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadFarmProfile()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target

    setFarm((current) => ({
      ...current,
      [name]: value,
    }))

    setError('')
    setSuccess('')
  }

  const handleEdit = () => {
    setError('')
    setSuccess('')
    setIsEditing(true)
  }

  const handleCancel = () => {
    setFarm(originalFarm)
    setIsEditing(false)
    setError('')
    setSuccess('')
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      setError('')
      setSuccess('')

      const response = await fetch(
        `${API_BASE}/api/profile/me`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            farm_name: farm.farmName,
            location: farm.location,
            phone: farm.contact,
            description: farm.description,
          }),
        }
      )

      const text = await response.text()

      let data

      try {
        data = JSON.parse(text)
      } catch {
        throw new Error(
          `Server returned ${response.status} instead of JSON.`
        )
      }

      if (!response.ok) {
        throw new Error(
          data.error || 'Unable to save farm profile.'
        )
      }

      const savedFarm = {
        farmName: data.profile?.farm_name || '',
        location: data.profile?.location || '',
        contact: data.profile?.phone || '',
        description: data.profile?.description || '',
        verificationStatus:
          data.profile?.verification_status || 'pending',
      }

      setFarm(savedFarm)
      setOriginalFarm(savedFarm)
      setIsEditing(false)
      setSuccess('Farm profile saved successfully.')
    } catch (requestError) {
      setError(
        requestError.message ||
        'Unable to save farm profile.'
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <style>{`
        .farm-profile-page {
          min-height: 100vh;
          padding: 42px 36px 70px;
          background: var(--page-bg, #0d130f);
          color: var(--text-main, #edf4ee);
          box-sizing: border-box;
        }

        .farm-profile-container {
          width: min(100%, 1200px);
          margin: 0 auto;
        }

        .farm-profile-header {
          margin-bottom: 28px;
        }

        .farm-profile-title {
          margin: 0;
          color: var(--text-main, #edf4ee);
          font-family: "IBM Plex Serif", serif;
          font-size: 34px;
        }

        .farm-profile-subtitle {
          margin: 9px 0 0;
          color: var(--text-muted, #91a198);
          font-family: "Modern Antiqua", serif;
          font-size: 16px;
        }

        .farm-verification {
          width: fit-content;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
          padding: 11px 21px;
          border-radius: 999px;
          background: #e8f1e5;
          color: #277a44;
          font-family: "Modern Antiqua", serif;
          font-size: 15px;
          font-weight: 600;
        }

        .farm-verification-icon {
          width: 12px;
          height: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #299151;
          color: #ffffff;
        }

        .farm-profile-message {
          margin-bottom: 18px;
          padding: 13px 16px;
          border-radius: 12px;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
        }

        .farm-profile-error {
          background: rgba(180, 50, 50, 0.14);
          border: 1px solid rgba(200, 80, 80, 0.35);
          color: #f0aaaa;
        }

        .farm-profile-success {
          background: rgba(39, 122, 68, 0.14);
          border: 1px solid rgba(39, 145, 81, 0.35);
          color: #8fdaa8;
        }

        .farm-profile-card {
          width: min(100%, 900px);
          padding: 34px 36px;
          border: 1px solid var(--border-color, #718078);
          border-radius: 20px;
          background: var(--card-bg, #172019);
          box-sizing: border-box;
        }

        .farm-profile-fields {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .farm-profile-field {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .farm-profile-field label {
          color: var(--text-main, #edf4ee);
          font-family: "IBM Plex Serif", serif;
          font-size: 16px;
        }

        .farm-profile-field input,
        .farm-profile-field textarea {
          width: 100%;
          border: 1px solid transparent;
          border-radius: 12px;
          padding: 15px 16px;
          background: #f3f7f3;
          color: #17351f;
          font-family: "Modern Antiqua", serif;
          font-size: 15px;
          outline: none;
          box-sizing: border-box;
        }

        .farm-profile-field textarea {
          min-height: 120px;
          resize: vertical;
        }

        .farm-profile-field input:focus,
        .farm-profile-field textarea:focus {
          border-color: #4a9f7b;
        }

        .farm-profile-field input:disabled,
        .farm-profile-field textarea:disabled {
          opacity: 0.84;
          cursor: default;
        }

        .farm-profile-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 28px;
        }

        .farm-profile-button {
          min-width: 160px;
          min-height: 50px;
          padding: 0 24px;
          border: 1px solid #277a44;
          border-radius: 12px;
          background: #277a44;
          color: #ffffff;
          font-family: "IBM Plex Serif", serif;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition:
            background 180ms ease,
            box-shadow 180ms ease;
        }

        .farm-profile-button:hover:not(:disabled) {
          background: #216b3b;
          box-shadow: 0 8px 20px rgba(39, 122, 68, 0.16);
        }

        .farm-profile-button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .farm-profile-button.cancel {
          border-color: var(--border-color, #718078);
          background: transparent;
          color: var(--text-main, #edf4ee);
        }

        .farm-profile-button.cancel:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.05);
          box-shadow: none;
        }

        .farm-profile-loading {
          color: var(--text-muted, #91a198);
          font-family: "Modern Antiqua", serif;
          font-size: 15px;
        }

        @media (max-width: 750px) {
          .farm-profile-page {
            padding: 30px 18px 55px;
          }

          .farm-profile-card {
            padding: 27px 22px;
          }
        }

        @media (max-width: 500px) {
          .farm-profile-actions {
            flex-direction: column-reverse;
          }

          .farm-profile-button {
            width: 100%;
          }
        }
      `}</style>

      <main className="farm-profile-page">
        <div className="farm-profile-container">
          <header className="farm-profile-header">
            <h1 className="farm-profile-title">
              Farm Profile
            </h1>

            <p className="farm-profile-subtitle">
              Manage your farm details and verification
            </p>
          </header>

          <div className="farm-verification">
            <span className="farm-verification-icon">
              <FaCheck size={7} />
            </span>

            {farm.verificationStatus === 'approved'
              ? 'Verified Farm'
              : 'Verification Pending'}
          </div>

          {error && (
            <div className="farm-profile-message farm-profile-error">
              {error}
            </div>
          )}

          {success && (
            <div className="farm-profile-message farm-profile-success">
              {success}
            </div>
          )}

          <section className="farm-profile-card">
            {isLoading ? (
              <div className="farm-profile-loading">
                Loading farm profile...
              </div>
            ) : (
              <div className="farm-profile-fields">
                <div className="farm-profile-field">
                  <label htmlFor="farmName">
                    Farm Name
                  </label>

                  <input
                    id="farmName"
                    name="farmName"
                    type="text"
                    value={farm.farmName}
                    onChange={handleChange}
                    disabled={!isEditing || isSaving}
                  />
                </div>

                <div className="farm-profile-field">
                  <label htmlFor="location">
                    Location
                  </label>

                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={farm.location}
                    onChange={handleChange}
                    disabled={!isEditing || isSaving}
                  />
                </div>

                <div className="farm-profile-field">
                  <label htmlFor="contact">
                    Contact
                  </label>

                  <input
                    id="contact"
                    name="contact"
                    type="tel"
                    value={farm.contact}
                    onChange={handleChange}
                    disabled={!isEditing || isSaving}
                  />
                </div>

                <div className="farm-profile-field">
                  <label htmlFor="description">
                    Description
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    value={farm.description}
                    onChange={handleChange}
                    disabled={!isEditing || isSaving}
                  />
                </div>

                <div className="farm-profile-actions">
                  {isEditing && (
                    <button
                      type="button"
                      className="farm-profile-button cancel"
                      onClick={handleCancel}
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                  )}

                  {!isEditing ? (
                    <button
                      type="button"
                      className="farm-profile-button"
                      onClick={handleEdit}
                    >
                      Edit Farm Profile
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="farm-profile-button"
                      onClick={handleSave}
                      disabled={isSaving}
                    >
                      {isSaving
                        ? 'Saving...'
                        : 'Save Farm Profile'}
                    </button>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  )
}

export default FarmProfile
