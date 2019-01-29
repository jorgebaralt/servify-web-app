import React from 'react';
// Default Image
import defaultImage from '../../../../assets/favicon/android-icon-48x48.png';
// CSS
import classes from './Review.module.css';
// JSX
import { Link } from 'react-router-dom';
import Rating from '../../../../components/UI/Rating/Rating';

const review = (props) => {
    if (!props.review) { return null; } // Protection
    const displayName = props.review.reviewerDisplayName;
    const creationDate = props.review.timestamp;
    const { uid, rating, price, comment } = props.review;
    const totalStarsRatingAmount = props.totalAmount ? props.totalAmount : 5;
    return (
        <div className={classes.Header}>
            <div className={classes.HeaderContainer}>
                {/* Image */}
                <div className={classes.HeaderItem}>
                    <div className={classes.ImageContainer}>
                        <Link 
                            to={['/users/show/', uid].join('')}
                            aria-label={displayName}
                            aria-busy="false">
                            <img 
                                className={classes.Image}
                                src={props.src ? props.src : defaultImage}
                                height="48" 
                                width="48" 
                                alt='' 
                                title={displayName} />
                        </Link>
                    </div>
                </div>
                {/* User info */}
                <div className={classes.HeaderItem}>
                    <div className={classes.UserContainer}>
                        <div className={classes.User}>
                            <Link 
                                to={['/users/show/', uid].join('')}
                                aria-label={displayName}
                                aria-busy="false">
                                <span className={classes.Username}>{displayName}</span>
                            </Link>
                            <span className={classes.Spacing}>-</span>
                            <span className={classes.Date}>{new Date(String(creationDate)).toLocaleDateString()}</span>
                            {props.link ? 
                                <>
                                <span className={classes.Spacing}>-</span>
                                <Link to={['/services',props.review.serviceId].join('/')}>
                                    <span className={classes.Link}>Link to Service</span>
                                </Link>
                                </>
                                : null}
                        </div>
                        <div className={classes.Rating}>
                            <Rating rating={rating/5} amount={totalStarsRatingAmount} height={'15px'} width={'15px'} type='stars' />
                            <Rating rating={price/4} amount={4} height={'15px'} width={'15px'} type='price' />
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.CommentContainer}>
                <div dir='ltr' className={classes.Comment}>
                    {comment}
                </div>
            </div>
            <div className={classes.SeparatorWrapper}><div className={classes.Separator}/></div>
        </div>
    );
}

export default review;