import React, { Component } from 'react';
// CSS
import classes from '../../Publish.module.css';
// JSX
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';

class StepOne extends Component {
    state = {
        controls: {
            category: {
                elementType: 'select',
                elementConfig: {
                    id: 'Publish_Select',
                    label: 'Choose a category type',
                    placeholder: 'Select a category',
                    options: this.props.categoriesDatalist
                },
                value: '',
                valueType: 'text',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
        },
        formIsValid: false,
    }

    inputSelectChangeHandler = (value, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.controls,
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = value;
        updatedFormElement.valid = this.props.checkValidity(updatedFormElement.value, updatedFormElement.validation);
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
            <div style={{backgroundColor: 'lightorange'}} className={classes.Container}>
                <div className={classes.Form}>
                    <h1>
                        Hello there! We'll need some information before we can publish your service,
                        just follow these steps and you'll be good to go.
                    </h1>
                    <div className={classes.Step}><span>S</span>tep 1</div>
                    <h2>
                        What type of service do you provide?
                    </h2>
                    <form style={{userSelect: 'none'}} onSubmit={this.onSubmitHandler}>
                        {formElementsArray.map( (input) => {
                                return <Input 
                                    key={input[0]} 
                                    elementType={input[1].elementType} 
                                    elementConfig={this.state.controls[input[1].valueType] ? this.state.controls[input[1].valueType].elementConfig : input[1].elementConfig} // Referenced to state to mutate
                                    changed={(event) => this.inputSelectChangeHandler(event, input[0])}
                                    invalid={!input[1].valid}
                                    shouldValidate={input[1].validation}
                                    touched={input[1].touched}
                                    value={input[1].value} 
                                    valueType={input[1].valueType} />;
                            })}
                        {/* <Button type='primary' disabled={!this.state.formIsValid}>Next</Button> */}
                    </form>
                </div>
            </div>
        )
    }
}

export default StepOne;