import React from 'react';
// CSS
import classes from './Slide.module.css';

const slide = (props) => {
    return (
        <div className={classes.Wrapper} style={props.style}>
            {props.children}
        </div>
    );
}

export default slide;