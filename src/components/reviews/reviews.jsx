// Show all reviews for the product from all users
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Reviews({ token }){
    const [allReviews, setAllReviews] = useState([]);
    const { id } = useParams();

    useEffect(()=>{
        const getReviews = async () => {
            try{
                const res = await fetch(`http://localhost:3000/api/products/${id}/reviews`);
                console.log(res)
                const data = await res.json();
                setAllReviews(data);
            } catch(err){
                console.error(err);
            }}
            getReviews(id);
    }, []);

    return(
        <>
        <div>
            <h1>{allReviews.rating}</h1>
            <h2>{allReviews.comment}</h2>
        </div>
        </>
    )

}

export default Reviews;