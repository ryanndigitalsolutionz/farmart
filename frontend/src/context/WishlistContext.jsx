import { createContext, useContext, useState, useEffect} from 'react'
import API_BASE_URL from '../api/api'
import { useAuth } from './AuthContext'

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const { user, loading } = useAuth()
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
    
    const removeFromWishlist = async (animalId) => {
    try {
        const wishlistItem = wishlist.find(
            (item) => item.livestock_id === animalId
        );

        if (!wishlistItem) {
            return;
        }

        const response = await fetch(
            `${API_BASE_URL}/wishlist/${wishlistItem.id}`,
            {
                method: "DELETE",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to remove from wishlist"
            );
        }

        setWishlist((currentWishlist) =>
            currentWishlist.filter(
                (item) => item.id !== wishlistItem.id
            )
        );
        
        } catch (error) {
            console.error("Failed to remove from wishlist:", error);
        }
    };

    const isInWishlist = (animalId) => {
        return wishlist.some(
            (item) => item.livestock_id === animalId )
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
        if (loading || user?.role !== 'buyer') {
            return;
        }

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
    }, [user, loading]);

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
