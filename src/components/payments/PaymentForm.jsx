import { useState } from 'react';
import { Link } from 'react-router-dom';

function PaymentForm({ order, onPay}) {
  const [phone, setphone] = useState("");
  const [error, setError] = useState("");
  const [processing, setprocessing] = useState(false);
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)  
  const [paymentMethod, setPaymentmethod] = useState("mpesa")

  const handleSubmit = (e) => {
    e.preventDefault();

    // change after bank card validation
    if(paymentMethod !== "mpesa") {
      setError("Only M-Pesa payments are available");
      return;
    }
    

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
      setMessage(
        "Payment request sent. \nPlease complete the M-Pesa prompt on your phone.")
     
      setSubmitted(true);
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
          Payment Method
          <select 
            value={paymentMethod}
            onChange={(e) => setPaymentmethod(e.target.value)}
            className='border p-2 block mt-1 mb-3'
          >
            <option value="mpesa">Mpesa</option>
            <option value="card">Card</option>
            <option value="bank">Bank Transfer</option>

          </select>
        </label>

        {paymentMethod === "mpesa" && ( 
            <label>
              M-Pesa Phone Number

              <input 
                type="text" 
                value={phone} 
                onChange={(e) => setphone(e.target.value)}
                placeholder="07xxxxxxxx" 
                className='border p-1 block mt-1 mb-3'
              />
            </label>)
        }
        {paymentMethod === "card" && ( 
          <div className='card'>
            <label>
              Card Number

              <input 
                type="text" 
                placeholder="1234 5678 9012 3456" 
                className='border p-1 block mt-1 mb-2'
              />
            </label>

            <label>
              Expiry Date
              <input 
              type="text" 
              placeholder='MM/YY'
              className='border p-1 block mt-1  mb-2'
              />
            </label>
            <label>
              CVV
              <input 
              type="text" 
              placeholder='123'
              className='border p-1 block mt-1 mb-2'
              />
            </label>
          </div>
            
        )}

        {paymentMethod === "bank" && ( 
          <div className='bank'>

            <label>
              Bank
              <select name="" id="">
                <option value="">Select Bank</option>
                <option value="kcb">KCB</option>
                <option value="equity bank">Equity Bank</option>
                <option value="coop">co-operative Bank</option>
              </select>
            </label>
            <label>
              Account Number

              <input 
                type="text" 
                placeholder="1234 5678 9012 3456" 
                className='border p-1 block mt-1 mb-2'
              />
            </label>
            </div>
          )}

        {error && <p>{error}</p>}
        {message && (
          <p className='whitespace-pre-line'>
            {message}
          </p>
        )}
        <div className='flex gap-5 mt-3'>

          <button
            type='submit'
            disabled={processing}
            className='bg-yellow-500  text-yellow-100  p-2 rounded-lg '
          >
            {processing
              ? "Processing Payment..."
              : submitted
              ? "Payment Request Sent"
              : `Pay ksh ${Number(order.total).toLocaleString()}`
            }
          </button>

          <Link 
            to={`/orders/${order.id}`}
            className='bg-gray-400 p-2 rounded-lg inline-block '
          >
            Cancel Payment
          </Link>
        </div>
      </form>
       
    </div>
  )
}

export default PaymentForm;