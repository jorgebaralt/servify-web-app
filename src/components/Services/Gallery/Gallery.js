import React from 'react';
// CSS
import classes from './Gallery.module.css';

const gallery = (props) => {
    return (
        <div className={classes.Wrapper}>
            <div ref={props.reference}
                className={classes.Container}>
                {props.children}
            </div>
        </div>
    )
}

export default gallery;