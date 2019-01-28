import React from 'react';
// CSS
import classes from './Reviews.module.css';
// JSX
import Review from '../../../Services/Reviews/Review/Review';
import LoadingBounce from '../../../UI/LoadingBounce/LoadingBounce';

const reviews = (props) => {
    if (props.loading && !props.reviews.length) {
        return (
            <div className={classes.Wrapper}>
                <h1 className={classes.Title}>Reviews</h1>
                <LoadingBounce />
            </div>
        );
    }
    return (
        <div className={classes.Wrapper}>
            <h1 className={classes.Title}>Reviews</h1>
            {props.reviews.length ? 
                <div className={classes.Container}>
                    <div className={classes.Icon}>
                        <div className={classes.Count}>{props.reviews.length}</div> 
                        <div className={classes.Subtitle}>Review{props.reviews.length === 1 ? 's' : null}</div>
                    </div>
                    <Review />
                </div>
                : 
                <div className={classes.Container}>
                    <span>No reviews yet.</span>
                </div>
            }
        </div>
    );
}

export default reviews;