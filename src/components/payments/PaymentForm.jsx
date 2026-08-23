import React, { useState } from 'react'

function PaymentForm({ order, onPay}) {
  const [phone, setphone] = useState("");
  const [error, setError] = useState("");
  const [processing, setprocessing] = useState(false);
  const [message, setMessage] = useState("")

  

  const handleSubmit = (e) => {
    e.preventDefault();
    

    if(!phone.trim()) {
      setError("Please enter your M-pesa number.")
      return;
    }

    const phoneRegex = /^07\d{8}$/;

    if (!phoneRegex.test(phone.trim())) {
      setError("Please enter a valid Mpesa number.");
      return;
    }

    setError("");
    setprocessing(true);

    setTimeout(() => {
      setMessage("Payment request sent. \nPlease complete the M-Pesa prompt on your phone.")
      onPay(phone);
    }, 500);
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='mt-4'>
        <h2>Payment</h2>
        <p>
          Pay Ksh {Number(order.total).toLocaleString()}
        </p>
        <label>
          M-Pesa Phone Number

          <input 
            type="text" 
            value={phone} 
            onChange={(e) => setphone(e.target.value)}
            placeholder="07xxxxxxxx" 
            className='border p-1 block mt-1 mb-1'
          />
        </label>

        {error && <p>{error}</p>}
        {message && (
          <p className='whitespace-pre-line'>
            {message}
          </p>
        )}

        <button
          type='submit'
          disabled={processing}
          className='bg-green-500 p-2 rounded-lg'
        >
          {processing
            ? "Processing Payment..."
            : `Pay ksh ${Number(order.total).toLocaleString()}`
          }
        </button>
      </form>
       
    </div>
  )
}

export default PaymentForm;