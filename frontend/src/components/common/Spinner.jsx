function Spinner({
  size = 'medium',
  variant = 'mint',
}) {
  return (
    <>
      <style>{`
        .farmart-spinner {
          display: inline-block;
          border-style: solid;
          border-radius: 50%;
          animation: farmart-spinner-rotate 0.8s linear infinite;
        }

        .farmart-spinner-small {
          width: 16px;
          height: 16px;
          border-width: 2px;
        }

        .farmart-spinner-medium {
          width: 22px;
          height: 22px;
          border-width: 2px;
        }

        .farmart-spinner-large {
          width: 30px;
          height: 30px;
          border-width: 3px;
        }

        .farmart-spinner-mint {
          border-color: rgba(74, 159, 123, 0.20);
          border-top-color: #4a9f7b;
        }

        .farmart-spinner-gold {
          border-color: rgba(196, 155, 53, 0.20);
          border-top-color: #c49b35;
        }

        .farmart-spinner-brown {
          border-color: rgba(111, 75, 59, 0.20);
          border-top-color: #6f4b3b;
        }

        .farmart-spinner-light {
          border-color: rgba(74, 159, 123, 0.18);
          border-top-color: #4a9f7b;
        }

        .farmart-spinner-dark {
          border-color: rgba(220, 233, 223, 0.12);
          border-top-color: #a8d8bd;
        }

        @keyframes farmart-spinner-rotate {
          to {
            transform: rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .farmart-spinner {
            animation: none;
          }
        }
      `}</style>

      <span
        className={`
          farmart-spinner
          farmart-spinner-${size}
          farmart-spinner-${variant}
        `}
        role="status"
        aria-label="Loading"
      />
    </>
  )
}

export default Spinner