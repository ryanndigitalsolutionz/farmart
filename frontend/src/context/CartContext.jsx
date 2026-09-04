import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const getCartKey = (item) => {
        if (item.category === "product" || item.product_id) {
            return `product-${item.product_id || item.id}`;
        }

        return `livestock-${item.livestock_id || item.id}`;
    };

    const addToCart = (item) => {
        setCart((currentCart) => {
            const cartKey = getCartKey(item);

            const alreadyInCart = currentCart.some(
                (cartItem) => getCartKey(cartItem) === cartKey
            );

            if (alreadyInCart) {
                return currentCart;
            }

            return [
                ...currentCart,
                {
                    ...item,
                    cartKey,
                    category:
                        item.category ||
                        (item.product_id ? "product" : "livestock"),
                    quantityInCart: 1,
                },
            ];
        });
    };

    const removeFromCart = (item) => {
        const cartKey =
            typeof item === "string"
                ? item
                : item.cartKey || getCartKey(item);

        setCart((currentCart) =>
            currentCart.filter(
                (cartItem) => getCartKey(cartItem) !== cartKey
            )
        );
    };

    const updateCartQuantity = (item, quantity) => {
        const cartKey = getCartKey(item);
        const newQuantity = Math.max(1, Number(quantity) || 1);

        setCart((currentCart) =>
            currentCart.map((cartItem) =>
                getCartKey(cartItem) === cartKey
                    ? {
                          ...cartItem,
                          quantityInCart: newQuantity,
                      }
                    : cartItem
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateCartQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
