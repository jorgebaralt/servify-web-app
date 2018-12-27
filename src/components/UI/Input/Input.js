import React from 'react';

import classes from './Input.module.css'

const input = (props) => {
    let inputElement;
    const inputClasses = [classes.InputElement];
    const labelClasses = [classes.Label];
    let validationMessage = null;

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        validationMessage = <p className={classes.InvalidFeedback}>Please enter a valid {props.valueType}.</p>;
    } else if (!props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Valid);
        validationMessage = <p className={classes.ValidFeedback}>Looks good!</p>;
    }

    switch (props.elementType) {
        case('input' || 'text' || 'email' || 'number'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                required
                value={props.value}
                onChange={props.changed}
                />;
            break;
        case('textarea'):
            labelClasses.push(classes.TextAreaLabel);
            inputClasses.push(classes.TextAreaElement);
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                required
                value={props.value}
                onChange={props.changed}
                />;
            break;
        case('select'):
            inputElement = (
                <>
                    <div><strong>{props.elementConfig.type}</strong></div>
                    <select 
                        className={inputClasses.join(' ')}
                        defaultValue={props.value}
                        onChange={props.changed}>
                        {props.elementConfig.options.map( (option, index) => {
                            return (
                                <option key={index} value={option.value}>
                                    {option.displayValue}
                                </option>
                            );
                        })}
                    </select>
                </>
            );
            break;
        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                defaultValue={props.value}
                onChange={props.changed} />;
    }
    return (
        <div style={props.style}
            className={classes.Input}>
            {inputElement}
            {validationMessage}
            {/* <span className="highlight"></span> */}
            <span className={classes.Bar}></span>
            <label className={labelClasses.join(' ')}>{props.elementConfig.placeholder}</label>
        </div>
    );
}

export default input;