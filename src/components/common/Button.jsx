function Button({
  children,
  variant = 'mint',
  size = 'medium',
  fullWidth = false,
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  ...props
}) {
  return (
    <>
      <style>{`
        .farmart-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;

          min-height: 48px;
          padding: 0 20px;

          border: 1px solid transparent;
          border-radius: 14px;

          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          font-weight: 600;
          line-height: 1;

          cursor: pointer;
          user-select: none;

          transition:
            background 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease,
            color 180ms ease,
            opacity 180ms ease;
        }

        .farmart-button:disabled {
          cursor: not-allowed;
          opacity: 0.5;
          box-shadow: none;
        }

        .farmart-button-mint {
          border-color: #4a9f7b;

          background: linear-gradient(
            135deg,
            #72c9a3,
            #4a9f7b
          );

          color: #ffffff;

          box-shadow:
            0 8px 18px rgba(74, 159, 123, 0.20),
            inset 0 1px 0 rgba(255, 255, 255, 0.28);
        }

        .farmart-button-mint:hover:not(:disabled) {
          background: linear-gradient(
            135deg,
            #82d4af,
            #55aa85
          );

          box-shadow:
            0 10px 25px rgba(74, 159, 123, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.32);
        }

        .farmart-button-gold {
          border-color: #c49b35;

          background: linear-gradient(
            135deg,
            #e6c65c,
            #c49b35
          );

          color: #3b2a17;

          box-shadow:
            0 8px 18px rgba(196, 155, 53, 0.20),
            inset 0 1px 0 rgba(255, 255, 255, 0.32);
        }

        .farmart-button-gold:hover:not(:disabled) {
          background: linear-gradient(
            135deg,
            #efd36d,
            #d1a943
          );

          box-shadow:
            0 10px 25px rgba(196, 155, 53, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.36);
        }

        .farmart-button-brown {
          border-color: #795548;

          background: linear-gradient(
            135deg,
            #96705d,
            #6f4b3b
          );

          color: #ffffff;

          box-shadow:
            0 8px 18px rgba(111, 75, 59, 0.20),
            inset 0 1px 0 rgba(255, 255, 255, 0.16);
        }

        .farmart-button-brown:hover:not(:disabled) {
          background: linear-gradient(
            135deg,
            #a17a66,
            #7b5442
          );

          box-shadow:
            0 10px 25px rgba(111, 75, 59, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.18);
        }

        .farmart-button-glass {
          border-color: rgba(255, 255, 255, 0.55);

          background: rgba(255, 255, 255, 0.38);

          color: #315b47;

          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);

          box-shadow:
            0 8px 24px rgba(52, 75, 61, 0.10),
            inset 0 1px 0 rgba(255, 255, 255, 0.70);
        }

        .farmart-button-glass:hover:not(:disabled) {
          border-color: rgba(74, 159, 123, 0.35);

          background: rgba(255, 255, 255, 0.55);

          box-shadow:
            0 10px 28px rgba(52, 75, 61, 0.13),
            inset 0 1px 0 rgba(255, 255, 255, 0.80);
        }

        .farmart-button-light {
          border-color: #d7e3da;

          background: #f4f8f5;

          color: #47745c;

          box-shadow:
            6px 6px 13px rgba(62, 87, 69, 0.13),
            -6px -6px 13px rgba(255, 255, 255, 0.95),
            inset 1px 1px 0 rgba(255, 255, 255, 0.80);
        }

        .farmart-button-light:hover:not(:disabled) {
          border-color: #c6d8ca;

          background: #f7faf8;

          box-shadow:
            4px 4px 10px rgba(62, 87, 69, 0.12),
            -4px -4px 10px rgba(255, 255, 255, 0.90),
            inset 1px 1px 0 rgba(255, 255, 255, 0.75);
        }

        .farmart-button-dark {
          border-color: #39483e;

          background: #252e28;

          color: #dce9df;

          box-shadow:
            7px 7px 14px rgba(0, 0, 0, 0.40),
            -5px -5px 11px rgba(255, 255, 255, 0.035),
            inset 1px 1px 0 rgba(255, 255, 255, 0.045);
        }

        .farmart-button-dark:hover:not(:disabled) {
          border-color: #46594b;

          background: #2b362f;

          box-shadow:
            5px 5px 12px rgba(0, 0, 0, 0.43),
            -4px -4px 9px rgba(255, 255, 255, 0.03),
            inset 1px 1px 0 rgba(255, 255, 255, 0.055);
        }

        .farmart-button-outline {
          border-color: #4a9f7b;

          background: transparent;

          color: #39775a;
        }

        .farmart-button-outline:hover:not(:disabled) {
          background: rgba(74, 159, 123, 0.08);

          border-color: #3d8d6b;
        }

        .farmart-button:active:not(:disabled) {
          box-shadow:
            inset 3px 3px 7px rgba(0, 0, 0, 0.14);
        }

        .farmart-button-small {
          min-height: 40px;
          padding: 0 15px;
          border-radius: 11px;
          font-size: 13px;
        }

        .farmart-button-medium {
          min-height: 48px;
          padding: 0 20px;
        }

        .farmart-button-large {
          min-height: 56px;
          padding: 0 26px;
          border-radius: 16px;
          font-size: 15px;
        }

        .farmart-button-full {
          width: 100%;
        }

        @media (max-width: 600px) {
          .farmart-button-large {
            min-height: 53px;
            padding: 0 22px;
          }
        }
      `}</style>

      <button
        type={type}
        className={`
          farmart-button
          farmart-button-${variant}
          farmart-button-${size}
          ${fullWidth ? 'farmart-button-full' : ''}
          ${className}
        `}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    </>
  )
}

export default Button
