import { useEffect, useState } from 'react'
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
} from 'react-icons/fa'

const API_BASE = 'http://localhost:5000'

function Profile() {
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
  })

  const [originalProfile, setOriginalProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
  })

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true)
        setError('')
        setSuccess('')

        const response = await fetch(
          `${API_BASE}/api/profile/me`,
          {
            credentials: 'include',
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.error ||
              data.message ||
              'Unable to load your profile.'
          )
        }

        const nextProfile = {
          name: [
            data.user?.first_name,
            data.user?.last_name,
          ]
            .filter(Boolean)
            .join(' '),
          email: data.user?.email || '',
          phone: data.profile?.phone || '',
          location: data.profile?.location || '',
        }

        setProfile(nextProfile)
        setOriginalProfile(nextProfile)
      } catch (requestError) {
        setError(
          requestError.message ||
            'Unable to load your profile.'
        )
      } finally {
        setLoading(false)
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
    setEditing(true)
  }

  const handleCancel = () => {
    setProfile(originalProfile)
    setEditing(false)
    setError('')
    setSuccess('')
  }

  const handleSave = async () => {
    if (saving) {
      return
    }

    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const nameParts = profile.name
        .trim()
        .split(/\s+/)

      const firstName = nameParts.shift() || ''
      const lastName = nameParts.join(' ')

      if (!firstName) {
        throw new Error('Please enter your full name.')
      }

      if (!profile.email.trim()) {
        throw new Error('Please enter your email address.')
      }

      if (!profile.phone.trim()) {
        throw new Error('Please enter your phone number.')
      }

      if (!profile.location.trim()) {
        throw new Error('Please enter your location.')
      }

      const response = await fetch(
        `${API_BASE}/api/profile/me`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: profile.email.trim(),
            phone: profile.phone.trim(),
            location: profile.location.trim(),
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            'Unable to save your profile.'
        )
      }

      const savedProfile = {
        name: [
          data.user?.first_name || firstName,
          data.user?.last_name || lastName,
        ]
          .filter(Boolean)
          .join(' '),
        email:
          data.user?.email ||
          profile.email.trim(),
        phone:
          data.profile?.phone ||
          profile.phone.trim(),
        location:
          data.profile?.location ||
          profile.location.trim(),
      }

      setProfile(savedProfile)
      setOriginalProfile(savedProfile)
      setEditing(false)
      setSuccess('Profile saved successfully.')
    } catch (requestError) {
      setError(
        requestError.message ||
          'Unable to save your profile.'
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <style>{`
        .buyer-profile-page {
          min-height: 100vh;
          padding: 42px 36px 70px;
          background: #f4f8f2;
          color: #173d28;
          box-sizing: border-box;
        }

        .buyer-profile-container {
          width: min(100%, 1000px);
          margin: 0 auto;
        }

        .buyer-profile-header {
          margin-bottom: 32px;
        }

        .buyer-profile-title {
          margin: 0;
          color: #173d28;
          font-family: "IBM Plex Serif", serif;
          font-size: 36px;
        }

        .buyer-profile-subtitle {
          margin: 10px 0 0;
          color: #748078;
          font-family: "Modern Antiqua", serif;
          font-size: 16px;
        }

        .buyer-profile-message {
          margin-bottom: 18px;
          padding: 13px 16px;
          border-radius: 12px;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
        }

        .buyer-profile-error {
          background: #fff0f0;
          border: 1px solid #efc8c8;
          color: #a33a3a;
        }

        .buyer-profile-success {
          background: #edf7ef;
          border: 1px solid #cde3d1;
          color: #277a44;
        }

        .buyer-profile-card {
          padding: 32px;
          border: 1px solid #d1e1d3;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.78);
          box-shadow:
            8px 8px 18px rgba(45, 112, 66, 0.08),
            -6px -6px 16px rgba(255, 255, 255, 0.75);
        }

        .buyer-profile-top {
          display: flex;
          align-items: center;
          gap: 20px;
          padding-bottom: 28px;
          border-bottom: 1px solid #d1e1d3;
        }

        .buyer-profile-avatar {
          width: 76px;
          height: 76px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            #2d7042,
            #72c9a3
          );
          color: #ffffff;
          font-size: 28px;
          box-shadow:
            5px 5px 12px rgba(45, 112, 66, 0.18),
            -4px -4px 10px rgba(255, 255, 255, 0.8);
        }

        .buyer-profile-name {
          margin: 0;
          color: #173d28;
          font-family: "IBM Plex Serif", serif;
          font-size: 26px;
        }

        .buyer-profile-role {
          margin: 7px 0 0;
          color: #748078;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
        }

        .buyer-profile-section {
          margin-top: 30px;
        }

        .buyer-profile-section-title {
          margin: 0 0 20px;
          color: #173d28;
          font-family: "IBM Plex Serif", serif;
          font-size: 21px;
        }

        .buyer-profile-fields {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
        }

        .buyer-profile-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .buyer-profile-label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #5e6e64;
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
          font-weight: 600;
        }

        .buyer-profile-label svg {
          color: #2d7042;
        }

        .buyer-profile-input {
          width: 100%;
          min-height: 48px;
          padding: 0 14px;
          border: 1px solid #c8d8ca;
          border-radius: 11px;
          outline: none;
          background: #ffffff;
          color: #173d28;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          box-sizing: border-box;
          transition:
            border-color 180ms ease,
            box-shadow 180ms ease;
        }

        .buyer-profile-input:focus {
          border-color: #2d7042;
          box-shadow: 0 0 0 3px rgba(45, 112, 66, 0.1);
        }

        .buyer-profile-input:disabled {
          background: #eef4ee;
          color: #66746b;
          cursor: default;
        }

        .buyer-profile-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 30px;
          padding-top: 22px;
          border-top: 1px solid #d1e1d3;
        }

        .buyer-profile-button {
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 20px;
          border: 1px solid transparent;
          border-radius: 11px;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition:
            background 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease,
            opacity 180ms ease;
        }

        .buyer-profile-button:disabled {
          opacity: 0.65;
          cursor: default;
        }

        .buyer-profile-edit {
          border-color: #2d7042;
          background: #2d7042;
          color: #ffffff;
          box-shadow: 4px 4px 9px rgba(45, 112, 66, 0.16);
        }

        .buyer-profile-edit:hover:not(:disabled) {
          background: #245d36;
          border-color: #245d36;
        }

        .buyer-profile-save {
          border-color: #b38a28;
          background: linear-gradient(
            135deg,
            #d5ae4c,
            #b38a28
          );
          color: #ffffff;
          box-shadow: 4px 4px 9px rgba(179, 138, 40, 0.16);
        }

        .buyer-profile-save:hover:not(:disabled) {
          box-shadow: 6px 6px 12px rgba(179, 138, 40, 0.2);
        }

        .buyer-profile-cancel {
          border-color: #c8d8ca;
          background: #ffffff;
          color: #5e6e64;
        }

        .buyer-profile-cancel:hover:not(:disabled) {
          background: #eef4ee;
        }

        .buyer-profile-loading {
          padding: 50px 20px;
          text-align: center;
          color: #748078;
          font-family: "Modern Antiqua", serif;
        }

        @media (max-width: 650px) {
          .buyer-profile-page {
            padding: 30px 18px 55px;
          }

          .buyer-profile-card {
            padding: 23px;
          }

          .buyer-profile-fields {
            grid-template-columns: 1fr;
          }

          .buyer-profile-top {
            align-items: flex-start;
          }

          .buyer-profile-actions {
            flex-direction: column;
          }

          .buyer-profile-button {
            width: 100%;
          }
        }
      `}</style>

      <main className="buyer-profile-page">
        <div className="buyer-profile-container">

          <header className="buyer-profile-header">
            <h1 className="buyer-profile-title">
              My Profile
            </h1>

            <p className="buyer-profile-subtitle">
              Manage your Farmart account information.
            </p>
          </header>

          {error && (
            <div className="buyer-profile-message buyer-profile-error">
              {error}
            </div>
          )}

          {success && (
            <div className="buyer-profile-message buyer-profile-success">
              {success}
            </div>
          )}

          <section className="buyer-profile-card">

            {loading ? (
              <div className="buyer-profile-loading">
                Loading profile...
              </div>
            ) : (
              <>
                <div className="buyer-profile-top">
                  <div className="buyer-profile-avatar">
                    <FaUser />
                  </div>

                  <div>
                    <h2 className="buyer-profile-name">
                      {profile.name || 'Farmart Buyer'}
                    </h2>

                    <p className="buyer-profile-role">
                      Farmart Buyer
                    </p>
                  </div>
                </div>

                <div className="buyer-profile-section">
                  <h3 className="buyer-profile-section-title">
                    Account Information
                  </h3>

                  <div className="buyer-profile-fields">

                    <div className="buyer-profile-field">
                      <label
                        className="buyer-profile-label"
                        htmlFor="name"
                      >
                        <FaUser />
                        Full Name
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="buyer-profile-input"
                        value={profile.name}
                        onChange={handleChange}
                        disabled={!editing || saving}
                      />
                    </div>

                    <div className="buyer-profile-field">
                      <label
                        className="buyer-profile-label"
                        htmlFor="email"
                      >
                        <FaEnvelope />
                        Email Address
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="buyer-profile-input"
                        value={profile.email}
                        onChange={handleChange}
                        disabled={!editing || saving}
                      />
                    </div>

                    <div className="buyer-profile-field">
                      <label
                        className="buyer-profile-label"
                        htmlFor="phone"
                      >
                        <FaPhone />
                        Phone Number
                      </label>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="buyer-profile-input"
                        value={profile.phone}
                        onChange={handleChange}
                        disabled={!editing || saving}
                      />
                    </div>

                    <div className="buyer-profile-field">
                      <label
                        className="buyer-profile-label"
                        htmlFor="location"
                      >
                        <FaMapMarkerAlt />
                        Location
                      </label>

                      <input
                        id="location"
                        name="location"
                        type="text"
                        className="buyer-profile-input"
                        value={profile.location}
                        onChange={handleChange}
                        disabled={!editing || saving}
                      />
                    </div>

                  </div>
                </div>

                <div className="buyer-profile-actions">
                  {editing && (
                    <button
                      type="button"
                      className="buyer-profile-button buyer-profile-cancel"
                      onClick={handleCancel}
                      disabled={saving}
                    >
                      Cancel
                    </button>
                  )}

                  {!editing ? (
                    <button
                      type="button"
                      className="buyer-profile-button buyer-profile-edit"
                      onClick={handleEdit}
                    >
                      <FaEdit />
                      Edit Profile
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="buyer-profile-button buyer-profile-save"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      <FaSave />
                      {saving ? 'Saving Changes...' : 'Save Changes'}
                    </button>
                  )}
                </div>
              </>
            )}

          </section>

        </div>
      </main>
    </>
  )
}

export default Profile
