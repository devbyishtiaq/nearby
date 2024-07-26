import React from "react";

interface RatingProps {
    ratingCount: number;
}

const Rating: React.FC<RatingProps> = ({ ratingCount }) => {
    const totalStars = 5;
    const stars = Array.from({ length: totalStars }, (_, index) => (
        <img
            key={index}
            src={index < ratingCount ? "/img/general/star.png" : "/img/general/star-empty.png"}
            height={12}
            alt={index < ratingCount ? `Star ${index + 1}` : `Empty Star ${index + 1}`}
        />
    ));

    return <div>{stars}</div>;
};

export default Rating;

