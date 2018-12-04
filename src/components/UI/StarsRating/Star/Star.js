import React from 'react';
// CSS
import classes from './Star.module.css';
// JSX
import SVG from '../../../SVG/SVG';

const star = (props) => {
    return (
        <span className={classes.Star}><SVG svg='star' fill={props.fill} /></span>
    );
}

export default star;