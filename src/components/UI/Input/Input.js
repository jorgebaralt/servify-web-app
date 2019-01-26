import React from 'react';
// CSS
import classes from './Input.module.css'
// JSX
import InputSelect from './InputSelect/InputSelect';

const input = (props) => {
    let inputElement;
    let validationMessage = null;
    const inputClasses = [classes.InputElement];
    const labelClasses = [classes.Label];
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
                // style={props.elementConfig.disabled ? { cursor: 'not-allowed' } : null}
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
                // style={props.elementConfig.disabled ? { cursor: 'not-allowed' } : null}
                {...props.elementConfig} 
                required
                value={props.value}
                onChange={props.changed}
                />;
            break;
        case('select'):
            labelClasses.push(classes.InputSelectLabel);
            inputElement = (
                <InputSelect
                    inputClasses={inputClasses}
                    labelClasses={[classes.Label]}
                    {...props} />
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
            {props.elementType === 'select' ? 
                null :
                <>
                    <span className={classes.Bar}></span>
                    <label className={labelClasses.join(' ')}>{props.elementConfig.placeholder}</label>
                </>
            }
        </div>
    );
}

export default input;