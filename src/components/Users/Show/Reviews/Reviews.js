import React from 'react';
// CSS
import classes from './Reviews.module.css';
// JSX
import Review from '../../../Services/Reviews/Review/Review';
import LoadingBounce from '../../../UI/LoadingBounce/LoadingBounce';
import Separator from '../../../UI/Separator/Separator';

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
                        <div className={classes.Subtitle}>Review{props.reviews.length === 1 ? null : 's'}</div>
                    </div>
                    <Separator />
                    {props.reviews.map((review, index) => {
                            return (
                                <Review
                                    link
                                    key={index}
                                    review={review} />
                            )
                        })}
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