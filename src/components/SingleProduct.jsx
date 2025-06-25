import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getSingleProduct } from "../api/index.js";
import Reviews from "./reviews/reviews.jsx";

const SingleProduct = ({ singleProduct, setSingleProduct, allReviews, setAllReviews }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getProductDetailsApi = async() => {
            const response = await getSingleProduct(id);
            setSingleProduct(response);
        }
        getProductDetailsApi(id);
    }, [id]);

    return (
        <>
                <div className='product-details-container'>
                    <div key={singleProduct.id}>
                        <h2>{singleProduct.title}</h2>
                            <img 
                                className="single-product-img"
                                src={singleProduct.image_url} 
                            />
                            <p>{singleProduct.price}</p>
                            <p>{singleProduct.dose}</p>
                            <p>{singleProduct.total}</p>
                            <p>{singleProduct.quantity}</p>
                            <p>{singleProduct.strain}</p>
                            <p>{singleProduct.potency}</p>
                            <p>{singleProduct.flavor}</p>
                            <p className='description'>{singleProduct.description}</p>
                            <Reviews
                                allReviews={allReviews}
                                setAllReviews={setAllReviews}
                            />
                            <button 
                                className='back-button'
                                onClick={() => navigate(-1)}>
                                Return to Product List
                            </button>
                    </div>
                </div>
            </>
    )
}

export default SingleProduct