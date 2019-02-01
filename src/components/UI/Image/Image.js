import React from 'react';
// CSS
import classes from './Image.module.css';

const Image = (props) => {
    return (
        props.noWrapper ? 
            <img 
                style={props.style} 
                className={props.className ? props.className : classes.Image} 
                draggable={props.draggable} 
                src={props.src} alt='' />
        : (
            <div className={classes.Wrapper}>
                <img 
                    style={props.style} 
                    className={props.className ? props.className : classes.Image} 
                    draggable={props.draggable} 
                    src={props.src} alt='' />
            </div>
        )
    );
}

export default Image;