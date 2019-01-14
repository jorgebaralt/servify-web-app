import React from 'react';
// CSS
import classes from './SocialButtons.module.css';
// JSX
import Share from './Share/Share';
import Favorite from './Favorite/Favorite';

const socialButtons = () => {
    return (
        <div className={classes.Container}>
            <Share />
            <Favorite />
        </div>
    )
}

export default socialButtons;