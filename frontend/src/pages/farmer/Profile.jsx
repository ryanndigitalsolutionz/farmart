import { useState } from 'react'
import { FaStar } from 'react-icons/fa'

function Profile() {
  const [profile, setProfile] = useState({
    fullName: 'Jomo Kenyatta',
    email: 'jomo@example.com',
    location: 'Nairobi, Kenya',
    contact: '+254 712 345 678',
    bio: 'Farmer supplying healthy livestock and fresh farm produce.',
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setProfile((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsEditing(false)

    // Backend update will be connected here later.
  }

  return (
    <>
      <style>{`
        .farmer-profile-page {
          min-height: 100vh;
          padding: 42px 36px 70px;
          background: #0d130f;
          color: #edf4ee;
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
          color: #edf4ee;
          font-family: "IBM Plex Serif", serif;
          font-size: 34px;
        }

        .farmer-profile-subtitle {
          margin: 9px 0 0;
          color: #91a198;
          font-family: "Modern Antiqua", serif;
          font-size: 16px;
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
          border: 1px solid #718078;
          border-radius: 20px;
          background: #172019;
          box-sizing: border-box;
        }

        .farmer-profile-stat-label {
          margin-bottom: 14px;
          color: #71847a;
          font-family: "Modern Antiqua", serif;
          font-size: 15px;
        }

        .farmer-profile-stat-value {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #edf4ee;
          font-family: "IBM Plex Serif", serif;
          font-size: 28px;
          font-weight: 700;
        }

        .farmer-profile-stat-value svg {
          color: #e4b94f;
        }

        .farmer-profile-form-card {
          width: min(100%, 900px);
          padding: 34px 36px;
          border: 1px solid #718078;
          border-radius: 20px;
          background: #172019;
          box-sizing: border-box;
        }

        .farmer-profile-form {
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
          color: #edf4ee;
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
          margin-top: 4px;
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

        .farmer-profile-button:hover {
          background: #216b3b;
          box-shadow: 0 8px 20px rgba(39, 122, 68, 0.16);
        }

        .farmer-profile-button.cancel {
          margin-right: 10px;
          border-color: #718078;
          background: transparent;
          color: #edf4ee;
        }

        .farmer-profile-button.cancel:hover {
          background: #202b24;
          box-shadow: none;
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
            gap: 10px;
          }

          .farmer-profile-button {
            width: 100%;
          }

          .farmer-profile-button.cancel {
            margin-right: 0;
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

          <section className="farmer-profile-stats">

            <article className="farmer-profile-stat">
              <span className="farmer-profile-stat-label">
                Rating
              </span>

              <strong className="farmer-profile-stat-value">
                4.8
                <FaStar size={19} />
              </strong>
            </article>

            <article className="farmer-profile-stat">
              <span className="farmer-profile-stat-label">
                Reviews
              </span>

              <strong className="farmer-profile-stat-value">
                24
              </strong>
            </article>

            <article className="farmer-profile-stat">
              <span className="farmer-profile-stat-label">
                Listings
              </span>

              <strong className="farmer-profile-stat-value">
                2
              </strong>
            </article>

          </section>

          <section className="farmer-profile-form-card">

            <form
              className="farmer-profile-form"
              onSubmit={handleSubmit}
            >

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
                  disabled={!isEditing}
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
                  disabled={!isEditing}
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
                  disabled={!isEditing}
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
                  disabled={!isEditing}
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
                  disabled={!isEditing}
                />
              </div>

              <div className="farmer-profile-actions">

                {isEditing && (
                  <button
                    type="button"
                    className="farmer-profile-button cancel"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                )}

                {!isEditing ? (
                  <button
                    type="button"
                    className="farmer-profile-button"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="farmer-profile-button"
                  >
                    Save Profile
                  </button>
                )}

              </div>

            </form>

          </section>

        </div>
      </main>
    </>
  )
}

export default Profile
// commit 24
