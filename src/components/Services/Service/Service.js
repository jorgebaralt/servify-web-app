import React from 'react';
// CSS
import classes from './Service.module.css';
// JSX
import { Link } from 'react-router-dom';
import Rating from '../../../components/UI/Rating/Rating';
import ImageFadeIn from '../../UI/ImageFadeIn/ImageFadeIn';

const defaultImgUrl = 'https://storage.googleapis.com/servify-716c6.appspot.com/service_images%2F2019-01-12T06%3A37%3A57.360Zdefault-service-image.png?GoogleAccessId=firebase-adminsdk-a3e7c%40servify-716c6.iam.gserviceaccount.com&Expires=95623372800&Signature=VK1PwozcAgxOAYJH6%2FBnDqnSFavcUu0%2FbbWbOgowvx629SQ860EcW4l6YQpE08cu8q1XrsQW0KsLp%2BxAAOoHOomPVmZfGapqZlb821nyjFlN5aMdgTVPbTrWAScfVs3H4%2BJZLOqAZatqPw96blxY%2FIwrbu4dj0q6elQ%2FzRRqG5wLO5fkUvOTG18xF8DfZkTViHxaNiqD%2FPQS69sPRcMnF69%2BQGjC2ZecNbMeatufctbb95%2FL7%2FSJaIgO98HyZ8WJ9ZFxJbl7bqkHV3ptAMP5c8OIfCHeLqfKVtjoW6AmrnXh3LQXCY8GUOTbB09XwzUjggA6TpUuHblEd34p452%2BaA%3D%3D';

const service = (props) => {
    const totalStarsRatingAmount = props.totalAmount ? props.totalAmount : 5;
    return (
        // Total rating amount, defaults to 5
        <div className={classes.Service}>
            <Link draggable="false" to={props.href ? props.href : '/services/notfound'} className={classes.Wrapper} target="_blank">
                <div className={classes.ThumbnailWrapper}>
                    <div className={classes.ThumbnailContainer}>
                        <ImageFadeIn draggable="false" className={classes.Thumbnail} src={props.image ? props.image : defaultImgUrl} />
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
                {props.priceRating ? 
                    <div className={classes.Price}>
                        <span role="img" className={classes.RatingsWrapper}>
                            {/* Price rating for easier interpretation */}
                            {props.title ? 
                                <span className={classes.RatingsAvg}>Price</span>
                            : null}
                            <Rating type='price' rating={props.priceRating} />
                        </span>
                    </div>
                : null}
                {/* Rating */}
                    <div>
                        {/* Average Rating */}
                        <span role="img" className={classes.RatingsWrapper}>
                            {/* Rating Average times the total amount of stars for easier interpretation */}
                            {props.title ? 
                                <span className={classes.RatingsAvg}>{(props.ratingAvg*totalStarsRatingAmount).toFixed(2)}</span>
                            : null}
                            <Rating type='stars' rating={props.ratingAvg} amount={totalStarsRatingAmount}/>
                        </span>
                        {/* Total amount of Ratings */}
                        {props.title ? 
                            <span className={classes.RatingsAmount}>
                                <span className={classes.Amount}>
                                    {props.ratingAmount}
                                    {/* Dynamic string depending if 1 rating or more */}
                                    &nbsp;total rating{props.ratingAmount > 0 ? 's' : null}</span> 
                            </span>
                        : null}
                    </div>
            </Link>
        </div>
    );
};

export default service;