import { useCart } from '../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();

    const getTotalPrice = () => {
        console.log('cart items:', cartItems)
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.price);
            const quantity = parseInt(item.quantity);
            return total + (price * quantity);
        }, 0).toFixed(2);
    };

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image_url} alt={item.title} className="cart-image" />
                                <div className="cart-details">
                                    <h3>{item.title}</h3>
                                    <p>Flavor: {item.flavor}</p>
                                    <p>Price: ${item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h2>Total: ${getTotalPrice()}</h2>
                        <button onClick={clearCart}>Clear Cart</button>
                        <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;