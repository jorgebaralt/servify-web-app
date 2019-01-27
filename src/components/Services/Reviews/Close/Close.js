import React from 'react';
// CSS
import classes from './Close.module.css';
// JSX
import SVG from '../../../SVG/SVG';

const close = (props) => {
    return (
        <span className={classes.Wrapper} onClick={props.onClick}>
            <i className={classes.Icon}><SVG svg='cancel' /></i>
        </span>
    );
}

export default close;