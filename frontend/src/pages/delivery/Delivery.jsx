import React, { useState } from 'react'
import { CiEdit } from "react-icons/ci";

function Delivery({
    name,
    setName,
    phone,
    setPhone,
    location,
    setLocation,
    orderNote,
    setOrderNote,
    error,
    onContinue,
    submitting,
    
}) {
    const [showSummary, setShowSummary] = useState(false); 
    const [editing, setEditing] = useState(true);

  return (
    <div>
        <h2 className="font-semibold">Delivery Information</h2>

        {/* deliver information inputs to remove later*/}
        {editing && (
            <div>

            <div className="mb-2 mt-2"> 
                <label className='block text-sm font-semibold text-gray-700'>
                    Full Name
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1
                                    outline-none transition 
                                    focus:border-green-500 focus:ring-green-100"
                        required
                    />
                </label>
            </div>
            <div className="mt-2">
                <label className='block text-sm font-semibold text-gray-700'>
                    Phone Number
                    <input 
                        type="text" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1
                                    outline-none transition 
                                    focus:border-green-500 focus:ring-2 focus-ring-green-100"
                        required
                    />
                </label>
            </div>
            <div className="mb-4 mt-2">
                <label className='block text-sm font-semibold text-gray-700'>
                    Location
                    <input 
                        type="text" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter your Location"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1
                                    outline-none transition 
                                    focus:border-green-500 focus:ring-2 focus-ring-green-100"
                        required
                    />
                </label>
            </div>

            {error && <p className='text-red-500 text-sm mb-2'>{error}</p>}

            {/* Order note */}
            <div className='mt-2'>
                <label className='block font-semibold text-gray-700 text-sm'>
                    Order Note (Optional)
                    <textarea 
                        value={orderNote}
                        onChange={(e) => setOrderNote(e.target.value)}
                        maxLength={300}
                        rows={4}
                        placeholder='Leave a note for the farmer...'
                        className='border rounded-lg p-2 w-full mt-1'
                    />
                </label>

                <p className='text-sm text-gray-400'>
                    {orderNote.length}/300
                </p>
            </div>
            {/* save */}
            <button 
                type='button'
                onClick={() => {
                    setEditing(false)
                    setShowSummary(true)
                }}
                className='... rounded-2xl px-2 transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-lg '
            >
                Save Delivery Details
            </button>
            </div>
        )}

        {/* Delivery summary */}
        {showSummary && (
            <div className='w-full border-gray-200 rounded-xl p-5 shadow-sm'>
                <div className='flex  flex-col justify-between items-start'>
                    <div>
                    <h3 className='font-bold text-xl'>Delivery Details</h3>
                        <p className='text-gray-700 mt-2'>{name}</p>
                        <p className='text-gray-500'>{phone}</p>
                        <p className='text-gray-500 mb-1'>{location}</p>
                        

                        {orderNote && (
                            <p>Note: {orderNote}</p>
                        )}
                    </div>

                    <div >
                        <button
                            type='button'
                            onClick={() => {
                                setShowSummary(false);
                                setEditing(true);
                            }}
                            className='text-green-600 font-semibold hover:underline flex gap-1 mt-2'
                        >
                            <CiEdit size={22}/>
                            Change
                        </button>
                    </div>
                </div>
            </div>
        )}

        <button 
            type='button'
            onClick={onContinue}
            disabled={submitting}
            className="text-green-600 mt-3 font-semibold border-3 p-1 px-2 py-1 rounded-lg 
                transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-lg "
        >
            {submitting ? "Saving..." : "Continue to payment"}
        </button>
    

    </div>
  )
}

export default Delivery;
