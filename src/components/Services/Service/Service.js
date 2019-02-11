import React from 'react';
// CSS
import classes from './Service.module.css';
// Worker functions
import { setImagesArray } from '../../../shared/imagesHandler';
import defaultImgUrl from '../../../shared/defaultServiceImage';
// JSX
import { Link } from 'react-router-dom';
import Rating from '../../../components/UI/Rating/Rating';
import ImageFadeIn from '../../UI/ImageFadeIn/ImageFadeIn';

const service = (props) => {
    if (!props.href) { return null; }
    const totalStarsRatingAmount = props.totalAmount ? props.totalAmount : 5;
    const image = props.image ? setImagesArray(props.image) : [];
    return (
        // Total rating amount, defaults to 5
        <div className={classes.Service}>
            <Link draggable="false" to={['/services', props.href].join('/')} className={classes.Wrapper}>
                <div className={classes.ThumbnailWrapper}>
                    <div className={classes.ThumbnailContainer}>
                        <ImageFadeIn draggable="false" className={classes.Thumbnail} src={image.length ? image[0] : defaultImgUrl(props.header ? props.header.replace(' ', '_') : null)} />
                    </div>
                </div>
            </Link>
            <Link draggable="false" to={['/services', props.href].join('/')} className={classes.Details}>
                <div>
                    <div className={classes.Header}>
                        <span>{props.header}</span>
                    </div>
                </div>
                {/* Title */}
                <div className={classes.Title}>{props.title}</div>
                {/* Price */}
                {props.priceRating ? 
                    <div className={classes.Price}>
                        <span role="img" className={classes.RatingsWrapper}>
                            {/* Price rating for easier interpretation */}
                            {props.title ? 
                                <span className={classes.RatingsAvg}>Price</span>
                                : null}
                            {props.ratingAmount ?
                                <Rating type='price' rating={props.priceRating} />
                                : null}
                        </span>
                    </div>
                : null}
                {/* Rating */}
                    <div>
                        {/* Average Rating */}
                        <span role="img" className={classes.RatingsWrapper}>
                            {/* Rating Average times the total amount of stars for easier interpretation */}
                            {props.title && props.ratingAmount ? 
                                <span className={classes.RatingsAvg}>{(props.ratingAvg*totalStarsRatingAmount).toFixed(2)}</span>
                                : null}
                            {props.ratingAmount ?
                                <Rating type='stars' rating={props.ratingAvg} amount={totalStarsRatingAmount}/>
                                : null}
                        </span>
                        {/* Total amount of Ratings */}
                        {props.title ? 
                            <span className={classes.RatingsAmount}>
                                <span className={classes.Amount}>
                                    {/* Dynamic string depending if 1 rating or more */}
                                    {!props.ratingAmount ?
                                        'No reviews yet' 
                                        : <span>{props.ratingAmount} review{props.ratingAmount > 1 ? 's' : null}</span> }</span> 
                            </span>
                        : null}
                    </div>
            </Link>
        </div>
    );
};

export default service;