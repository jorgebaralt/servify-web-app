import React from 'react';
// JSX
import StarsRating from './StarsRating/StarsRating';
import PriceRating from './PriceRating/PriceRating';

const rating = (props) => {
    let rating;
    switch (props.type) {
        case'stars': 
            rating = <StarsRating {...props} />
            break;
        case 'price':
            rating = <PriceRating {...props} />
            break;
        default:
            rating = <span>Please specify an appropriate rating type.</span>
    }
    return (
        <>
            {rating}
        </>
    );
}

export default rating;