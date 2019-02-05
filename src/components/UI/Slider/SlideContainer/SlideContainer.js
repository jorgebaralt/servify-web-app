import React from 'react';
// CSS
import classes from './SlideContainer.module.css';

const slideContainer = (props) => {
    const containerClasses = [classes.Container];
    if (props.renderOnlyActive || props.showOnlyActive) {
        containerClasses.push(classes.FadeIn);
    }
    if (props.showOnlyActive === 'hide') {
        containerClasses.push(classes.Hidden);
    }
    return (
        <div style={props.style} className={containerClasses.join(' ')}>
            {props.children}
        </div>
    );
}

export default slideContainer;