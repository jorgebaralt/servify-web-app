import React, { Component } from 'react';
import categories from '../../shared/categories';
// Input Validity
import { checkValidity } from '../../shared/checkValidity';
// CSS
import classes from './Publish.module.css';
// JSX
import { Slider, Slide } from '../../components/UI/Slider';

const categoriesDatalist = categories.map( (category) => {
    return category.title;
});

console.log(categoriesDatalist);


class Publish extends Component {
    state = {
        controls: {
            categories: {
                elementType: 'select',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Select a Category',
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

    render() {
        return (
            <div className={classes.Wrapper}>
                <Slider>
                    <Slide>
                        <div style={{backgroundColor: 'lightblue'}} className={classes.Container}>
                            <div className={classes.Form}>
                                <h1>
                                    Hello there! We'll need some information before we can publish your service,
                                    just follow the steps.
                                </h1>
                                <div className={classes.Step}><span>S</span>tep 1</div>
                                <h2>
                                    What type of service do you provide?
                                </h2>
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