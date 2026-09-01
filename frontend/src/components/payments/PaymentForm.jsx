import { useState } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'
import ErrorMessage from '../common/ErrorMessage'
import Spinner from '../common/Spinner'

function PaymentForm({
  amount,
  onPaymentStart,
  isLoading = false,
  error = '',
}) {
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!phoneNumber.trim()) {
      return
    }

    onPaymentStart?.({
      phoneNumber: phoneNumber.trim(),
      amount,
    })
  }

  return (
    <>
      <style>{`
        .farmart-payment-form {
          width: 100%;
          padding: 24px;

          border: 1px solid #d5e1d8;
          border-radius: 18px;

          background: #ffffff;

          box-sizing: border-box;
        }

        .farmart-payment-form-title {
          margin: 0 0 7px;

          color: #284533;

          font-family: "IBM Plex Serif", serif;
          font-size: 21px;
          font-weight: 700;
        }

        .farmart-payment-form-description {
          margin: 0 0 22px;

          color: #718078;

          font-family: "Modern Antiqua", serif;
          font-size: 13px;
          line-height: 1.6;
        }

        .farmart-payment-form-method {
          display: flex;
          align-items: center;
          gap: 10px;

          margin-bottom: 20px;
          padding: 13px 15px;

          border: 1px solid #d8e4db;
          border-radius: 12px;

          background: #f5faf6;

          color: #47705a;

          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          font-weight: 600;
        }

        .farmart-payment-form-method-dot {
          width: 9px;
          height: 9px;

          border-radius: 50%;
          background: #4a9f7b;

          box-shadow:
            0 0 0 4px rgba(74, 159, 123, 0.12);
        }

        .farmart-payment-form-button {
          width: 100%;
          margin-top: 20px;
        }

        .farmart-payment-loading {
          display: inline-flex;
          align-items: center;
          gap: 9px;
        }
      `}</style>

      <form
        className="farmart-payment-form"
        onSubmit={handleSubmit}
      >

        <h2 className="farmart-payment-form-title">
          M-Pesa Payment
        </h2>

        <p className="farmart-payment-form-description">
          Enter the M-Pesa number that will receive
          the payment prompt.
        </p>

        <div className="farmart-payment-form-method">
          <span className="farmart-payment-form-method-dot" />
          Pay with M-Pesa
        </div>

        {error && (
          <ErrorMessage message={error} />
        )}

        <Input
          label="M-Pesa Phone Number"
          name="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={(event) =>
            setPhoneNumber(event.target.value)
          }
          placeholder="e.g. 0712345678"
          disabled={isLoading}
          required
        />

        <Button
          type="submit"
          variant="mint"
          size="large"
          fullWidth
          disabled={isLoading || !phoneNumber.trim()}
          className="farmart-payment-form-button"
        >
          {isLoading ? (
            <span className="farmart-payment-loading">
              <Spinner size="small" variant="light" />
              Processing...
            </span>
          ) : (
            `Pay KES ${Number(amount || 0).toLocaleString()}`
          )}
        </Button>

      </form>
    </>
  )
}

export default PaymentForm// commit 53
