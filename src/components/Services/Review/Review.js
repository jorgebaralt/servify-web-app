import React from 'react';
// CSS
import classes from './Review.module.css';
// JSX
import { NavLink } from 'react-router-dom';
import Rating from '../../../components/UI/Rating/Rating';
// Default Image
import defaultImage from '../../../assets/favicon/android-icon-48x48.png';

const review = (props) => {
    return (
        <div className={classes.Header}>
            <div className={classes.HeaderContainer}>
                {/* Image */}
                <div className={classes.HeaderItem}>
                    <div className={classes.ImageContainer}>
                        <NavLink 
                            to={['../   users/', props.userId].join(' ')}
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
                            <span className={classes.Username}>{props.username ? props.username : 'Username'}</span>
                            <span style={{margin: '0 1ch 0 1ch'}}>-</span>
                            <span className={classes.Date}>Month, Year</span>
                        </div>
                        <div className={classes.Rating}>
                            <Rating height={'15px'} width={'15px'} type='stars' />
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.DescriptionContainer}>
                <div dir='ltr' className={classes.Description}>
                    {/* TODO remove placeholder lorem ipsum */}
                    {props.description ? props.description : 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.'}
                </div>
            </div>
            <div className={classes.SeparatorWrapper}><div  className={classes.Separator}/></div>
        </div>
    );
}

export default review;