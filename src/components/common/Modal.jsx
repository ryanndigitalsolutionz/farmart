function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
}) {
  if (!isOpen) {
    return null
  }

  return (
    <>
      <style>{`
        .farmart-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 20px;

          background: rgba(20, 35, 26, 0.40);

          backdrop-filter: blur(7px);
          -webkit-backdrop-filter: blur(7px);
        }

        .farmart-modal {
          width: 100%;
          max-height: calc(100vh - 40px);

          display: flex;
          flex-direction: column;

          overflow: hidden;

          border: 1px solid rgba(255, 255, 255, 0.65);
          border-radius: 22px;

          background: rgba(255, 255, 255, 0.94);

          box-shadow:
            0 25px 75px rgba(25, 52, 34, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.85);
        }

        .farmart-modal-small {
          max-width: 380px;
        }

        .farmart-modal-medium {
          max-width: 560px;
        }

        .farmart-modal-large {
          max-width: 820px;
        }

        .farmart-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;

          padding: 20px 22px;

          border-bottom: 1px solid #e0e8e2;
        }

        .farmart-modal-title {
          margin: 0;

          color: #17351f;

          font-family: "IBM Plex Serif", serif;
          font-size: 22px;
          font-weight: 700;
        }

        .farmart-modal-close {
          width: 36px;
          height: 36px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border: 1px solid #d6e1d8;
          border-radius: 10px;

          background: #f5f8f5;
          color: #55705e;

          font-size: 20px;
          line-height: 1;

          cursor: pointer;

          transition:
            background 180ms ease,
            border-color 180ms ease,
            color 180ms ease;
        }

        .farmart-modal-close:hover {
          border-color: #b8ccb9;
          background: #ffffff;
          color: #277a44;
        }

        .farmart-modal-content {
          overflow-y: auto;

          padding: 24px;

          color: #405448;

          font-family: "Modern Antiqua", serif;
        }

        @media (max-width: 600px) {
          .farmart-modal-overlay {
            padding: 12px;
          }

          .farmart-modal {
            max-height: calc(100vh - 24px);
            border-radius: 18px;
          }

          .farmart-modal-header {
            padding: 17px 18px;
          }

          .farmart-modal-content {
            padding: 20px 18px;
          }
        }
      `}</style>

      <div
        className="farmart-modal-overlay"
        onMouseDown={onClose}
      >
        <section
          className={`
            farmart-modal
            farmart-modal-${size}
          `}
          role="dialog"
          aria-modal="true"
          aria-labelledby="farmart-modal-title"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <header className="farmart-modal-header">

            <h2
              id="farmart-modal-title"
              className="farmart-modal-title"
            >
              {title}
            </h2>

            <button
              type="button"
              className="farmart-modal-close"
              onClick={onClose}
              aria-label="Close modal"
            >
              ×
            </button>

          </header>

          <div className="farmart-modal-content">
            {children}
          </div>

        </section>
      </div>
    </>
  )
}

export default Modal