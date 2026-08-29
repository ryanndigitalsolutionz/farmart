import {Link }from 'react'
import { FaRegHeart } from 'react-icons/fa'

function WishlistEmpty() {
  return (
    <div className='flex flex-col items-center'>
        <FaRegHeart size={40} className='text-gray-300 mb02'/>

        <p className='text-lg text-red-400 font-semibold'>
            Your Wishlist is empty
        </p>
        <p className='mb-3 text-gray-600'>Save livestock you like so you can find them here later</p>

        <Link 
            to="/marketplace" 
            className="text-center text-gray-600 hover:underline hover:text-green-500 font-semibold"
        >
            Browse Livestock
        </Link>
    </div>
  )
}

export default WishlistEmpty