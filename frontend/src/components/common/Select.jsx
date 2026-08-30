function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  error = '',
  disabled = false,
  required = false,
  className = '',
  ...props
}) {
  return (
    <>
      <style>{`
        .farmart-select-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .farmart-select-label {
          color: #385442;
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
          font-weight: 600;
        }

        .farmart-select {
          width: 100%;
          min-height: 48px;
          box-sizing: border-box;

          padding: 0 15px;

          border: 1px solid #d2dfd5;
          border-radius: 12px;

          background: #ffffff;
          color: #405448;

          font-family: "Modern Antiqua", serif;
          font-size: 14px;

          outline: none;
          cursor: pointer;

          transition:
            border-color 180ms ease,
            box-shadow 180ms ease;
        }

        .farmart-select:hover:not(:disabled) {
          border-color: #b8ccb9;
        }

        .farmart-select:focus {
          border-color: #4a9f7b;
          box-shadow:
            0 0 0 3px rgba(74, 159, 123, 0.12);
        }

        .farmart-select:disabled {
          cursor: not-allowed;
          opacity: 0.55;
          background: #eef3ef;
        }

        .farmart-select-error {
          border-color: #b96557;
        }

        .farmart-select-error:focus {
          border-color: #b96557;
          box-shadow:
            0 0 0 3px rgba(185, 101, 87, 0.12);
        }

        .farmart-select-error-text {
          margin: 0;
          color: #a05246;
          font-family: "Modern Antiqua", serif;
          font-size: 12px;
        }
      `}</style>

      <div className={`farmart-select-wrapper ${className}`}>

        {label && (
          <label
            htmlFor={name}
            className="farmart-select-label"
          >
            {label}
            {required && ' *'}
          </label>
        )}

        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`
            farmart-select
            ${error ? 'farmart-select-error' : ''}
          `}
          {...props}
        >
          <option value="">
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <p className="farmart-select-error-text">
            {error}
          </p>
        )}

      </div>
    </>
  )
}

export default Select