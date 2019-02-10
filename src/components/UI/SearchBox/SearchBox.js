import React, { Component } from 'react';
// Check validity
import { checkValidity } from '../../../shared/checkValidity';
// CSS
import classes from './SearchBox.module.css';
// JSX
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import Input from '../Input/Input';
import Button from '../Button/Button';
import SVG from '../../SVG/SVG';

class Container extends Component {
    state = {
        controls: {
            category: {
                elementType: 'select',
                elementConfig: {
                    placeholder: 'Select a category',
                    options: this.props.categoriesDatalist
                },
                value: '',
                valueType: 'text',
                validation: {
                    required: false
                },
                valid: false,
                touched: false,
            },
        }
    }

    inputSelectChangeHandler = (value, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.controls,
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            controls: updatedOrderForm, 
            formIsValid: formIsValid
        });
    }

    render () {
        const formElementsArray = Object.entries(this.state.controls);
        return (
            <>
                <div className={classes.SearchBox}>
                    <h1>What service are you looking for?</h1>
                    <br />
                    {/* SERVICES */}
                    <small>Services</small>
                    <SearchBar id={this.props.id} />
                    <br />
                    {/* CATEGORIES */}
                    <small style={{marginBottom: '-32px'}}>Categories</small>
                    {formElementsArray.map( (input) => {
                        return (
                            <Input 
                                style={input[1].style}
                                key={input[0]} 
                                elementType={input[1].elementType} 
                                elementConfig={this.state.controls[input[1].valueType] ? this.state.controls[input[1].valueType].elementConfig : input[1].elementConfig} // Referenced to state to mutate
                                changed={(event) => this.inputSelectChangeHandler(event, input[0])}
                                invalid={!input[1].valid}
                                shouldValidate={input[1].validation}
                                touched={input[1].touched}
                                value={input[1].value} 
                                valueType={input[1].valueType} />
                        );
                    })}
                    <br />
                    {/* If there is a value selected, the button is valid and pushes the history to the service page. */}
                    <Link to={{ 
                            pathname: '/services',
                            state: { activeCategory: this.state.controls.category.value }
                        }}>
                        <Button disabled={!this.state.controls.category.value.length} blockButton className={classes.Button} type={'primary'}>Search Categories</Button>
                    </Link>
                </div>
                <Link style={{textDecoration: 'none'}} to='/publish/overview'>
                    <div className={classes.MakeMoneyContainer}>
                        <span className={classes.MakeMoney}>
                            <SVG className={classes.Tools} svg="tools" />&nbsp;
                            <span>Gain customers by listing your services on Servify</span>
                            <SVG className={classes.RightArrow} svg="right-arrow" />
                        </span>
                    </div>
                </Link>
            </>
        )
    }
}

const searchBox = {
    widescreen: (props) => {
        const { categoriesDatalist } = props;
        return (
            <div className={classes.Widescreen}>
                <Container id={'Widescreen_SearchBox'} categoriesDatalist={categoriesDatalist} />
            </div>
        );
    },
    mobile: (props) => {
        const { categoriesDatalist } = props;
        return (
            <div className={classes.Mobile}>
                <Container id={'Mobile_SearchBox'}  categoriesDatalist={categoriesDatalist} />
            </div>
        );
    }
}

export default searchBox;