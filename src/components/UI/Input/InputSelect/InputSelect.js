import React from 'react';
// CSS
import classes from './InputSelect.module.css';

const inputSelect = (props) => {
    const listHandler = (id, handler) => { 
        const list = document.getElementById(id); 
        console.log('ping', list)
        switch (handler) {
            case 'open': 
                console.log('open', list)
                list.style.display = 'block';
                list.style.opacity = 1;
                break;
            case 'close': 
                console.log('close', list)
                list.style.display = 'none';
                list.style.opacity = 0;
                break;
            default:
                // do nnothing
        }
    }
    const setValue = (inputId, listId, value, changed) => {
        const input = document.getElementById(inputId);
        input.value = value;
        switch (true) {
            case value === '':
                props.labelClasses.push(classes.SelectLabelValid);
                break;
            case value.length > 0:
                props.labelClasses.pop();
                break;
            default:
                // do nothing
        }
        listHandler(listId, 'close'); // After selecting a category, close the list.
        if (document.addEventListener) { document.activeElement.blur(); } // Blurs (removes focus) from the list.
        changed(value); // props.changed passed from stateful container to change its state.
    }
    const inputId = [props.elementConfig.id, 'Input_Select_Input'].join('_');
    const listId = [props.elementConfig.id, 'Input_Select_List'].join('_');
    props.inputClasses.push(classes.InputSelect);
    return (
            <div className={classes.Wrapper}>
                <div className={classes.InputSelectType}><strong>{props.elementConfig.label}</strong></div>
                <div onFocus={() => listHandler(listId, 'open')} 
                    onBlur={() => listHandler(listId, 'close')} 
                    tabIndex="0"
                    className={classes.Container}>
                    <input
                        disabled
                        required
                        style={props.style}
                        id={inputId}
                        placeholder={props.elementConfig.placeholder}
                        className={props.inputClasses.join(' ')} >
                    </input>
                    <div tabIndex="0"
                        className={classes.ArrowWrapper}>
                        <div className={classes.ArrowContainer}>
                            <span className={classes.Arrow} />
                        </div>
                    </div>
                </div>
                <ul id={listId}
                    className={classes.List}>
                    {props.elementConfig.options.map( (option, index) => {
                        return (
                            <li key={index}
                                /**
                                * onMouseDown event fires before onBlur event on input. It calls event.preventDefault() to
                                * prevent onBlur from being called, and doesn't prevent the navLink click from happening, 
                                * this guarantees that the NavLink will redirect on click without having to use SetTimeout 
                                * or any other hack.
                                    */
                                onMouseDown={event => event.preventDefault()}
                                value={option.value}>
                                <button type='button' onClick={() => setValue(inputId, listId, option.value, props.changed)}>
                                    {option.displayValue}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
    );
}

export default inputSelect;