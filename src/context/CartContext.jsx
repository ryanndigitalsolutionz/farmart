import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }){
    const [cart, setCart] = useState([]);

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