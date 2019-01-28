import React from 'react';
// JSX
import StarsRating from './StarsRating/StarsRating';
import PriceRating from './PriceRating/PriceRating';

const rating = (props) => {
    switch (props.type) {
        case'stars': 
            return <StarsRating {...props} />;
        case 'price':
            return <PriceRating
                onClick={props.onClick}
                {...props} />;
        default:
            return <span>Please specify an appropriate rating type.</span>;
    }
}

export default rating;