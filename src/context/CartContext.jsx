import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }){
    const [cart, setCart] = useState(() => {
        const savedcart = localStorage.getItem("cart");

        return savedcart ? JSON.parse(savedcart) : [];
    });

    const addToCart = (animal) => {
        setCart((currentCart) => {
            const alreadyInCart = currentCart.some(
                (item) => item.id === animal.id
            );

            if (alreadyInCart) {
                return currentCart;
            }
            return [...currentCart, animal];
                        
        })
    };

    const removeFromCart = (animalId) => {
        setCart((currentCart) => 
            currentCart.filter((item) => item.id !== animalId)
        );
    };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])
    return (
        <CartContext.Provider 
        value={{
            cart,
            addToCart,
            removeFromCart,
        }}
        >
            {children}
        </CartContext.Provider>
    );
}
export function useCart() {
    return useContext(CartContext)
}