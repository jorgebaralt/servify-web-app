import React from 'react';
// CSS
import classes from './Reviews.module.css';
// JSX
import Ratings from './Ratings/Ratings';
import Review from './Review/Review';

const reviews = (props) => {
    return (
        <div className={classes.Wrapper}>
            <div className={classes.Container}>
                <Ratings rating={props.rating} />
                <div style={{margin: '0 auto'}} className={classes.Wrapper}>
                    <Review />
                    <Review />
                    <Review />
                </div>
            </div>
        </div>
    );
}

export default reviews;