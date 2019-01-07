import React from 'react';
// CSS
import classes from './Title.module.css';

const title = (props) => {
    return (
        <div className={classes.Container}>
            <div className={classes.Title}>
                <h1 tabIndex="-1">
                    {props.children}
                </h1>
            </div>
        </div>
    );
}

export default title;