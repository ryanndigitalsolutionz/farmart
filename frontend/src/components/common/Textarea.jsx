function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  error = '',
  disabled = false,
  required = false,
  rows = 5,
  className = '',
  ...props
}) {
  return (
    <>
      <style>{`
        .farmart-textarea-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .farmart-textarea-label {
          color: #385442;
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
          font-weight: 600;
        }

        .farmart-textarea {
          width: 100%;
          min-height: 120px;
          box-sizing: border-box;

          padding: 13px 15px;

          border: 1px solid #d2dfd5;
          border-radius: 12px;

          background: #ffffff;
          color: #263b2d;

          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          line-height: 1.6;

          outline: none;
          resize: vertical;

          transition:
            border-color 180ms ease,
            box-shadow 180ms ease;
        }

        .farmart-textarea::placeholder {
          color: #9aa79e;
        }

        .farmart-textarea:hover:not(:disabled) {
          border-color: #b8ccb9;
        }

        .farmart-textarea:focus {
          border-color: #4a9f7b;

          box-shadow:
            0 0 0 3px rgba(74, 159, 123, 0.12),
            inset 0 1px 2px rgba(39, 75, 52, 0.04);
        }

        .farmart-textarea:disabled {
          cursor: not-allowed;
          opacity: 0.55;
          background: #eef3ef;
        }

        .farmart-textarea-error {
          border-color: #b96557;
        }

        .farmart-textarea-error:focus {
          border-color: #b96557;

          box-shadow:
            0 0 0 3px rgba(185, 101, 87, 0.12);
        }

        .farmart-textarea-error-text {
          margin: 0;

          color: #a05246;

          font-family: "Modern Antiqua", serif;
          font-size: 12px;
          line-height: 1.5;
        }
      `}</style>

      <div className={`farmart-textarea-wrapper ${className}`}>

        {label && (
          <label
            htmlFor={name}
            className="farmart-textarea-label"
          >
            {label}
            {required && ' *'}
          </label>
        )}

        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          rows={rows}
          className={`
            farmart-textarea
            ${error ? 'farmart-textarea-error' : ''}
          `}
          {...props}
        />

        {error && (
          <p className="farmart-textarea-error-text">
            {error}
          </p>
        )}

      </div>
    </>
  )
}

export default Textarea// commit 8
