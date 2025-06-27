import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

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
                return [...prevItems, { ...added, quantity: 1 }];
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
        <CartContext 
        value={{ cartItems, addToCart, removeFromCart, clearCart }}
        >
            { children }
        </CartContext>
    );
};
export const useCart = () => useContext(CartContext)
