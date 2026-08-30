function ConfirmDialog({
  isOpen,
  title = 'Are you sure?',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'danger',
}) {
  if (!isOpen) {
    return null
  }

  return (
    <>
      <style>{`
        .farmart-confirm-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 20px;

          background: rgba(20, 35, 26, 0.38);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }

        .farmart-confirm-dialog {
          width: min(100%, 430px);
          padding: 30px;

          border: 1px solid rgba(255, 255, 255, 0.65);
          border-radius: 22px;

          background: rgba(255, 255, 255, 0.92);

          box-shadow:
            0 24px 70px rgba(25, 52, 34, 0.20),
            inset 0 1px 0 rgba(255, 255, 255, 0.80);

          box-sizing: border-box;
        }

        .farmart-confirm-title {
          margin: 0;

          color: #17351f;

          font-family: "IBM Plex Serif", serif;
          font-size: 25px;
          font-weight: 700;
          line-height: 1.2;
        }

        .farmart-confirm-message {
          margin: 14px 0 0;

          color: #68766d;

          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          line-height: 1.7;
        }

        .farmart-confirm-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;

          margin-top: 28px;
        }

        .farmart-confirm-button {
          min-height: 44px;
          padding: 0 17px;

          border-radius: 11px;

          font-family: "Modern Antiqua", serif;
          font-size: 13px;
          font-weight: 600;

          cursor: pointer;

          transition:
            background 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease,
            color 180ms ease;
        }

        .farmart-confirm-cancel {
          border: 1px solid #d2ded5;
          background: #f7faf8;
          color: #506258;

          box-shadow:
            3px 3px 8px rgba(42, 65, 50, 0.08),
            -3px -3px 8px rgba(255, 255, 255, 0.9);
        }

        .farmart-confirm-cancel:hover {
          border-color: #b9cbbd;
          background: #ffffff;
        }

        .farmart-confirm-danger {
          border: 1px solid #a95a4c;
          background: linear-gradient(
            135deg,
            #c87565,
            #a95647
          );
          color: #ffffff;

          box-shadow:
            0 7px 16px rgba(169, 86, 71, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.20);
        }

        .farmart-confirm-danger:hover {
          background: linear-gradient(
            135deg,
            #d18170,
            #b66050
          );
        }

        .farmart-confirm-primary {
          border: 1px solid #4a9f7b;
          background: linear-gradient(
            135deg,
            #72c9a3,
            #4a9f7b
          );
          color: #ffffff;

          box-shadow:
            0 7px 16px rgba(74, 159, 123, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.25);
        }

        .farmart-confirm-primary:hover {
          background: linear-gradient(
            135deg,
            #82d4af,
            #55aa85
          );
        }

        @media (max-width: 500px) {
          .farmart-confirm-dialog {
            padding: 24px;
          }

          .farmart-confirm-actions {
            flex-direction: column-reverse;
          }

          .farmart-confirm-button {
            width: 100%;
          }
        }
      `}</style>

      <div
        className="farmart-confirm-overlay"
        role="presentation"
        onMouseDown={onCancel}
      >
        <section
          className="farmart-confirm-dialog"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="farmart-confirm-title"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <h2
            id="farmart-confirm-title"
            className="farmart-confirm-title"
          >
            {title}
          </h2>

          {message && (
            <p className="farmart-confirm-message">
              {message}
            </p>
          )}

          <div className="farmart-confirm-actions">

            <button
              type="button"
              className="farmart-confirm-button farmart-confirm-cancel"
              onClick={onCancel}
            >
              {cancelText}
            </button>

            <button
              type="button"
              className={`
                farmart-confirm-button
                farmart-confirm-${variant}
              `}
              onClick={onConfirm}
            >
              {confirmText}
            </button>

          </div>
        </section>
      </div>
    </>
  )
}

export default ConfirmDialog
