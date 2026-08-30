function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  disabled = false,
  required = false,
  className = '',
  ...props
}) {
  return (
    <>
      <style>{`
        .farmart-input-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .farmart-input-label {
          color: #385442;
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
          font-weight: 600;
        }

        .farmart-input {
          width: 100%;
          min-height: 48px;
          box-sizing: border-box;

          padding: 0 15px;

          border: 1px solid #d2dfd5;
          border-radius: 12px;

          background: #ffffff;
          color: #263b2d;

          font-family: "Modern Antiqua", serif;
          font-size: 14px;

          outline: none;

          transition:
            border-color 180ms ease,
            box-shadow 180ms ease,
            background 180ms ease;
        }

        .farmart-input::placeholder {
          color: #9aa79e;
        }

        .farmart-input:hover:not(:disabled) {
          border-color: #b8ccb9;
        }

        .farmart-input:focus {
          border-color: #4a9f7b;

          box-shadow:
            0 0 0 3px rgba(74, 159, 123, 0.12),
            inset 0 1px 2px rgba(39, 75, 52, 0.04);
        }

        .farmart-input:disabled {
          cursor: not-allowed;
          opacity: 0.55;
          background: #eef3ef;
        }

        .farmart-input-error {
          border-color: #b96557;
        }

        .farmart-input-error:focus {
          border-color: #b96557;

          box-shadow:
            0 0 0 3px rgba(185, 101, 87, 0.12);
        }

        .farmart-input-error-text {
          margin: 0;

          color: #a05246;

          font-family: "Modern Antiqua", serif;
          font-size: 12px;
          line-height: 1.5;
        }
      `}</style>

      <div className={`farmart-input-wrapper ${className}`}>

        {label && (
          <label
            htmlFor={name}
            className="farmart-input-label"
          >
            {label}
            {required && ' *'}
          </label>
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
            farmart-input
            ${error ? 'farmart-input-error' : ''}
          `}
          {...props}
        />

        {error && (
          <p className="farmart-input-error-text">
            {error}
          </p>
        )}

      </div>
    </>
  )
}

export default Input