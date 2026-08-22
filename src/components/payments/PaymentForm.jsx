import React from 'react'

function PaymentForm({ onPay}) {
  return (
    <div>

        <button
        type='button'
        onClick={onPay}
        className='bg-green-500 p-2 rounded-lg'
        >
            Pay Now
        </button>
    </div>
  )
}

export default PaymentForm;