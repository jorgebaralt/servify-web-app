import React from 'react';
// CSS
import classes from './SlideContainer.module.css';

const slideContainer = (props) => {
    return (
        <div style={props.style} className={classes.Container}>
            {props.children}
        </div>
    );
}

export default slideContainer;