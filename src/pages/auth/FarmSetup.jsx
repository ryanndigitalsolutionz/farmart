import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Phone, House, PenLine, ShieldCheck } from 'lucide-react'

function FarmSetup() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    farmName: '',
    location: '',
    contact: '',
    description: '',
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSaving(true)

    localStorage.setItem(
      'farmartFarmProfile',
      JSON.stringify({
        ...formData,
        verificationStatus: 'pending',
      }),
    )

    setTimeout(() => {
      setIsSaving(false)
      navigate('/farmer/dashboard')
    }, 700)
  }

  return (
    <>
      <style>{`
        .farm-setup-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 64px 28px;
          box-sizing: border-box;
          background:
            radial-gradient(
              circle at 50% 35%,
              rgba(45, 112, 66, 0.10),
              transparent 45%
            ),
            #f5f9f3;
          color: #173d28;
          font-family: "Modern Antiqua", serif;
        }

        .farm-setup-frame {
          width: min(100%, 560px);
          background: #ffffff;
          border: 1px solid #d9e6da;
          border-radius: 30px;
          box-shadow:
            0 28px 75px rgba(23, 61, 40, 0.11),
            0 5px 18px rgba(23, 61, 40, 0.05);
          overflow: hidden;
          position: relative;
        }

        .farm-setup-frame::before {
          content: "";
          position: absolute;
          top: 0;
          left: 50%;
          width: 120px;
          height: 5px;
          transform: translateX(-50%);
          border-radius: 0 0 8px 8px;
          background: #2d7042;
        }

        .farm-setup-content {
          padding: 62px 60px 54px;
        }

        .farm-setup-logo {
          width: 68px;
          height: 68px;
          margin: 0 auto 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          background: #2d7042;
          color: #ffffff;
          font-family: "IBM Plex Serif", serif;
          font-size: 36px;
          font-weight: 700;
          box-shadow:
            0 0 0 8px rgba(45, 112, 66, 0.07),
            0 12px 28px rgba(45, 112, 66, 0.18);
        }

        .farm-setup-heading {
          margin: 0;
          text-align: center;
          color: #173d28;
          font-family: "IBM Plex Serif", serif;
          font-size: clamp(32px, 5vw, 42px);
          font-weight: 700;
          line-height: 1.15;
        }

        .farm-setup-subtitle {
          max-width: 410px;
          margin: 18px auto 42px;
          text-align: center;
          color: #718078;
          font-size: 16px;
          line-height: 1.7;
        }

        .farm-setup-form {
          display: flex;
          flex-direction: column;
          gap: 19px;
        }

        .farm-setup-field {
          width: 100%;
          display: flex;
          align-items: flex-start;
          gap: 15px;
          padding: 17px 18px;
          box-sizing: border-box;
          border: 1px solid #d7e4d8;
          border-radius: 16px;
          background: #f8fbf7;
          transition:
            border-color 180ms ease,
            background 180ms ease,
            box-shadow 180ms ease;
        }

        .farm-setup-field:focus-within {
          border-color: #2d7042;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(45, 112, 66, 0.08);
        }

        .farm-setup-field-icon {
          width: 23px;
          height: 23px;
          flex-shrink: 0;
          margin-top: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2d7042;
        }

        .farm-setup-field-content {
          min-width: 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .farm-setup-field-label {
          color: #31523d;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .farm-setup-field input,
        .farm-setup-field textarea {
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
          border: none;
          outline: none;
          padding: 0;
          background: transparent;
          color: #173d28;
          font-family: "Modern Antiqua", serif;
          font-size: 15px;
          line-height: 1.6;
        }

        .farm-setup-field input::placeholder,
        .farm-setup-field textarea::placeholder {
          color: #96a198;
        }

        .farm-setup-field textarea {
          min-height: 78px;
          resize: vertical;
        }

        .farm-setup-divider {
          width: 100%;
          height: 1px;
          margin: 8px 0 2px;
          background: #e1ebe1;
        }

        .farm-setup-verification {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px;
          border: 1px solid #deeadf;
          border-radius: 15px;
          background: #f3f8f1;
        }

        .farm-setup-verification-icon {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 11px;
          background: #e3f1e3;
          color: #2d7042;
        }

        .farm-setup-verification-copy {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .farm-setup-verification-copy strong {
          color: #31523d;
          font-size: 14px;
          font-weight: 700;
        }

        .farm-setup-verification-copy span {
          color: #718078;
          font-size: 13px;
          line-height: 1.5;
        }

        .farm-setup-submit {
          width: 100%;
          min-height: 58px;
          margin-top: 5px;
          border: none;
          border-radius: 15px;
          background: #2d7042;
          color: #ffffff;
          font-family: "Modern Antiqua", serif;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 9px 22px rgba(45, 112, 66, 0.18);
          transition:
            transform 180ms ease,
            background 180ms ease,
            box-shadow 180ms ease;
        }

        .farm-setup-submit:hover:not(:disabled) {
          background: #256238;
          transform: translateY(-2px);
          box-shadow: 0 13px 28px rgba(45, 112, 66, 0.24);
        }

        .farm-setup-submit:active:not(:disabled) {
          transform: translateY(0);
        }

        .farm-setup-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        @media (max-width: 620px) {
          .farm-setup-page {
            padding: 34px 18px;
          }

          .farm-setup-frame {
            border-radius: 24px;
          }

          .farm-setup-content {
            padding: 48px 28px 40px;
          }
        }

        @media (max-width: 420px) {
          .farm-setup-page {
            padding: 20px 12px;
          }

          .farm-setup-content {
            padding: 42px 20px 34px;
          }

          .farm-setup-heading {
            font-size: 30px;
          }

          .farm-setup-subtitle {
            font-size: 15px;
            margin-bottom: 32px;
          }

          .farm-setup-field {
            padding: 15px;
          }
        }
      `}</style>

      <main className="farm-setup-page">
        <section className="farm-setup-frame">
          <div className="farm-setup-content">
            <div className="farm-setup-logo">F</div>

            <h1 className="farm-setup-heading">Set up your farm</h1>

            <p className="farm-setup-subtitle">
              Tell buyers a little about your farm before you start selling.
            </p>

            <form onSubmit={handleSubmit} className="farm-setup-form">
              <label className="farm-setup-field">
                <span className="farm-setup-field-icon">
                  <House size={18} />
                </span>

                <span className="farm-setup-field-content">
                  <span className="farm-setup-field-label">Farm name</span>

                  <input
                    type="text"
                    name="farmName"
                    placeholder="e.g. Kiambu Green Pastures"
                    value={formData.farmName}
                    onChange={handleChange}
                    required
                  />
                </span>
              </label>

              <label className="farm-setup-field">
                <span className="farm-setup-field-icon">
                  <MapPin size={18} />
                </span>

                <span className="farm-setup-field-content">
                  <span className="farm-setup-field-label">Location</span>

                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Kiambu County"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </span>
              </label>

              <label className="farm-setup-field">
                <span className="farm-setup-field-icon">
                  <Phone size={18} />
                </span>

                <span className="farm-setup-field-content">
                  <span className="farm-setup-field-label">
                    Contact number
                  </span>

                  <input
                    type="tel"
                    name="contact"
                    placeholder="e.g. 0712 345 678"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />
                </span>
              </label>

              <label className="farm-setup-field">
                <span className="farm-setup-field-icon">
                  <PenLine size={18} />
                </span>

                <span className="farm-setup-field-content">
                  <span className="farm-setup-field-label">
                    About your farm
                  </span>

                  <textarea
                    name="description"
                    placeholder="Tell buyers briefly what you farm or sell..."
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    required
                  />
                </span>
              </label>

              <div className="farm-setup-divider" />

              <div className="farm-setup-verification">
                <div className="farm-setup-verification-icon">
                  <ShieldCheck size={18} />
                </div>

                <div className="farm-setup-verification-copy">
                  <strong>Verification pending</strong>
                  <span>
                    Your farm will be reviewed by Farmart admin.
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="farm-setup-submit"
                disabled={isSaving}
              >
                {isSaving ? 'Saving your farm...' : 'Save & continue'}
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}

export default FarmSetup
