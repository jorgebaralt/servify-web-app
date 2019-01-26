import React, { PureComponent } from 'react';
// CSS
import classes from '../../Publish.module.css';
// Image
import logo from '../../../../assets/images/servify-logos/yellowborder-nobg.png';
// JSX
import Input from '../../../../components/UI/Input/Input';
import ImageFadeIn from '../../../../components/UI/ImageFadeIn/ImageFadeIn';

const datalist = [
    {
        value: {
            bool: false,
            display: 'physical',
        },
        displayValue: 'Physical store only.'
    },
    {
        value: {
            bool: true,
            display: 'both',
        },
        displayValue: 'Physical store and deliveries.'
    },
    {
        value: {
            bool: true,
            display: 'delivery',
        },
        displayValue: 'Deliveries only.'
    }
];

class StepFive extends PureComponent {
    state = {
        controls: {
            option: {
                elementType: 'select',
                elementConfig: {
                    label: 'Choose an option that is appropriate to your service',
                    placeholder: 'Select an option',
                    options: datalist
                },
                value: '',
                valueType: 'text',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            }
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
        updatedFormElement.valid = this.props.checkValidity(updatedFormElement.value.display, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            if (!updatedOrderForm[inputIdentifier]) { continue; } // Pointer protection
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            controls: updatedOrderForm, 
            formIsValid: formIsValid
        });
    }

    componentDidUpdate = () => {
        const data = {};
        for (let key in this.state.controls) {
            if (!this.state.controls[key].value) { // Pointer protection
                continue;
            }
            // data[key] = JSON.parse((this.state.controls[key].value).toLocaleLowerCase());
            data[key] = this.state.controls[key].value;
        }
        const formIsValid = this.state.formIsValid;
        this.props.updateData(this.props.stepKey, data, formIsValid);
    }

    render () {
        const containerClasses = [classes.Container];
        if (this.props.activeStep !== this.props.stepKey) {
            containerClasses.push(classes.Hidden);
        }
        const formElementsArray = Object.entries(this.state.controls);
        return (
            <div className={containerClasses.join(' ')}>
                <div className={classes.FormWrapper}>
                    <div className={classes.FormContainer}>
                        <div className={classes.Step}><span>S</span>tep 5: Logistic</div>
                        <h2>
                            Is your service offered in a physical store (e.g. tire outlet) 
                            and/or are deliveries available (e.g. food delivery)? We'll use this 
                            information to let customers know all the available options, it'll 
                            also be displayed in the service page!
                        </h2>
                        <form style={{userSelect: 'none'}} onSubmit={this.onSubmitHandler}>
                            {formElementsArray.map( (input) => {
                                if (!input[1] || !input[0]) { return null; } // Pointer protection
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
                        </form>
                    </div>
                </div>
                <div className={classes.ImageWrapper}>
                    <div className={classes.ImageContainer}>
                        <ImageFadeIn draggable={false} src={logo} />
                    </div>
                </div>
            </div>
        );
    }
}

export default StepFive;