import { createContext, useContext, useState, useEffect} from 'react'
import API_BASE_URL from '../api/api'

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([])

    const addToWishlist = async (animal) => {
        try {
            const response = await fetch(`${API_BASE_URL}/wishlist`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    livestock_id: animal.id,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to add to wishlist');
            }

            setWishlist((currentWishlist) => {
                const alreadyInWishlist = currentWishlist.some(
                    (item) => item.id === data.id
                );

                if (alreadyInWishlist) {
                    return currentWishlist;
                }

                return [...currentWishlist, data];
            });
        } catch (error) {
            console.error('Failed to add to wishlist:', error);
        }
    };
    const removeFromWishlist = (animalId) => {
        // TODO(backend): DELETE /api/wishlist/:animalId
        setWishlist((currentWishlist) => 
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
        setWishlist([]);
    };

    useEffect(() => {
        const loadWishlist = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/wishlist`, {
                    credentials: 'include',
                    headers: {
                        Accept: 'application/json',
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to load wishlist');
                }

                setWishlist(data);
            } catch (error) {
                console.error('Failed to load wishlist:', error);
            }
        };

        loadWishlist();
    }, []);

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
