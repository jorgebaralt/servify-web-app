import React from 'react';
// CSS
import classes from './Currency.module.css';
// JSX
import SVG from '../../../../SVG/SVG';

const star = (props) => {
    const currencyClasses = [classes.Currency];
    if (props.className) {
        currencyClasses.push(props.className);
    }
    return (
        <span
            style={props.style}
            className={currencyClasses.join(' ')}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            onClick={props.onClick}>
            <SVG svg='currency' {...props.config} fill={props.fill} />
        </span>
    );
}

export default star;