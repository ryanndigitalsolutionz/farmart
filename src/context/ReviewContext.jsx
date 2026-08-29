import { createContext, useContext, useState, useEffect} from 'react'

const ReviewContext = createContext();

export function ReviewProvider({ children }) {
    // TODO(backend): replace initializer with GET /api/reviews (per animal) or
    // per buywe whichever the endpoint needs inside a useEffect + loading
    const [reviews, setReviews] = useState(() => {
        const savedReviews = localStorage.getItem("reviews");

        return savedReviews ? JSON.parse(savedReviews) : [];
    });

     const addReview = (review) => {
        // TODO(backend): POST /api/reviews { orderId, animalId, rating, comment }
        const newReview = {
            id: `REV-${Date.now()}`,
            createdAt: new Date().toISOString(),
            ...review,
        };

        setReviews((current) => [...current, newReview]);
        return newReview;
    };

    const hasReviewOrder = (orderId) => {
        return reviews.some((review) => review.orderId === orderId);
    };

    const getReviewsForAnimal = (animalId) => {
        return reviews.filter((review) => review.animalId === animalId)
    };

    useEffect(() => {
        localStorage.setItem("reviews", JSON.stringify(reviews));
    }, [reviews]);

    return (
        <ReviewtContext.Provider
            value={{
                reviews,
                addReview,
                hasReviewOrder,
                getReviewsForAnimal,
            }}
        >
            {children}
        </ReviewtContext.Provider>
    )

}

export function useReviews() {
    return useContext(ReviewContext)
}