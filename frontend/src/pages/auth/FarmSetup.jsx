import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FiMapPin,
  FiPhone,
  FiHome,
  FiEdit3,
  FiShield,
} from 'react-icons/fi'

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
              var(--farm-green-glow),
              transparent 45%
            ),
            var(--farm-background);

          color: var(--farm-text);
          font-family: "Modern Antiqua", serif;

          transition:
            background 180ms ease,
            color 180ms ease;
        }

        .farm-setup-frame {
          width: min(100%, 560px);
          position: relative;
          overflow: hidden;

          background: var(--auth-card);
          border: 1px solid var(--farm-green-border);
          border-radius: 30px;

          box-shadow:
            0 28px 75px var(--farm-green-glow),
            0 5px 18px var(--farm-green-glow);

          transition:
            background 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease;
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

          background: var(--farm-green);
        }

        .farm-setup-content {
          padding: 62px 60px 54px;
        }

        /* Farmart logo */

        .farm-setup-logo {
          width: min(100%, 300px);
          min-height: 100px;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 14px 22px;
          margin: 0 auto 30px;

          box-sizing: border-box;

          border: 1px solid var(--farm-green-border);
          border-radius: 20px;

          background: var(--auth-logo-bg);

          transition:
            background 180ms ease,
            border-color 180ms ease;
        }

        .farm-setup-logo img {
          width: 100%;
          height: 100px;
          object-fit: contain;
          display: block;
        }

        /* Heading */

        .farm-setup-heading {
          margin: 0;

          text-align: center;

          color: var(--farm-text);

          font-family: "IBM Plex Serif", serif;
          font-size: clamp(32px, 5vw, 42px);
          font-weight: 700;
          line-height: 1.15;

          transition: color 180ms ease;
        }

        .farm-setup-subtitle {
          max-width: 410px;

          margin: 18px auto 42px;

          text-align: center;

          color: var(--farm-muted);

          font-size: 16px;
          line-height: 1.7;

          transition: color 180ms ease;
        }

        /* Form */

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

          border: 1px solid var(--farm-green-border);
          border-radius: 16px;

          background: var(--auth-input);

          transition:
            border-color 180ms ease,
            background 180ms ease,
            box-shadow 180ms ease;
        }

        .farm-setup-field:focus-within {
          border-color: var(--farm-green);
          background: var(--auth-input-focus);

          box-shadow:
            0 0 0 4px var(--farm-green-glow);
        }

        .farm-setup-field-icon {
          width: 23px;
          height: 23px;

          flex-shrink: 0;

          margin-top: 4px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: var(--farm-green);
        }

        .farm-setup-field-content {
          min-width: 0;
          flex: 1;

          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .farm-setup-field-label {
          color: var(--farm-text);

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

          color: var(--farm-text);

          font-family: "Modern Antiqua", serif;
          font-size: 15px;
          line-height: 1.6;
        }

        .farm-setup-field input::placeholder,
        .farm-setup-field textarea::placeholder {
          color: var(--farm-muted);
        }

        .farm-setup-field textarea {
          min-height: 78px;
          resize: vertical;
        }

        /* Divider */

        .farm-setup-divider {
          width: 100%;
          height: 1px;

          margin: 8px 0 2px;

          background: var(--farm-green-border);
        }

        /* Verification */

        .farm-setup-verification {
          display: flex;
          align-items: center;

          gap: 14px;
          padding: 16px;

          border: 1px solid var(--farm-green-border);
          border-radius: 15px;

          background: var(--farm-green-soft);

          transition:
            background 180ms ease,
            border-color 180ms ease;
        }

        .farm-setup-verification-icon {
          width: 40px;
          height: 40px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 11px;

          background: var(--farm-green-glow);
          color: var(--farm-green);
        }

        .farm-setup-verification-copy {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .farm-setup-verification-copy strong {
          color: var(--farm-text);

          font-size: 14px;
          font-weight: 700;
        }

        .farm-setup-verification-copy span {
          color: var(--farm-muted);

          font-size: 13px;
          line-height: 1.5;
        }

        /* Submit */

        .farm-setup-submit {
          width: 100%;
          min-height: 58px;

          margin-top: 5px;

          border: none;
          border-radius: 15px;

          background: var(--farm-green);
          color: #ffffff;

          font-family: "Modern Antiqua", serif;
          font-size: 16px;
          font-weight: 700;

          cursor: pointer;

          box-shadow:
            0 9px 22px var(--farm-green-glow);

          transition:
            transform 180ms ease,
            background 180ms ease,
            box-shadow 180ms ease;
        }

        .farm-setup-submit:hover:not(:disabled) {
          background: var(--farm-green-dark);

          transform: translateY(-2px);

          box-shadow:
            0 13px 28px var(--farm-green-glow);
        }

        .farm-setup-submit:active:not(:disabled) {
          transform: translateY(0);
        }

        .farm-setup-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        /* Responsive */

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

          .farm-setup-logo {
            min-height: 82px;
            padding: 10px 18px;
          }

          .farm-setup-logo img {
            height: 82px;
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

          .farm-setup-logo {
            min-height: 76px;
          }

          .farm-setup-logo img {
            height: 76px;
          }
        }
      `}</style>

      <main className="farm-setup-page">
        <section className="farm-setup-frame">
          <div className="farm-setup-content">
            <div className="farm-setup-logo">
              <img
                src="/logo/farmart_full_logo_testing.png"
                alt="Farmart"
              />
            </div>

            <h1 className="farm-setup-heading">Set up your farm</h1>

            <p className="farm-setup-subtitle">
              Tell buyers a little about your farm before you start selling.
            </p>

            <form onSubmit={handleSubmit} className="farm-setup-form">
              <label className="farm-setup-field">
                <span className="farm-setup-field-icon">
                  <FiHome size={18} />
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
                  <FiMapPin size={18} />
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
                  <FiPhone size={18} />
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
                  <FiEdit3 size={18} />
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
                  <FiShield size={18} />
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
