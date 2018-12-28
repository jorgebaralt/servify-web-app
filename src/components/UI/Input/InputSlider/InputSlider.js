import React from 'react';
// CSS
import classes from './InputSlider.module.css'

const inputSlider = (props) => {
    return (
        <div className={classes.Container}>
            <div className={classes.Header}>{props.header}: <strong>{props.value} {props.valueType ? props.valueType : null}</strong></div>
            <input className={classes.Slider} 
                name={props.name}
                ref={props.ref} 
                type="range" 
                onChange={(event) => props.onChange(event)}
                step="1"
                min="1" 
                max="300"
                value={props.value} />
        </div>
    );
}

export default inputSlider;