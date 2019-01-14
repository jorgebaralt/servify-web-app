import React from 'react';
// CSS
import classes from './Ratings.module.css';
// JSX
import Rating from '../../../UI/Rating/Rating';

const ratings = (props) => {
    return (
        <div className={classes.Wrapper}>
            <div className={classes.Container}>
                <section>
                    <div className={classes.Header}> 
                        <h1 tabIndex='-1' className={classes.Title}>{props.rating.totalReviews} total reviews from people who used this service</h1>
                    </div>
                </section>
                <span className={classes.Average}>{props.rating.avg.toFixed(1)}</span>
                <Rating height={'17.5px'} width={'17.5px'} type='stars' />
            </div>
        </div>
    );
}

export default ratings;