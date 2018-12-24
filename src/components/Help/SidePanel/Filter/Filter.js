import React from 'react';
// CSS
import classes from './Filter.module.css';

const filter = (props) => {
    return (
        <div className={classes.FilterWrapper}>
            <div className={classes.FilterTitle}>
                <span>{props.title}</span>
            </div>
            <div className={classes.FilterContainer}>
                <div className={classes.FilterInputWrapper}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default filter;