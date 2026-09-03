import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'

function RejectReasonModal({ farmerName, onCancel, onSubmit }) {
  const [reason, setReason] = useState('')
  const { isDark } = useTheme()

  const colors = isDark
    ? {
        cardBg: '#0d130f',
        text: '#edf4ee',
        muted: '#9fb3a6',
        border: '#2a3a2f',
        inputBg: '#141c17',
      }
    : {
        cardBg: '#ffffff',
        text: '#1E2A1F',
        muted: '#66766A',
        border: '#DCE6D8',
        inputBg: '#f7faf7',
      }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!reason.trim()) return
    onSubmit(reason.trim())
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(90%, 420px)',
          background: colors.cardBg,
          border: `1px solid ${colors.border}`,
          borderRadius: 16,
          padding: 24,
          boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
        }}
      >
        <h3
          style={{
            margin: '0 0 6px',
            fontSize: 17,
            fontWeight: 700,
            color: colors.text,
          }}
        >
          Reject {farmerName}?
        </h3>
        <p
          style={{
            margin: '0 0 16px',
            fontSize: 13,
            color: colors.muted,
            lineHeight: 1.5,
          }}
        >
          This message will be shown to the farmer so they know why.
        </p>

        <form onSubmit={handleSubmit}>
          <textarea
            autoFocus
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Farm location could not be verified. Please provide a more specific address."
            rows={4}
            required
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: 12,
              borderRadius: 10,
              border: `1px solid ${colors.border}`,
              background: colors.inputBg,
              color: colors.text,
              fontFamily: 'inherit',
              fontSize: 13.5,
              resize: 'vertical',
              marginBottom: 16,
            }}
          />

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                background: colors.cardBg,
                color: colors.text,
                border: `1.4px solid ${colors.border}`,
                borderRadius: 8,
                padding: '9px 16px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                background: '#B2503E',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '9px 16px',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Reject farmer
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RejectReasonModal