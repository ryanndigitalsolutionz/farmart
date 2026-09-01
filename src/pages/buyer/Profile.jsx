import { useState } from 'react'
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaEdit, FaSave } from 'react-icons/fa'

function Profile() {
  const [editing, setEditing] = useState(false)

  const [profile, setProfile] = useState({
    name: 'Ryan Makori',
    email: 'ryan@example.com',
    phone: '+254 712 345 678',
    location: 'Nairobi, Kenya',
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setProfile((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSave = () => {
    setEditing(false)
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
            box-shadow 180ms ease;
        }

        .buyer-profile-edit {
          border-color: #2d7042;
          background: #2d7042;
          color: #ffffff;
          box-shadow: 4px 4px 9px rgba(45, 112, 66, 0.16);
        }

        .buyer-profile-edit:hover {
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

        .buyer-profile-save:hover {
          box-shadow: 6px 6px 12px rgba(179, 138, 40, 0.2);
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

          <section className="buyer-profile-card">

            <div className="buyer-profile-top">
              <div className="buyer-profile-avatar">
                <FaUser />
              </div>

              <div>
                <h2 className="buyer-profile-name">
                  {profile.name}
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
                    disabled={!editing}
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
                    disabled={!editing}
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
                    disabled={!editing}
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
                    disabled={!editing}
                  />
                </div>

              </div>
            </div>

            <div className="buyer-profile-actions">
              {!editing ? (
                <button
                  type="button"
                  className="buyer-profile-button buyer-profile-edit"
                  onClick={() => setEditing(true)}
                >
                  <FaEdit />
                  Edit Profile
                </button>
              ) : (
                <button
                  type="button"
                  className="buyer-profile-button buyer-profile-save"
                  onClick={handleSave}
                >
                  <FaSave />
                  Save Changes
                </button>
              )}
            </div>

          </section>

        </div>
      </main>
    </>
  )
}

export default Profile
