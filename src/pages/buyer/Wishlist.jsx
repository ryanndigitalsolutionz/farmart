import { useWishlist } from "../../context/WishlistContext";
import WishlistCard from "../../components/wishlist/WishlistCard";
import WishlistEmpty from "../../components/wishlist/WishlistEmpty";

function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <main className="mx-auto max-w-7xl p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-900">Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="mt-8">
          <WishlistEmpty />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {wishlist.map((animal) => (
            <WishlistCard key={animal.id} animal={animal} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Wishlist;
