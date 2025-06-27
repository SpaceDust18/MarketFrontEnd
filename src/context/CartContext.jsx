import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // ✅ Load cart items from localStorage on mount
    useEffect(() => {
        const storedCart = localStorage.getItem('cartItems');
        if (storedCart) {
            try {
                setCartItems(JSON.parse(storedCart));
            } catch (err) {
                console.error("Error parsing stored cart:", err);
                localStorage.removeItem('cartItems');
            }
        }
    }, []);

    // ✅ Save cart items to localStorage on change
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:3000/api/users/addtocart', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productId })
            });

            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }

            const added = await res.json();

            setCartItems((prevItems) => {
                const existingItem = prevItems.find(item => item.id === added.id);

                if (existingItem) {
                    return prevItems.map(item =>
                        item.id === added.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                } else {
                    return [...prevItems, { ...added, price: Number(added.price), quantity: 1 }];
                }
            });

            return added;
        } catch (error) {
            console.error("Failed to add to cart:", error);
            return null;
        }
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== productId)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
