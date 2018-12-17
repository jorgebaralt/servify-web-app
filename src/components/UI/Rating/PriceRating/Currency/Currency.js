import React from 'react';
// CSS
import classes from './Currency.module.css';
// JSX
import SVG from '../../../../SVG/SVG';

const star = (props) => {
    return (
        <span
            onClick={props.onClick}
            style={props.containerStyle}
            className={[classes.Currency, props.containerClassname].join(' ')}>
            <SVG svg='currency' 
                viewBox={props.viewBox}
                width={props.width} 
                height={props.height} 
                style={props.style} 
                fill={props.fill} />
        </span>
    );
}

export default star;