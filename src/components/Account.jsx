import { getUserReviews } from "../api/index.js";
import { useEffect, useState } from "react";
import Cart from "./Cart.jsx";

const Account = ({ token }) => {
    const [userReview, setUserReview] = useState([]);
    useEffect(() => {
        const getUserReviewsApi = async () => {
            const userReviews = await getUserReviews(token);
            setUserReview(userReviews);
        }
        getUserReviewsApi();
    }, [])
    return (
        <>
            <div>
                <Cart />
            </div>
            { Array.isArray (userReview) &&
                userReview?.map((review, index) => (
                    <div key={ review.id }>
                        <h3><u>Review #{index + 1}</u>: { review.comment }</h3>
                    </div>
                ))}
        </>
    )
}

export default Account