import React from 'react';
// CSS
import classes from './Service.module.css';
// JSX
import { Link } from 'react-router-dom';
import Rating from '../../../components/UI/Rating/Rating';
// import ImageFadeIn from '../../UI/ImageFadeIn/ImageFadeIn';

const service = (props) => {
    const totalStarsRatingAmount = props.totalAmount ? props.totalAmount : 5;
    return (
        // Total rating amount, defaults to 5
        <div className={classes.Service}>
            <Link draggable="false" to={props.href ? props.href : '/services/notfound'} className={classes.Wrapper} target="_blank">
                <div className={classes.ThumbnailWrapper}>
                    <div className={classes.ThumbnailContainer}>
                        <div className={classes.Thumbnail} style={{backgroundImage: `url(${props.image})`}} />
                        {/* <ImageFadeIn className={classes.Thumbnail} src={props.image} /> */}
                    </div>
                </div>
            </Link>
            <Link draggable="false" to={props.href ? props.href : '/services/notfound'} className={classes.Details} target="_blank">
                <div>
                    <div className={classes.Header}>
                        <span>{props.header}</span>
                    </div>
                </div>
                {/* Title */}
                <div className={classes.Title}>{props.title}</div>
                {/* Price */}
                <div className={classes.Price}>
                    <span role="img" className={classes.RatingsWrapper}>
                        {/* Price rating for easier interpretation */}
                        <span className={classes.RatingsAvg}>Price</span>
                        <Rating type='price' rating={props.priceRating} />
                    </span>
                </div>
                {/* Rating */}
                <div>
                    {/* Average Rating */}
                    <span role="img" className={classes.RatingsWrapper}>
                        {/* Rating Average times the total amount of stars for easier interpretation */}
                        <span className={classes.RatingsAvg}>{(props.ratingAvg*totalStarsRatingAmount).toFixed(2)}</span>
                        <Rating type='stars' rating={props.ratingAvg} amount={totalStarsRatingAmount}/>
                    </span>
                    {/* Total amount of Ratings */}
                    <span className={classes.RatingsAmount}>
                        <span className={classes.Amount}>
                            {props.ratingAmount}
                            {/* Dynamic string depending if 1 rating or more */}
                            &nbsp;total rating{props.ratingAmount > 0 ? 's' : null}</span> 
                    </span>
                </div>
            </Link>
        </div>
    );
};

export default service;