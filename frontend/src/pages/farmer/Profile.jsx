import { useEffect, useState } from 'react'

const API_BASE = 'http://localhost:5000'

function Profile() {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    location: '',
    contact: '',
    bio: '',
  })

  const [originalProfile, setOriginalProfile] = useState({
    fullName: '',
    email: '',
    location: '',
    contact: '',
    bio: '',
  })

  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [listingCount, setListingCount] = useState(0)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setError('')

        const [profileResponse, listingsResponse] = await Promise.all([
          fetch(`${API_BASE}/api/profile/me`, {
            credentials: 'include',
          }),
          fetch(`${API_BASE}/livestock`, {
            credentials: 'include',
          }),
        ])

        const profileData = await profileResponse.json()

        if (!profileResponse.ok) {
          throw new Error(
            profileData.error || 'Unable to load profile.'
          )
        }

        const livestockData = listingsResponse.ok
          ? await listingsResponse.json()
          : []

        const fullName = [
          profileData.user?.first_name,
          profileData.user?.last_name,
        ]
          .filter(Boolean)
          .join(' ')

        const nextProfile = {
          fullName,
          email: profileData.user?.email || '',
          location: profileData.profile?.location || '',
          contact: profileData.profile?.phone || '',
          bio: profileData.profile?.description || '',
        }

        setProfile(nextProfile)
        setOriginalProfile(nextProfile)

        setListingCount(
          Array.isArray(livestockData)
            ? livestockData.length
            : 0
        )
      } catch (requestError) {
        setError(
          requestError.message || 'Unable to load profile.'
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target

    setProfile((current) => ({
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
    setProfile(originalProfile)
    setIsEditing(false)
    setError('')
    setSuccess('')
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      setError('')
      setSuccess('')

      const nameParts = profile.fullName.trim().split(/\s+/)
      const firstName = nameParts.shift() || ''
      const lastName = nameParts.join(' ')

      const response = await fetch(`${API_BASE}/api/profile/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: profile.email,
          location: profile.location,
          phone: profile.contact,
          description: profile.bio,
        }),
      })

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
          data.error || 'Unable to save profile.'
        )
      }

      const savedProfile = {
        fullName: [
          data.user?.first_name,
          data.user?.last_name,
        ]
          .filter(Boolean)
          .join(' '),
        email: data.user?.email || '',
        location: data.profile?.location || '',
        contact: data.profile?.phone || '',
        bio: data.profile?.description || '',
      }

      setProfile(savedProfile)
      setOriginalProfile(savedProfile)
      setIsEditing(false)
      setSuccess('Profile saved successfully.')
    } catch (requestError) {
      setError(
        requestError.message || 'Unable to save profile.'
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <style>{`
        .farmer-profile-page {
          min-height: 100vh;
          padding: 42px 36px 70px;
          background: var(--page-bg, #0d130f);
          color: var(--text-main, #edf4ee);
          box-sizing: border-box;
        }

        .farmer-profile-container {
          width: min(100%, 1200px);
          margin: 0 auto;
        }

        .farmer-profile-header {
          margin-bottom: 30px;
        }

        .farmer-profile-title {
          margin: 0;
          color: var(--text-main, #edf4ee);
          font-family: "IBM Plex Serif", serif;
          font-size: 34px;
        }

        .farmer-profile-subtitle {
          margin: 9px 0 0;
          color: var(--text-muted, #91a198);
          font-family: "Modern Antiqua", serif;
          font-size: 16px;
        }

        .farmer-profile-message {
          margin-bottom: 18px;
          padding: 13px 16px;
          border-radius: 12px;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
        }

        .farmer-profile-error {
          background: rgba(180, 50, 50, 0.14);
          border: 1px solid rgba(200, 80, 80, 0.35);
          color: #f0aaaa;
        }

        .farmer-profile-success {
          background: rgba(39, 122, 68, 0.14);
          border: 1px solid rgba(39, 145, 81, 0.35);
          color: #8fdaa8;
        }

        .farmer-profile-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 36px;
        }

        .farmer-profile-stat {
          min-height: 115px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          border: 1px solid var(--border-color, #718078);
          border-radius: 20px;
          background: var(--card-bg, #172019);
          box-sizing: border-box;
        }

        .farmer-profile-stat-label {
          margin-bottom: 14px;
          color: var(--text-muted, #71847a);
          font-family: "Modern Antiqua", serif;
          font-size: 15px;
        }

        .farmer-profile-stat-value {
          display: flex;
          align-items: center;
          gap: 5px;
          color: var(--text-main, #edf4ee);
          font-family: "IBM Plex Serif", serif;
          font-size: 28px;
          font-weight: 700;
        }

        .farmer-profile-form-card {
          width: min(100%, 900px);
          padding: 34px 36px;
          border: 1px solid var(--border-color, #718078);
          border-radius: 20px;
          background: var(--card-bg, #172019);
          box-sizing: border-box;
        }

        .farmer-profile-fields {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .farmer-profile-field {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .farmer-profile-field label {
          color: var(--text-main, #edf4ee);
          font-family: "IBM Plex Serif", serif;
          font-size: 16px;
        }

        .farmer-profile-field input,
        .farmer-profile-field textarea {
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

        .farmer-profile-field textarea {
          min-height: 120px;
          resize: vertical;
        }

        .farmer-profile-field input:focus,
        .farmer-profile-field textarea:focus {
          border-color: #4a9f7b;
        }

        .farmer-profile-field input:disabled,
        .farmer-profile-field textarea:disabled {
          opacity: 0.82;
          cursor: default;
        }

        .farmer-profile-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 28px;
        }

        .farmer-profile-button {
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

        .farmer-profile-button:hover:not(:disabled) {
          background: #216b3b;
          box-shadow: 0 8px 20px rgba(39, 122, 68, 0.16);
        }

        .farmer-profile-button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .farmer-profile-button.cancel {
          border-color: var(--border-color, #718078);
          background: transparent;
          color: var(--text-main, #edf4ee);
        }

        .farmer-profile-button.cancel:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.05);
          box-shadow: none;
        }

        .farmer-profile-loading {
          color: var(--text-muted, #91a198);
          font-family: "Modern Antiqua", serif;
          font-size: 15px;
        }

        @media (max-width: 750px) {
          .farmer-profile-page {
            padding: 30px 18px 55px;
          }

          .farmer-profile-stats {
            grid-template-columns: 1fr;
          }

          .farmer-profile-form-card {
            padding: 27px 22px;
          }
        }

        @media (max-width: 500px) {
          .farmer-profile-actions {
            flex-direction: column-reverse;
          }

          .farmer-profile-button {
            width: 100%;
          }
        }
      `}</style>

      <main className="farmer-profile-page">
        <div className="farmer-profile-container">
          <header className="farmer-profile-header">
            <h1 className="farmer-profile-title">
              Profile
            </h1>

            <p className="farmer-profile-subtitle">
              Manage your personal information
            </p>
          </header>

          {error && (
            <div className="farmer-profile-message farmer-profile-error">
              {error}
            </div>
          )}

          {success && (
            <div className="farmer-profile-message farmer-profile-success">
              {success}
            </div>
          )}

          <section className="farmer-profile-stats">
            <article className="farmer-profile-stat">
              <span className="farmer-profile-stat-label">
                Rating
              </span>

              <strong className="farmer-profile-stat-value">
                —
              </strong>
            </article>

            <article className="farmer-profile-stat">
              <span className="farmer-profile-stat-label">
                Reviews
              </span>

              <strong className="farmer-profile-stat-value">
                —
              </strong>
            </article>

            <article className="farmer-profile-stat">
              <span className="farmer-profile-stat-label">
                Listings
              </span>

              <strong className="farmer-profile-stat-value">
                {listingCount}
              </strong>
            </article>
          </section>

          <section className="farmer-profile-form-card">
            {isLoading ? (
              <div className="farmer-profile-loading">
                Loading profile...
              </div>
            ) : (
              <div className="farmer-profile-fields">
                <div className="farmer-profile-field">
                  <label htmlFor="fullName">
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={profile.fullName}
                    onChange={handleChange}
                    disabled={!isEditing || isSaving}
                  />
                </div>

                <div className="farmer-profile-field">
                  <label htmlFor="email">
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEditing || isSaving}
                  />
                </div>

                <div className="farmer-profile-field">
                  <label htmlFor="location">
                    Location
                  </label>

                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={profile.location}
                    onChange={handleChange}
                    disabled={!isEditing || isSaving}
                  />
                </div>

                <div className="farmer-profile-field">
                  <label htmlFor="contact">
                    Contact
                  </label>

                  <input
                    id="contact"
                    name="contact"
                    type="tel"
                    value={profile.contact}
                    onChange={handleChange}
                    disabled={!isEditing || isSaving}
                  />
                </div>

                <div className="farmer-profile-field">
                  <label htmlFor="bio">
                    Bio
                  </label>

                  <textarea
                    id="bio"
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    disabled={!isEditing || isSaving}
                  />
                </div>

                <div className="farmer-profile-actions">
                  {isEditing && (
                    <button
                      type="button"
                      className="farmer-profile-button cancel"
                      onClick={handleCancel}
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                  )}

                  {!isEditing ? (
                    <button
                      type="button"
                      className="farmer-profile-button"
                      onClick={handleEdit}
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="farmer-profile-button"
                      onClick={handleSave}
                      disabled={isSaving}
                    >
                      {isSaving ? 'Saving...' : 'Save Profile'}
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

export default Profile
