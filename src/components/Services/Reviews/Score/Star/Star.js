import React from 'react';
// CSS
import classes from './Star.module.css';
// JSX
import SVG from '../../../../SVG/SVG';

const star = (props) => {
    const starClasses = [classes.Star];
    if (props.className) {
        starClasses.push(props.className);
    }
    return (
        <span 
            className={starClasses.join(' ')}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            onClick={props.onClick}>
            <SVG svg='star' {...props.config} fill={props.fill} />
        </span>
    );
}

export default star;