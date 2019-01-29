import React from 'react';
// CSS
import classes from './Service.module.css';
// Image Data Handler
import { setImagesArray } from '../../../shared/imagesHandler';
// JSX
import { Link } from 'react-router-dom';
import Rating from '../../../components/UI/Rating/Rating';
import ImageFadeIn from '../../UI/ImageFadeIn/ImageFadeIn';

export const defaultImgUrl = 'https://storage.googleapis.com/servify-716c6.appspot.com/service_images%2F2019-01-20T22%3A51%3A58.066Z_default-service-image.png?GoogleAccessId=firebase-adminsdk-a3e7c%40servify-716c6.iam.gserviceaccount.com&Expires=95623372800&Signature=st0sONUJVHe54MOE0yY902A0gAcBCzSjxch4QbdCXJ0w2LiQgG%2FwZiv9lW6t4lV5zFhpONuNEFPOWIqC%2F1fQgI0qKX4Y1vI6nI14lx%2BYqaR%2Fg0LjIfUPeU5RSm8RJBnWIKSWVhThZT7ewez8XEg2RjIRIVllzdJht%2FRTgwzf4A%2FbsF1SsfaMFkIYH4Ee7vnNmdqOTRTwGqInjLPER9WgalWew7MXxHExGo9%2Fi%2BmIXjAxcC2%2BmTu9Pov%2BBkvfpu37miQTViUTUmE0c3jc17R%2FC816Sdmhg%2F2e8a%2FSUx9k714D5PujzvKldabGnPvwwPTO%2BtCe0yjAsbE5eehLQYEjgw%3D%3D';

const service = (props) => {
    if (!props.href) { return null; }
    const totalStarsRatingAmount = props.totalAmount ? props.totalAmount : 5;
    const image = props.image ? setImagesArray(props.image) : [];
    return (
        // Total rating amount, defaults to 5
        <div className={classes.Service}>
            <Link draggable="false" to={['/services', props.href].join('/')} className={classes.Wrapper} target="_blank">
                <div className={classes.ThumbnailWrapper}>
                    <div className={classes.ThumbnailContainer}>
                        <ImageFadeIn draggable="false" className={classes.Thumbnail} src={image.length ? image[0] : defaultImgUrl} />
                    </div>
                </div>
            </Link>
            <Link draggable="false" to={['/services', props.href].join('/')} className={classes.Details} target="_blank">
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