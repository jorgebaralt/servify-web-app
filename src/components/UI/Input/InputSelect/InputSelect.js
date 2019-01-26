import React, {Component} from 'react';
// CSS
import classes from './InputSelect.module.css';

class InputSelect extends Component {
    constructor(props) {
        super(props);
        this.myList = React.createRef();
        const display = this.props.elementConfig.displayValue;
        this.state = {
            displayValue: display ? display : '',
            bIsListOpen: false
        }
    }
    listHandler = (handler) => { 
        const list = this.myList.current; 
        switch (handler) {
            case 'open': 
                // list.style.display = 'block';
                // list.style.opacity = 1;
                return this.setState((prevState) => {
                    if (prevState.bIsListOpen === true) { 
                        list.blur(); 
                    }
                    return {
                        bIsListOpen: !prevState.bIsListOpen
                    }
                });
            case 'close': 
                return this.setState({
                    bIsListOpen: false
                });
            default:
                // do nothing
        }
    }
    
    setValue = (option, changed) => {
        switch (true) {
            case option.value === '':
                this.props.labelClasses.push(classes.SelectLabelValid);
                break;
            case option.value.length > 0:
                this.props.labelClasses.pop();
                break;
            default:
                // do nothing
        }
        this.listHandler('close'); // After selecting a category, close the list.
        if (document.addEventListener) { document.activeElement.blur(); } // Blurs (removes focus) from the list.
        if (changed) { // Protection
            changed(option.value); // this.props.changed passed from stateful container to change its state.
        }
        this.setState({
            displayValue: option.displayValue
        });
    }
    
    render () {
        this.props.inputClasses.push(classes.InputSelect);
        const listClasses = [classes.List];
        if (this.state.bIsListOpen) {
            listClasses.push(classes.Open)
        }
        return (
                <div className={classes.Wrapper}>
                    <div className={classes.InputSelectType}><strong>{this.props.elementConfig.label}</strong></div>
                    <div onClick={() => this.listHandler('open')} 
                        onBlur={() => this.listHandler('close')} 
                        tabIndex="0"
                        className={classes.Container}>
                        <input
                            disabled
                            required
                            onChange={this.handleChange}
                            style={this.props.style}
                            // If there is a default display value in the element config then display it initially, 
                            // otherwise render the value.
                            value={this.state.displayValue}
                            // value={this.props.displayValue}
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
                        <ul ref={this.myList} className={listClasses.join(' ')}>
                            {this.state.bIsListOpen ? 
                                    this.props.elementConfig.options.map( (option, index) => {
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
                                                <button type='button' onClick={() => this.setValue(option, this.props.changed)}>
                                                    {option.displayValue}
                                                </button>
                                            </li>
                                        );
                                    })
                            : null }
                        </ul>
                </div>
        );
    }
}

export default InputSelect;