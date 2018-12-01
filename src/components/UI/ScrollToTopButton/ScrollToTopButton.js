import React from 'react';

import classes from './ScrollToTopButton.module.css';

const scrollToTopButton = (props) => {
    return (
        <div className={classes.ScrollToTopButton} onClick={props.clicked}>
            <span></span>
        </div>
    );
}

export default scrollToTopButton;