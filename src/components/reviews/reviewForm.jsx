// Logged-in users can submit a review through a form
import { useState } from "react";

function ReviewForm({ productId }) {
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("authToken");

            const res = await fetch(`/api/products/${productId}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ rating: Number(rating), comment, product_id:productId}),
            });
            if (res.ok) {
                const newReview = await res.json();
                setRating("");
                setComment("");
            } else {
                console.error("Failed to submit review");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Rating:</label>
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    min="1"
                    max="5"
                    required
                />
            </div>
            <div>
                <label>Comment:</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                ></textarea>
            </div>
            <button type="submit">Submit Review</button>
        </form>
    );
}

export default ReviewForm;