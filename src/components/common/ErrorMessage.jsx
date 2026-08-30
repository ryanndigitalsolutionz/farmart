function ErrorMessage({
  message,
  title = 'Something went wrong',
}) {
  if (!message) {
    return null
  }

  return (
    <>
      <style>{`
        .farmart-error {
          width: 100%;
          display: flex;
          align-items: flex-start;
          gap: 12px;

          padding: 13px 15px;

          border: 1px solid #e4b9b1;
          border-radius: 12px;

          background: rgba(193, 91, 74, 0.07);
          color: #8f493e;

          font-family: "Modern Antiqua", serif;

          box-sizing: border-box;
        }

        .farmart-error-icon {
          width: 22px;
          height: 22px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border-radius: 50%;

          background: #b96557;
          color: #ffffff;

          font-family: "IBM Plex Serif", serif;
          font-size: 13px;
          font-weight: 700;
        }

        .farmart-error-content {
          min-width: 0;
        }

        .farmart-error-title {
          margin: 0;

          color: #7f4037;

          font-family: "IBM Plex Serif", serif;
          font-size: 14px;
          font-weight: 700;
        }

        .farmart-error-message {
          margin: 3px 0 0;

          color: #87534b;

          font-size: 13px;
          line-height: 1.55;
        }
      `}</style>

      <div
        className="farmart-error"
        role="alert"
      >
        <span
          className="farmart-error-icon"
          aria-hidden="true"
        >
          !
        </span>

        <div className="farmart-error-content">

          <p className="farmart-error-title">
            {title}
          </p>

          <p className="farmart-error-message">
            {message}
          </p>

        </div>
      </div>
    </>
  )
}

export default ErrorMessage
