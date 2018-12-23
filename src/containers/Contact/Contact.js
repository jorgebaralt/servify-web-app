import React, { Component } from 'react';
// Input Validity
import { checkValidity } from '../../shared/checkValidity';
// CSS
import classes from './Contact.module.css';
// JSX
import SVG from '../../components/SVG/SVG';
import Separator from '../../components/UI/Separator/Separator';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

const Reason = (props) => {
    return (
        <div onClick={props.toggleIsReasonSelected} className={classes.ReasonContainer}>
            <div className={classes.Reason}>
                <SVG svg={props.svg} />
                <div className={classes.Description}>
                    <span>{props.text}</span>
                </div>
            </div>
        </div>
    );
}

const Option = (props) => {
    return (
        <div>
            <div className={classes.Option}>
                <span>{props.option}</span>
                <Button clicked={props.toggleIsFormSelected} type='primary'>Next</Button>
            </div>
            <Separator />
        </div>
    )
}

class Contact extends Component {
    state = {
        reasons: {
            myAccount: {
                svg: 'my-account',
                text: 'Your account',
                options: ['My account options.', 'Lorem ipsum is dummy text.', 'Lorem ipsum is dummy text.', 'Lorem ipsum is dummy text.']
            },
            servicePost: {
                svg: 'service-post',
                text: 'Published services',
                options: ['Published services options.', 'Lorem ipsum is dummy text.', 'Lorem ipsum is dummy text.', 'Lorem ipsum is dummy text.']
            },
            security: {
                svg: 'security',
                text: 'Security and rights to refuse service',
                options: ['Security and rights to refuse service options.', 'Lorem ipsum is dummy text.', 'Lorem ipsum is dummy text.', 'Lorem ipsum is dummy text.']
            },
            other: {
                svg: 'other',
                text: 'Other',
                options: ['Other options.', 'Lorem ipsum is dummy text.', 'Lorem ipsum is dummy text.', 'Lorem ipsum is dummy text.']
            }
        },
        bIsReasonSelected: false,
        activeReason: null,
        bIsFormActive: false,
        contactForm: {
            activeOption: null,
            controls: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        disabled: true,
                        type: 'text',
                        autoComplete: 'first name',
                        placeholder: 'Account name here', // TODO account name displayed here
                        autoCorrect:"off",
                        autoCapitalize:"on",
                        spellCheck:"false"
                    },
                    value: '',
                    valueType: 'text',
                    validation: {
                        required: true
                    },
                    valid: true,
                    touched: false,
                },
                textArea: {
                    elementType: 'textarea',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Please enter detailed information about the problem.',
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
            formIsValid: false
        }
    }

    toggleIsReasonSelected = (reason) => {
        window.scrollTo(0,0); // Scrolls to top
        this.setState( (prevState) => {
            return {
                bIsReasonSelected: !prevState.bIsReasonSelected,
                activeReason: reason
            }
        });
    }

    toggleIsFormSelected = (index) => {
        console.log(index, this.state.activeReason.options[index])
        window.scrollTo(0,0); // Scrolls to top
        this.setState( (prevState) => {
            return {
                bIsFormActive: !prevState.bIsFormActive,
                contactForm: {
                    ...prevState.contactForm,
                    activeOption: this.state.activeReason.options[index]
                }
            }
        });
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.contactForm.controls,
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
        this.setState(() => {
            return {
                contactForm: {
                    controls: updatedOrderForm, 
                    formIsValid: formIsValid
                }
            }
        });
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.bRememberMe);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state || nextProps.children !== this.props.children;
    }

	render () {
        const Reasons = Object.entries(this.state.reasons).map( (reason, index) => {
            return (
                <Reason toggleIsReasonSelected={() => this.toggleIsReasonSelected(this.state.reasons[reason[0]])}
                    key={index} 
                    svg={reason[1].svg}
                    text={reason[1].text} />
            );
        });
        const ContactReasons = (
            <div className={classes.Container}>
                <h1>Contact us</h1>
                <div className={classes.Intro}>
                    <h2>We need to know why are you contacting us</h2>
                    <p>
                        We categorize possible topics on why you might be trying to reach us to make things more efficient, 
                        select the most suitable option for you. If you think none are suitable, please select 'Other'.
                    </p>
                </div>
                <div className={classes.ReasonsContainer}>
                    {Reasons}
                </div>
            </div>
        );
        let ActiveRender = ContactReasons;
        switch (true) {
            case this.state.bIsFormActive:
                console.log(this.state)
                const formElementsArray = Object.entries(this.state.contactForm.controls);
                ActiveRender = (
                    <div className={classes.Container}>
                        <h1>Contact us</h1>
                        <div className={classes.Intro}>
                            <h2>{this.state.activeReason.text}</h2>
                            <p>{this.state.contactForm.activeOption}</p>
                            <Separator />
                            <h2 style={{marginBottom: '-30px'}}>Ticket Information</h2>
                        </div>
                        <form style={{userSelect: 'none'}} onSubmit={this.onSubmitHandler}>
                            {formElementsArray.map( (input) => {
                                return <Input 
                                    style={input[1].style}
                                    key={input[0]} 
                                    elementType={input[1].elementType} 
                                    elementConfig={this.state.contactForm.controls[input[1].valueType] ? this.state.contactForm.controls[input[1].valueType].elementConfig : input[1].elementConfig} // Referenced to state to mutate
                                    changed={(event) => this.inputChangeHandler(event, input[0])}
                                    invalid={!input[1].valid}
                                    shouldValidate={input[1].validation}
                                    touched={input[1].touched}
                                    value={input[1].value} 
                                    valueType={input[1].valueType} />;
                            })}
                            <Button style={{marginTop: '20px'}} disabled={!this.state.contactForm.formIsValid} type='success' blockButton={true}>Submit</Button>
                        </form>
                        <Separator />
                        <Button blockButton type='primary' clicked={this.toggleIsFormSelected}>Go back</Button>
                    </div>
                );
                break;
            case this.state.bIsReasonSelected:
                ActiveRender = (
                    <div className={classes.Container}>
                        <h1>Contact us</h1>
                        <div className={classes.Intro}>
                            <h2>{this.state.activeReason.text}</h2>
                            <p>Choose one of the following options</p>
                        </div>
                            {this.state.activeReason.options.map( (option, index) => {
                                return (
                                    <Option key={index} 
                                        option={option} 
                                        toggleIsFormSelected={() => this.toggleIsFormSelected(index)} />
                                );
                            })}
                        <br/>
                        <Button blockButton type='primary' clicked={() => this.toggleIsReasonSelected(null)}>Go back</Button>
                    </div>
                );
                break;
            default:
                // do nothing
        }
        if (this.state.bIsReasonSelected) {
            
        }
		return (
            ActiveRender
		);
	}
}

export default Contact;
