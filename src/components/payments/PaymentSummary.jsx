import React from 'react'

function PaymentSummary({ order }) {
    const isPaid = order.paymentStatus === "paid"
  return (
    <div className='bg-stone-50 rounded-2xl p-5  mb-6'>
        <div className='flex justify-between items-center mb-4'>
            <h2 className='font-bold text-lg text-gray-800'>
                Payment Summary
            </h2>            
                
            <span 
                className={`font-semibold uppercase tracking-wide px-3 py-1 rounded-full ${
                    isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600" 
                }`}
            >
                {isPaid ? "Paid" : "UnPaid"}
            </span>     
        </div>
        
        <div className='space-y-3'>
            <div className='flex justify-between gap-4'>
                <span className='text-gray-500 font-semibold'>
                    Order ID
                </span>
                <span className='font-medium text-gray-700'>
                    {order.id}
                </span>

            </div>
            <div className='flex justify-between items-center pt-3 border-t border-gray-200'>
                <span className="font-semibold text-gray-700">
                    Total                
                </span>
                <span className='font-bold text-xl text-green-700'>
                    Ksh {Number(order.total).toLocaleString()}
                </span>

            </div>           

        </div>           
        
    </div>
  );
}

export default PaymentSummary;