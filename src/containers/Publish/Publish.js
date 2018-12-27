import React, { Component } from 'react';
import categories from '../../shared/categories';
// Input Validity
import { checkValidity } from '../../shared/checkValidity';
// CSS
import classes from './Publish.module.css';
// JSX
import { Slider, Slide } from '../../components/UI/Slider';
import Input from '../../components/UI/Input/Input';

const categoriesDatalist = categories.map( (category) => {
    return {
        value: category.title,
        displayValue: category.title
    };
});

console.log(categoriesDatalist);


class Publish extends Component {
    state = {
        controls: {
            categories: {
                elementType: 'select',
                elementConfig: {
                    id: 'Publish_Select',
                    type: 'Choose a category type',
                    placeholder: 'Select a category',
                    options: categoriesDatalist
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

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.controls,
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
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
    
    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.bRememberMe);
    }

    render() {
        const selectInput = Object.entries(this.state.controls.categories);
        console.log(selectInput)
        return (
            <div className={classes.Wrapper}>
                <Slider>
                    <Slide>
                        <div className={classes.Container}>
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
                                    <Input 
                                        style={this.state.controls.categories.style}
                                        elementType={this.state.controls.categories.elementType} 
                                        elementConfig={this.state.controls.categories.elementConfig}
                                        changed={(event) => this.inputChangeHandler(event, this.state.controls[categories])}
                                        invalid={!this.state.controls.categories.valid}
                                        shouldValidate={this.state.controls.categories.validation}
                                        touched={this.state.controls.categories.touched}
                                        value={this.state.controls.categories.value} 
                                        valueType={this.state.controls.categories.valueType} />
                                </form>
                            </div>
                        </div>
                    </Slide>
                    <Slide>
                        <div style={{backgroundColor: 'lightgreen'}} className={classes.Container}>
                            <h1>There</h1>
                        </div>
                    </Slide>
                    <Slide>
                        <div style={{backgroundColor: 'lightyellow'}} className={classes.Container}>
                            <h1>General Kenobi!</h1>
                        </div>
                    </Slide>
                </Slider>
            </div>
        );
    }
}

export default Publish;