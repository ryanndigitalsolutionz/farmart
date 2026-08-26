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
      setprocessing(false);
      onPay(phone);
      
    }, 500);    
    
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className='space-y-5'>
        {/* heading */}
        <div>
          <h2 className='font-bold text-xl text-gray-800'>
            Choose payment Method
          </h2>

          <p>Select how you would like to pay for your order.</p>

        </div>

        <label>
          Payment Method
          <select 
            value={paymentMethod}
            onChange={(e) => setPaymentmethod(e.target.value)}
            className='w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none transition
            focus:border-green-500 focus:ring-2 focus:ring-green-100'
          >
            {/* <option value="">Select Payment method</option> */}
            <option value="mpesa">Mpesa</option>
            <option value="card">Card</option>
            <option value="bank">Bank Transfer</option>

          </select>
        </label>

        {paymentMethod === "mpesa" && ( 
            <label className='block'>
              <span className='block text-sm font-semibold text-gray-700 mb-2'>
                M-Pesa Phone Number
              </span>            

              <input 
                type="text" 
                value={phone} 
                onChange={(e) => setphone(e.target.value)}
                placeholder="07xxxxxxxx" 
                className='w-full border border-gray-300 rounded-lg px-4 py-3 bg-white 
                outline-none transition focus:border-green-500 focus:ring-2 
                focus:ring-green-100'
              />

              
            </label>)
        }
        {paymentMethod === "card" && ( 
          <div className='space-y-4 bg-stone-50 rounded-cl p-4'>
            <p className='text-sm text-gray-500'>
              Card payments are coming soon.
            </p>

            <label className='block text-sm font-semibold text-gray-700'>
              Card Number

              <input 
                type="text" 
                placeholder="1234 5678 9012 3456" 
                className='w-full border border-gray-200 rounded-lg px-4 py-3 
                mt-1 bg-gray-100 text-gray-400 cursor-not-allowed'
              />
            </label>

            <div className='flex gap-3'>
              <label className='block text-sm font-semibold text-gray-700 flex-1'>
                Expiry Date
                <input 
                type="text" 
                placeholder='MM/YY'
                className='w-full border border-gray-200 rounded-lg px-4 py-3 
                mt-1 bg-gray-100 text-gray-400 cursor-not-allowed'
                />
              </label>
              <label className='block text-sm font-semibold text-gray-700 flex-1'>
                CVV
                <input 
                type="text" 
                placeholder='123'
                className='w-full border border-gray-200 rounded-lg px-4 py-3 
                mt-1 bg-gray-100 text-gray-400 cursor-not-allowed'
                />
              </label>
            </div>
          </div>
            
        )}

        {paymentMethod === "bank" && ( 
          <div className='space-y-4 bg-stone-50 rounded-cl p-4'>
            <p className='text-sm text-gray-500'>
              Card payments are coming soon.
            </p>

            <label className='block text-sm font-semibold text-gray-700'>
              Bank
              <select 
                className='w-full border border-gray-200 rounded-lg px-4 py-3 
                mt-1 bg-gray-100 text-gray-400 cursor-not-allowed'
              >
                <option value="">Select Bank</option>
                <option value="kcb">KCB</option>
                <option value="equity bank">Equity Bank</option>
                <option value="coop">co-operative Bank</option>
              </select>
            </label>
            <label className='block text-sm font-semibold text-gray-700'>
              Account Number

              <input 
                type="text" 
                placeholder="1234 5678 9012 3456" 
                className='w-full border border-gray-200 rounded-lg px-4 py-3 
                mt-1 bg-gray-100 text-gray-400 cursor-not-allowed'
              />
            </label>
            </div>
          )}

        {error && <p className='bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3'>{error}</p>}
        {message && (
          <p className='bg-green-50 text-green-700 text-sm rounded-lg px-4 py-3 whitespace-pre-line'>
            {message}
          </p>
        )}
        <div className='flex gap-5 mt-4'>

          <button
            type='submit'
            disabled={processing}
            className='bg-yellow-300 text-green-900  px-5 py-3 rounded-xl 
              font-semibold shadow-sm cursor-pointer
              hover:bg-yellow-400 
              transition-all duration-200 
              hover:-translate-y-0.5 hover:shadow-md 
              disabled:opacity-60 disabled:cursor-not-allowed'
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
            className='bg-gray-300 text-gray-400 p-2 
              rounded-lg inline-block hover:bg-gray-400 hover:text-gray-50 font-semibold
              transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-lg'
          >
            Cancel Payment
          </Link>
        </div>
      </form>
       
    </div>
  )
}

export default PaymentForm;