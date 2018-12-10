import React from 'react';
// CSS
import classes from './Currency.module.css';
// JSX
import SVG from '../../../../SVG/SVG';

const star = (props) => {
    return (
        <span className={classes.Currency}><SVG svg='currency' fill={props.fill} /></span>
    );
}

export default star;