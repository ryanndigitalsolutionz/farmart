import { Link } from 'react'
import { useWishlist } from '../../context/WishlistContext'
import WishlistCard from '../../components/wishlist/WishlistCard'
import WishlistEmpty from '../../components/wishlist/WishlistEmpty'

function Wishlist() {
    const { wishlist } = useWishlist();
    const itemCount = wishlist.length;

  return (
    <div className='p-4 shadow-2xl max-w-5xl mx-auto mt-3 mb-6'>
        <div className='text-center'> 
            <h1 className='text-2xl font-bold tracking-wide text-green-900'>
                My Wishlist {{itemCount}}
            </h1>
            <p>{itemCount} item{itemCount !== 1 ? "s" : ""}</p>
            <Link 
                to="/marketplace"
                className="text-sm text-green-700 hoverunderline "
            > 
            &larr; Back to Marketplace
            </Link>
        </div>

        {itemCount === 0 ? (
            <WishlistEmpty/>
        ) : (
            <div>
                {wishlist.map((animal) => (
                    <WishlistCard key={animal.id} animal={animal}/>
                ))}
            </div>         
        )}
    </div>
    );
}

export default Wishlist;