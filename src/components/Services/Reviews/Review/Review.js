import React from 'react';
// Default Image
import defaultImage from '../../../../assets/favicon/android-icon-48x48.png';
// CSS
import classes from './Review.module.css';
// JSX
import { NavLink } from 'react-router-dom';
import Rating from '../../../../components/UI/Rating/Rating';

const review = (props) => {
    const totalStarsRatingAmount = props.totalAmount ? props.totalAmount : 5;
    return (
        <div className={classes.Header}>
            <div className={classes.HeaderContainer}>
                {/* Image */}
                <div className={classes.HeaderItem}>
                    <div className={classes.ImageContainer}>
                        <NavLink 
                            // TODO add correct route
                            to={['/users/show/', props.userId].join('')}
                            aria-label={props.user}
                            aria-busy="false">
                            <img 
                                className={classes.Image}
                                src={props.src ? props.src : defaultImage}
                                height="48" 
                                width="48" 
                                alt={props.user} 
                                title={props.user} />
                        </NavLink>
                    </div>
                </div>
                {/* User info */}
                <div className={classes.HeaderItem}>
                    <div className={classes.UserContainer}>
                        <div className={classes.User}>
                            <span className={classes.Username}>{props.displayName}</span>
                            <span style={{margin: '0 1ch 3px'}}>-</span>
                            <span className={classes.Date}>{new Date(String(props.date)).toLocaleDateString()}</span>
                        </div>
                        <div className={classes.Rating}>
                            <Rating rating={props.rating} amount={totalStarsRatingAmount} height={'15px'} width={'15px'} type='stars' />
                        </div>
                    </div>
                </div>
            </div>
            {/* TODO remove placeholders */}
            <div className={classes.CommentContainer}>
                <div dir='ltr' className={classes.Comment}>
                    {props.comment}
                </div>
            </div>
            <div className={classes.SeparatorWrapper}><div className={classes.Separator}/></div>
        </div>
    );
}

export default review;