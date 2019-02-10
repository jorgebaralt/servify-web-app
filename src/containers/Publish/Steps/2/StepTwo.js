import React, { PureComponent } from 'react';
// CSS
import classes from '../../Publish.module.css';
// Image
import logo from '../../../../assets/images/servify-logos/yellowborder-nobg.png';
// JSX
import Separator from '../../../../components/UI/Separator/Separator';
import Input from '../../../../components/UI/Input/Input';
import ImageFadeIn from '../../../../components/UI/ImageFadeIn/ImageFadeIn';

class StepTwo extends PureComponent {
    state = {
        controls: {
            serviceTitle: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    autoComplete: 'new-password',
                    placeholder: 'Name of your service',
                    autoCorrect:"off",
                    autoCapitalize:"off",
                    spellCheck:"false"
                },
                value: '',
                valueType: 'text',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                style: {marginTop: '28px'}
            },
            companyName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    autoComplete: 'new-password',
                    placeholder: 'Company name (optional)',
                    autoCorrect:"off",
                    autoCapitalize:"off",
                    spellCheck:"false"
                },
                value: '',
                valueType: 'text',
                validation: {
                    required: false,
                },
                valid: true,
                touched: false,
            },
            
            companyWebsite: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    autoComplete: 'new-password',
                    placeholder: 'Company website (optional)',
                    autoCorrect:"off",
                    autoCapitalize:"off",
                    spellCheck:"false"
                },
                value: '',
                valueType: 'text',
                validation: {
                    required: false,
                },
                valid: true,
                touched: false
            },
            contactPhone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    autoComplete: 'new-password',
                    placeholder: 'Contact phone (optional)',
                    autoCorrect:"off",
                    autoCapitalize:"off",
                    spellCheck:"false"
                },
                value: '',
                valueType: 'phone number',
                validation: {
                    required: false,
                    number: true
                },
                valid: true,
                touched: false
            },
            contactEmail: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    autoComplete: 'new-password',
                    placeholder: 'Contact email (optional)',
                    autoCorrect:"off",
                    autoCapitalize:"off",
                    spellCheck:"false"
                },
                value: '',
                valueType: 'email',
                validation: {
                    required: false,
                    email: true
                },
                valid: true,
                touched: false
            }
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

    componentDidUpdate = () => {
        const data = {};
        for (let key in this.state.controls) {
            if (!this.state.controls[key].value) { // Pointer protection
                continue;
            }
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
                        <div className={classes.Step}><span>S</span>tep 2: Basic Information</div>
                        <h2>
                            We need to know a bit about your service. Let's begin by asking you
                            about the name of your service and the contact information.
                        </h2>
                        <Separator />
                        <form style={{userSelect: 'none'}} onSubmit={this.onSubmitHandler}>
                            {formElementsArray.map( (input) => {
                                return (
                                    <Input 
                                        style={input[1].style}
                                        key={input[0]} 
                                        elementType={input[1].elementType} 
                                        elementConfig={this.state.controls[input[1].valueType] ? this.state.controls[input[1].valueType].elementConfig : input[1].elementConfig} // Referenced to state to mutate
                                        changed={(event) => this.inputChangeHandler(event, input[0])}
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
        )
    }
}

export default StepTwo;