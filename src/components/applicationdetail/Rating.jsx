import React from 'react'
import RatingBar from './RatingBar';

const Rating = () => {

    const ratings = [
        { stars: 5, count: 40 },
        { stars: 4, count: 6 },
        { stars: 3, count: 1 },
        { stars: 2, count: 1 },
        { stars: 1, count: 1 }
    ];

    const totalReviews = ratings.reduce((sum, rating) => sum + rating.count, 0);
    return (
        <div className="bg-white rounded-lg p-3 ">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Rating
                </h3>
                <p className="text-sm text-gray-600">
                    Overall Rating Performance
                </p>
            </div>

            <div className="space-y-1">
                {ratings.map((rating) => (
                    <RatingBar
                        key={rating.stars}
                        stars={rating.stars}
                        count={rating.count}
                        totalReviews={totalReviews}
                    />
                ))}
            </div>
        </div>
    )
}

export default Rating