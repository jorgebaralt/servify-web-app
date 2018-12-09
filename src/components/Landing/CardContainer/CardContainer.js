import React from 'react';
// CSS
import classes from './CardContainer.module.css';

const cardContainer = (props) => {
    return (
        <div className={classes.CardWrapper}>
            <div className={classes.CardContainer}>
                {props.children}
            </div>
        </div>
    );
};

export default cardContainer;