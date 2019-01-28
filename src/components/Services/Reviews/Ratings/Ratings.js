import React from 'react';
// CSS
import classes from './Ratings.module.css';
// JSX
import Rating from '../../../UI/Rating/Rating';

const ratings = (props) => {
    if (!props.ratings) { return null; }
    const rating = {
        avg: props.ratings ? props.ratings.rating : null,
        totalReviews: props.ratings ? props.ratings.ratingCount : null,
        priceAvg: props.ratings ? props.ratings.price : null
    }
    return (
        <div className={classes.Wrapper}>
            <div className={classes.Container}>
                <section>
                    <div className={classes.Header}> 
                        <h1 tabIndex='-1' className={classes.Title}>{rating.totalReviews} total reviews from people who used this service</h1>
                    </div>
                </section>
                <div className={classes.Rating}>
                    <span className={classes.Average}>{rating.avg.toFixed(1)}</span>
                    <Rating rating={rating.avg/5} height={'17.5px'} width={'17.5px'} type='stars' />
                </div>
                <div className={classes.Rating}>
                    <span className={classes.Average}>{rating.priceAvg.toFixed(1)}</span>
                    <Rating rating={rating.priceAvg/4} height={'17.5px'} width={'17.5px'} type='price' />
                </div>
            </div>
        </div>
    );
}

export default ratings;