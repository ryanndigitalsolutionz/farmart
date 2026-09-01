function Loader({
  message = 'Loading Farmart...',
}) {
  return (
    <>
      <style>{`
        .farmart-loader {
          min-height: 280px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 18px;
          padding: 40px 20px;
          box-sizing: border-box;
        }

        .farmart-loader-mark {
          width: 58px;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;

          background: linear-gradient(
            135deg,
            #72c9a3,
            #4a9f7b
          );

          box-shadow:
            0 10px 24px rgba(74, 159, 123, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.30);
        }

        .farmart-loader-mark img {
          width: 38px;
          height: 38px;
          object-fit: contain;
        }

        .farmart-loader-ring {
          width: 22px;
          height: 22px;
          border: 2px solid rgba(74, 159, 123, 0.20);
          border-top-color: #4a9f7b;
          border-radius: 50%;
          animation: farmart-loader-spin 0.8s linear infinite;
        }

        .farmart-loader-message {
          margin: 0;
          color: #63746a;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          text-align: center;
        }

        @keyframes farmart-loader-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .farmart-loader-ring {
            animation: none;
          }
        }
      `}</style>

      <div
        className="farmart-loader"
        role="status"
        aria-live="polite"
      >
        <div className="farmart-loader-mark">
          <img
            src="/logo/farmart_logo.png"
            alt=""
            aria-hidden="true"
          />
        </div>

        <div className="farmart-loader-ring" />

        <p className="farmart-loader-message">
          {message}
        </p>
      </div>
    </>
  )
}

export default Loader
