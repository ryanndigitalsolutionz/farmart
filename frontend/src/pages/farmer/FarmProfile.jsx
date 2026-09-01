import { useState } from 'react'
import { FaCheck } from 'react-icons/fa'

function FarmProfile() {
  const [farm, setFarm] = useState({
    farmName: 'Kiambu Green Pastures',
    location: 'Kiambu, Kenya',
    contact: '+254 712 345 678',
    description: 'Healthy grass-fed cattle and goats.',
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFarm((current) => ({
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
        .farm-profile-page {
          min-height: 100vh;
          padding: 42px 36px 70px;
          background: #0d130f;
          color: #edf4ee;
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
          color: #edf4ee;
          font-family: "IBM Plex Serif", serif;
          font-size: 34px;
        }

        .farm-profile-subtitle {
          margin: 9px 0 0;
          color: #91a198;
          font-family: "Modern Antiqua", serif;
          font-size: 16px;
        }

        .farm-verification {
          width: fit-content;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 30px;
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

        .farm-profile-card {
          width: min(100%, 900px);
          padding: 34px 36px;
          border: 1px solid #718078;
          border-radius: 20px;
          background: #172019;
          box-sizing: border-box;
        }

        .farm-profile-form {
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
          color: #edf4ee;
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
          margin-top: 3px;
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

        .farm-profile-button:hover {
          background: #216b3b;
          box-shadow: 0 8px 20px rgba(39, 122, 68, 0.16);
        }

        .farm-profile-button.cancel {
          border-color: #718078;
          background: transparent;
          color: #edf4ee;
        }

        .farm-profile-button.cancel:hover {
          background: #202b24;
          box-shadow: none;
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
          .farm-verification {
            width: auto;
          }

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

            Verified Farm
          </div>

          <section className="farm-profile-card">

            <form
              className="farm-profile-form"
              onSubmit={handleSubmit}
            >

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
                  disabled={!isEditing}
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
                  disabled={!isEditing}
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
                  disabled={!isEditing}
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
                  disabled={!isEditing}
                />
              </div>

              <div className="farm-profile-actions">

                {isEditing && (
                  <button
                    type="button"
                    className="farm-profile-button cancel"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                )}

                {!isEditing ? (
                  <button
                    type="button"
                    className="farm-profile-button"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Farm Profile
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="farm-profile-button"
                  >
                    Save Farm Profile
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

export default FarmProfile
// commit 22
