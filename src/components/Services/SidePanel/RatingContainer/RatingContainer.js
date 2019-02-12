import React from 'react';
// CSS
import classes from './RatingContainer.module.css';
// JSX
import Rating from '../../../UI/Rating/Rating';

export const RatingContainer = (props) => {
    const ratingClasses = [classes.Rating];
    switch (true) {
        case props.rating > 0.75:
            ratingClasses.push(classes.RatingActiveFour);
            break;
        case props.rating > 0.5:
            ratingClasses.push(classes.RatingActiveThree);
            break;
        case props.rating > 0.25:
            ratingClasses.push(classes.RatingActiveTwo);
            break;
        default:
            // do nothing
    }
    return (
        <>
            <div className={classes.RatingContainer}>
                <Rating 
                    rating={props.rating} 
                    onClick={props.onClick}
                    priceContainerClassname={ratingClasses.join(' ')} 
                    viewBox={'0 0 500 500'} 
                    type='price'/>
            </div>
            <div className={classes.RatingFilter}>
                <span>Price rating filter</span>
            </div>
        </>
    );
}

export const ClosedRatingContainer = (props) => {
    const ratingClasses = [classes.Rating];
    switch (true) {
        case props.rating >= 0.75:
            ratingClasses.push(classes.RatingActiveFour);
            break;
        case props.rating >= 0.5:
            ratingClasses.push(classes.RatingActiveThree);
            break;
        case props.rating >= 0.25:
            ratingClasses.push(classes.RatingActiveTwo);
            break;
        default:
            // do nothing
    }
    return (
        <div className={classes.RatingContainer}>
            <div className={classes.FilterOverview}>
                <Rating
                    rating={0} 
                    type='price' /> 
                <span style={
                    {    
                        display: 'inline-flex',
                        alignItems: 'center',
                        fontSize: '16px',
                        fontWeight: '600',
                        height: '13px',
                        margin: '0 5px'
                    }}>-</span> {/** Separator */}
                <Rating 
                    rating={props.rating} 
                    type='price' />
            </div>
        </div>
    );
}