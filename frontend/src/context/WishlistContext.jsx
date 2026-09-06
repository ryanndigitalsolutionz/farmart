import { createContext, useContext, useState, useEffect} from 'react'

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    // TODO(backend): replace this intitializer with a GET/api/wishlist call

    const [wishlist, setWishList] = useState(() => {
        const savedWishlist = localStorage.getItem("wishlist");

        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    const addToWishlist = (animal) => {
        // TODO(backend): POST/api/wishlist { animalId: animal.id }
        setWishList((currentWishlist) => {
            const alreadyInWishlist = currentWishlist.some(
                (item) => item.id === animal.id
            );
            if (alreadyInWishlist) {
                return currentWishlist;
            }
            return [...currentWishlist, animal];
        });

    };
    const removeFromWishlist = (animalId) => {
        // TODO(backend): DELETE /api/wishlist/:animalId
        setWishList((currentWishlist) => 
            currentWishlist.filter((item) => item.id !== animalId)
        );
    };
    const isInWishlist = (animalId) => {
        return wishlist.some((item) =>item.id === animalId )
    };
    const toggleWishlist = (animal) => {
        if (isInWishlist(animal.id)) {
            removeFromWishlist(animal.id);
        } else {
            addToWishlist(animal);
        }
    };
    const clearWishlist = () => {
        setWishList([]);
    };
    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

  return (
    <WishlistContext.Provider
        value={{
            wishlist,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            toggleWishlist,
            clearWishlist,
        }}
    >
        {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
    const context = useContext(WishlistContext)

    if (!context) {
        throw new Error(
            "useWishlist must be used inside a WishlistProvider"
        )
    }

    return context
}
