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
      <form
        className="box-border w-full rounded-[18px] border border-[#d5e1d8] bg-white p-6"
        onSubmit={handleSubmit}
      >

        <h2 className="mb-[7px] mt-0 font-serif text-[21px] font-bold text-[#284533]">
          M-Pesa Payment
        </h2>

        <p className="mb-[22px] mt-0 font-serif text-[13px] leading-[1.6] text-[#718078]">
          Enter the M-Pesa number that will receive
          the payment prompt.
        </p>

        <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-[#d8e4db] bg-[#f5faf6] px-[15px] py-[13px] font-serif text-sm font-semibold text-[#47705a]">
          <span className="h-[9px] w-[9px] rounded-full bg-[#4a9f7b] shadow-[0_0_0_4px_rgba(74,159,123,0.12)]" />
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
          className="mt-5 w-full"
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-[9px]">
              <Spinner size="small" variant="light" />
              Processing...
            </span>
          ) : (
            `Pay KES ${Number(amount || 0).toLocaleString()}`
          )}
        </Button>

      </form>
  )
}

export default PaymentForm
