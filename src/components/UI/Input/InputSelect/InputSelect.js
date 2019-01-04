import React, {Component} from 'react';
// CSS
import classes from './InputSelect.module.css';

class InputSelect extends Component {
    constructor(props) {
        super(props);
        this.myList = React.createRef();
        this.myInput = React.createRef();
    }

    listHandler = (handler) => { 
        const list = this.myList.current; 
        switch (handler) {
            case 'open': 
                list.style.display = 'block';
                list.style.opacity = 1;
                break;
            case 'close': 
                list.style.display = 'none';
                list.style.opacity = 0;
                break;
            default:
                // do nothing
        }
    }
    
    setValue = (value, changed) => {
        const input = this.myInput.current;
        input.value = value;
        switch (true) {
            case value === '':
                this.props.labelClasses.push(classes.SelectLabelValid);
                break;
            case value.length > 0:
                this.props.labelClasses.pop();
                break;
            default:
                // do nothing
        }
        this.listHandler('close'); // After selecting a category, close the list.
        if (document.addEventListener) { document.activeElement.blur(); } // Blurs (removes focus) from the list.
        changed(value); // this.props.changed passed from stateful container to change its state.
    }

    render () {
        this.props.inputClasses.push(classes.InputSelect);
        return (
                <div className={classes.Wrapper}>
                    <div className={classes.InputSelectType}><strong>{this.props.elementConfig.label}</strong></div>
                    <div onFocus={() => this.listHandler('open')} 
                        onBlur={() => this.listHandler('close')} 
                        tabIndex="0"
                        className={classes.Container}>
                        <input
                            disabled
                            required
                            style={this.props.style}
                            ref={this.myInput}
                            placeholder={this.props.elementConfig.placeholder}
                            className={this.props.inputClasses.join(' ')} >
                        </input>
                        <div tabIndex="0"
                            className={classes.ArrowWrapper}>
                            <div className={classes.ArrowContainer}>
                                <span className={classes.Arrow} />
                            </div>
                        </div>
                    </div>
                    <ul ref={this.myList}
                        className={classes.List}>
                        {this.props.elementConfig.options.map( (option, index) => {
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
                                    <button type='button' onClick={() => this.setValue(option.value, this.props.changed)}>
                                        {option.displayValue}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
        );
    }
}

export default InputSelect;