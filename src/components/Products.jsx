import { useEffect } from 'react';
import { getProducts } from '../api/index.js';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import SearchBar from './Searchbar.jsx';
import '../products.css';

const Products = ({ products, setProducts, setSingleProduct, searchTerm, setSearchTerm, searchResults, setSearchResults }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const handleClick = (product) => {
        setSingleProduct(product);
        setSearchTerm('');
        setSearchResults([]);
        navigate(`/products/${product.id}`);
    };

    const handleAddToCart = async (product) => {
    try {
        const result = await addToCart(product.id);
        if (result) {
            console.log("Item added to cart:", result);
        } else {
            console.warn("Failed to add item to cart.");
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
};


    useEffect(() => {
        const getProductsApi = async () => {
            const response = await getProducts();
            setProducts(response);
        };
        getProductsApi();
    }, []);

    return (
        <>
            <div className='products-header'>
                <h1>
                    A Snaccident Waiting to Happen!
                </h1>
                <p>
                    Welcome to our products page! You'll find a wide variety of edibles, including a groovy Lemonade Drink!
                </p>
                <SearchBar
                    products={products}
                    setProducts={setProducts}
                    searchResults={searchResults}
                    setSearchResults={setSearchResults}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
            </div>
            <div className='products-page'>
                <div className='products-container'>
                    {
                        searchResults?.length > 0 ? (
                            searchResults.map((product) => {
                                const { id, title, image_url, flavor, price, quantity } = product;
                                if (!product || !product.id || !product.title) return null;
                                return (
                                    <div key={id} className='product-card'>
                                        <h3>{title}</h3>
                                        <img className='product-image' src={image_url} />
                                        <p>{quantity}</p>
                                        <p>{price}</p>
                                        <p>{flavor}</p>
                                        <button onClick={() => handleClick(product)}>More Info</button>
                                        <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                                    </div>
                                );
                            })
                        ) : (
                            Array.isArray(products) && products.map((product) => {
                                const { id, title, image_url, flavor, price, quantity } = product;
                                if (!product || !product.id || !product.title) return null;
                                return (
                                    <div key={id} className='product-card'>
                                        <h2><u>{title}</u></h2>
                                        <img className='product-image' src={image_url} />
                                        <p>Quantity: {quantity}</p>
                                        <p>Price: ${price}</p>
                                        <p>Flavor: {flavor}</p>
                                        <button onClick={() => handleClick(product)}>More Info</button>
                                        <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                                    </div>
                                );
                            })
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default Products;