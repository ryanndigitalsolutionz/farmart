import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  MapPin,
  ShoppingBag,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const FARM_TYPES = [
  'Crop farming',
  'Livestock',
  'Poultry',
  'Mixed farming',
  'Other',
]

const PRODUCT_CATEGORIES = [
  'Vegetables',
  'Fruits',
  'Cereals',
  'Dairy',
  'Eggs',
  'Poultry',
  'Livestock',
  'Herbs',
  'Other',
]

const STEPS = [
  { label: 'About your farm', icon: Home },
  { label: 'Location', icon: MapPin },
  { label: 'What you sell', icon: ShoppingBag },
  { label: 'Review', icon: Check },
]

const STORAGE_KEY = 'farmart_farmSetupDraft'

function loadDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore
  }
  return null
}

function FarmSetup() {
  const navigate = useNavigate()
  const { user, updateFarmProfile } = useAuth()

  const [step, setStep] = useState(() => {
    const draft = loadDraft()
    return draft?.step || 0
  })

  const [formData, setFormData] = useState(() => {
    const draft = loadDraft()
    return {
      farmName: draft?.farmName || '',
      farmType: draft?.farmType || '',
      county: draft?.county || '',
      town: draft?.town || '',
      detailedLocation: draft?.detailedLocation || '',
      products: draft?.products || [],
    }
  })

  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ step, ...formData })
    )
  }, [step, formData])

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const toggleProduct = (product) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.includes(product)
        ? prev.products.filter((p) => p !== product)
        : [...prev.products, product],
    }))
  }

  const canProceed = () => {
    if (step === 0) return formData.farmName.trim().length > 0
    if (step === 1) return formData.county.trim().length > 0 && formData.town.trim().length > 0
    if (step === 2) return formData.products.length > 0
    return true
  }

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1)
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep((s) => s - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSaving(true)

    const profile = {
      farmName: formData.farmName,
      farmType: formData.farmType,
      location: `${formData.town}, ${formData.county}`,
      county: formData.county,
      town: formData.town,
      detailedLocation: formData.detailedLocation,
      products: formData.products,
      verificationStatus: 'pending',
    }

    try {
      localStorage.setItem('farmartFarmProfile', JSON.stringify(profile))
      updateFarmProfile(profile)

      if (user) {
        try {
          const { api } = await import('../../api')
          await api.updateUser(user.id, {
            farmName: formData.farmName,
            location: profile.location,
          })
        } catch {
          // best-effort sync; profile still saved locally
        }
      }

      localStorage.removeItem(STORAGE_KEY)

      setTimeout(() => {
        navigate('/farmer/dashboard', { replace: true })
      }, 400)
    } finally {
      setIsSaving(false)
    }
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
          width: min(100%, 580px);
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

        .farm-setup-logo {
          width: 100%;
          max-width: 100px;
          margin: 0 auto 22px;
        }

        .farm-setup-logo img {
          width: 100%;
          height: auto;
          object-fit: contain;
          display: block;
        }

        .farm-setup-heading {
          margin: 0;
          text-align: center;
          color: var(--farm-text);
          font-family: "IBM Plex Serif", serif;
          font-size: clamp(28px, 4.5vw, 38px);
          font-weight: 700;
          line-height: 1.2;
          transition: color 180ms ease;
        }

        .farm-setup-subtitle {
          max-width: 400px;
          margin: 12px auto 28px;
          text-align: center;
          color: var(--farm-muted);
          font-size: 15px;
          line-height: 1.7;
          transition: color 180ms ease;
        }

        /* Progress */

        .farm-setup-progress {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-bottom: 34px;
        }

        .farm-setup-progress-step {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .farm-setup-progress-dot {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Modern Antiqua", serif;
          font-size: 12px;
          font-weight: 700;
          border: 1px solid var(--farm-green-border);
          background: var(--auth-input);
          color: var(--farm-muted);
          transition:
            background 180ms ease,
            border-color 180ms ease,
            color 180ms ease;
        }

        .farm-setup-progress-dot--active {
          background: var(--farm-green);
          border-color: var(--farm-green);
          color: #ffffff;
        }

        .farm-setup-progress-dot--done {
          background: var(--farm-green-soft);
          border-color: var(--farm-green);
          color: var(--farm-green);
        }

        .farm-setup-progress-line {
          width: 32px;
          height: 1px;
          background: var(--farm-green-border);
          transition: background 180ms ease;
        }

        .farm-setup-progress-line--done {
          background: var(--farm-green);
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
          box-shadow: 0 0 0 4px var(--farm-green-glow);
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
        .farm-setup-field select,
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
        .farm-setup-field textarea::placeholder,
        .farm-setup-field select {
          color: var(--farm-muted);
        }

        .farm-setup-field select {
          appearance: none;
          -webkit-appearance: none;
          cursor: pointer;
          padding-right: 20px;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2385a88f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9' /></svg>");
          background-repeat: no-repeat;
          background-position: right 0 center;
        }

        .farm-setup-field textarea {
          min-height: 78px;
          resize: vertical;
        }

        /* Chips */

        .farm-setup-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .farm-setup-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 16px;
          border-radius: 999px;
          border: 1px solid var(--farm-green-border);
          background: var(--auth-input);
          color: var(--farm-text);
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition:
            background 180ms ease,
            border-color 180ms ease,
            color 180ms ease,
            box-shadow 180ms ease;
          user-select: none;
        }

        .farm-setup-chip:hover {
          border-color: var(--farm-green);
        }

        .farm-setup-chip--active {
          background: var(--farm-green);
          border-color: var(--farm-green);
          color: #ffffff;
          box-shadow: 0 4px 12px var(--farm-green-glow);
        }

        .farm-setup-chip-check {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          border: 1px solid currentColor;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 180ms ease, border-color 180ms ease;
        }

        .farm-setup-chip--active .farm-setup-chip-check {
          background: #ffffff;
          border-color: #ffffff;
          color: var(--farm-green);
        }

        /* Review */

        .farm-setup-review {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .farm-setup-review-row {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          padding: 10px 0;
          border-bottom: 1px solid var(--farm-green-border);
        }

        .farm-setup-review-row:last-child {
          border-bottom: none;
        }

        .farm-setup-review-label {
          color: var(--farm-muted);
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .farm-setup-review-value {
          color: var(--farm-text);
          font-size: 14px;
          font-weight: 600;
          text-align: right;
        }

        /* Buttons */

        .farm-setup-actions {
          display: flex;
          gap: 12px;
          margin-top: 28px;
        }

        .farm-setup-back {
          min-height: 54px;
          padding: 0 20px;
          border-radius: 14px;
          border: 1px solid var(--farm-green-border);
          background: transparent;
          color: var(--farm-text);
          font-family: "Modern Antiqua", serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition:
            background 180ms ease,
            border-color 180ms ease;
        }

        .farm-setup-back:hover {
          background: var(--farm-green-soft);
          border-color: var(--farm-green);
        }

        .farm-setup-back:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .farm-setup-next {
          flex: 1;
          min-height: 54px;
          border-radius: 14px;
          border: none;
          background: var(--farm-green);
          color: #ffffff;
          font-family: "Modern Antiqua", serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 6px 18px var(--farm-green-glow);
          transition:
            background 180ms ease,
            box-shadow 180ms ease,
            opacity 180ms ease;
        }

        .farm-setup-next:hover:not(:disabled) {
          background: #216b3b;
          box-shadow: 0 10px 24px var(--farm-green-glow);
        }

        .farm-setup-next:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .farm-setup-submit {
          flex: 1;
          min-height: 54px;
          border-radius: 14px;
          border: none;
          background: var(--farm-green);
          color: #ffffff;
          font-family: "Modern Antiqua", serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 6px 18px var(--farm-green-glow);
          transition:
            background 180ms ease,
            box-shadow 180ms ease,
            opacity 180ms ease;
        }

        .farm-setup-submit:hover:not(:disabled) {
          background: #216b3b;
          box-shadow: 0 10px 24px var(--farm-green-glow);
        }

        .farm-setup-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .farm-setup-optional {
          color: var(--farm-muted);
          font-size: 12px;
          font-weight: 500;
          margin-top: 2px;
        }

        /* Verification */

        .farm-setup-verification {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px;
          margin-top: 18px;
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
        }

        @media (max-width: 420px) {
          .farm-setup-page {
            padding: 20px 12px;
          }

          .farm-setup-content {
            padding: 42px 20px 34px;
          }

          .farm-setup-heading {
            font-size: 28px;
          }

          .farm-setup-subtitle {
            font-size: 14px;
            margin-bottom: 28px;
          }

          .farm-setup-field {
            padding: 15px;
          }

          .farm-setup-actions {
            flex-direction: column-reverse;
          }
        }
      `}</style>

      <main className="farm-setup-page">
        <motion.section
          className="farm-setup-frame"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="farm-setup-content">

            <div className="farm-setup-logo">
              <img
                src="/favicon/farm.png"
                alt="Farmart"
              />
            </div>

            <h1 className="farm-setup-heading">Set up your farm</h1>

            <p className="farm-setup-subtitle">
              {step === 0 && "Let's start with the basics about your farm."}
              {step === 1 && "Where is your farm located?"}
              {step === 2 && "What products do you grow or raise?"}
              {step === 3 && "Review your details before finishing."}
            </p>

            {/* Progress indicator */}
            <div className="farm-setup-progress">
              {STEPS.map((s, i) => {
                const Icon = s.icon
                const isActive = i === step
                const isDone = i < step
                return (
                  <div key={i} className="farm-setup-progress-step">
                    <div
                      className={`farm-setup-progress-dot ${
                        isActive ? 'farm-setup-progress-dot--active' : ''
                      } ${isDone ? 'farm-setup-progress-dot--done' : ''}`}
                    >
                      {isDone ? <Check size={14} /> : <Icon size={14} />}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        className={`farm-setup-progress-line ${
                          isDone ? 'farm-setup-progress-line--done' : ''
                        }`}
                      />
                    )}
                  </div>
                )
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                {/* Step 1 — About Your Farm */}
                {step === 0 && (
                  <form className="farm-setup-form" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                    <label className="farm-setup-field">
                      <span className="farm-setup-field-icon">
                        <Home size={18} />
                      </span>
                      <span className="farm-setup-field-content">
                        <span className="farm-setup-field-label">Farm name <span style={{ color: 'var(--farm-error)' }}>*</span></span>
                        <input
                          type="text"
                          placeholder="e.g. Kiambu Green Pastures"
                          value={formData.farmName}
                          onChange={(e) => updateField('farmName', e.target.value)}
                          required
                        />
                      </span>
                    </label>

                    <label className="farm-setup-field">
                      <span className="farm-setup-field-icon">
                        <Home size={18} />
                      </span>
                      <span className="farm-setup-field-content">
                        <span className="farm-setup-field-label">Farm type</span>
                        <select
                          value={formData.farmType}
                          onChange={(e) => updateField('farmType', e.target.value)}
                        >
                          <option value="">Select farm type</option>
                          {FARM_TYPES.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </span>
                    </label>
                  </form>
                )}

                {/* Step 2 — Location */}
                {step === 1 && (
                  <form className="farm-setup-form" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                    <label className="farm-setup-field">
                      <span className="farm-setup-field-icon">
                        <MapPin size={18} />
                      </span>
                      <span className="farm-setup-field-content">
                        <span className="farm-setup-field-label">County <span style={{ color: 'var(--farm-error)' }}>*</span></span>
                        <input
                          type="text"
                          placeholder="e.g. Kiambu County"
                          value={formData.county}
                          onChange={(e) => updateField('county', e.target.value)}
                          required
                        />
                      </span>
                    </label>

                    <label className="farm-setup-field">
                      <span className="farm-setup-field-icon">
                        <MapPin size={18} />
                      </span>
                      <span className="farm-setup-field-content">
                        <span className="farm-setup-field-label">Town / Area <span style={{ color: 'var(--farm-error)' }}>*</span></span>
                        <input
                          type="text"
                          placeholder="e.g. Kiambu Town"
                          value={formData.town}
                          onChange={(e) => updateField('town', e.target.value)}
                          required
                        />
                      </span>
                    </label>

                    <label className="farm-setup-field">
                      <span className="farm-setup-field-icon">
                        <MapPin size={18} />
                      </span>
                      <span className="farm-setup-field-content">
                        <span className="farm-setup-field-label">Detailed location <span className="farm-setup-optional">(optional)</span></span>
                        <textarea
                          placeholder="Village, landmark, GPS coordinates..."
                          value={formData.detailedLocation}
                          onChange={(e) => updateField('detailedLocation', e.target.value)}
                          rows="3"
                        />
                      </span>
                    </label>
                  </form>
                )}

                {/* Step 3 — What Do You Sell */}
                {step === 2 && (
                  <form className="farm-setup-form" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                    <div className="farm-setup-field" style={{ alignItems: 'flex-start' }}>
                      <span className="farm-setup-field-icon" style={{ marginTop: 2 }}>
                        <ShoppingBag size={18} />
                      </span>
                      <span className="farm-setup-field-content">
                        <span className="farm-setup-field-label">Products <span style={{ color: 'var(--farm-error)' }}>*</span></span>
                        <div className="farm-setup-chips">
                          {PRODUCT_CATEGORIES.map((cat) => {
                            const active = formData.products.includes(cat)
                            return (
                              <button
                                key={cat}
                                type="button"
                                className={`farm-setup-chip ${active ? 'farm-setup-chip--active' : ''}`}
                                onClick={() => toggleProduct(cat)}
                              >
                                <span className="farm-setup-chip-check">
                                  {active && <Check size={10} />}
                                </span>
                                {cat}
                              </button>
                            )
                          })}
                        </div>
                      </span>
                    </div>
                  </form>
                )}

                {/* Step 4 — Review */}
                {step === 3 && (
                  <div className="farm-setup-review">
                    <div className="farm-setup-review-row">
                      <span className="farm-setup-review-label">Farm name</span>
                      <span className="farm-setup-review-value">{formData.farmName}</span>
                    </div>
                    {formData.farmType && (
                      <div className="farm-setup-review-row">
                        <span className="farm-setup-review-label">Farm type</span>
                        <span className="farm-setup-review-value">{formData.farmType}</span>
                      </div>
                    )}
                    <div className="farm-setup-review-row">
                      <span className="farm-setup-review-label">Location</span>
                      <span className="farm-setup-review-value">{formData.town}, {formData.county}</span>
                    </div>
                    {formData.detailedLocation && (
                      <div className="farm-setup-review-row">
                        <span className="farm-setup-review-label">Detailed</span>
                        <span className="farm-setup-review-value">{formData.detailedLocation}</span>
                      </div>
                    )}
                    <div className="farm-setup-review-row">
                      <span className="farm-setup-review-label">Products</span>
                      <span className="farm-setup-review-value">{formData.products.join(', ')}</span>
                    </div>

                    <div className="farm-setup-verification">
                      <div className="farm-setup-verification-icon">
                        <Check size={18} />
                      </div>
                      <div className="farm-setup-verification-copy">
                        <strong>Ready to submit</strong>
                        <span>
                          Your farm details will be saved and you'll be taken to the Farmer Dashboard.
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Actions */}
            <div className="farm-setup-actions">
              {step > 0 && (
                  <button
                    type="button"
                    className="farm-setup-back"
                    onClick={handleBack}
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
              )}

              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  className="farm-setup-next"
                  onClick={handleNext}
                  disabled={!canProceed()}
                >
                  Continue <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  className="farm-setup-submit"
                  onClick={handleSubmit}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Go to Farmer Dashboard'}
                </button>
              )}
            </div>

          </div>
        </motion.section>
      </main>
    </>
  )
}

export default FarmSetup