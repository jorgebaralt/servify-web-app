import React, { Component } from 'react';
// Input Validity
import { checkValidity } from '../../shared/checkValidity';
// JSX
import Reasons from '../../components/Contact/Reasons/Reasons';
import Options from '../../components/Contact/Options/Options';
import Form from '../../components/Contact/Form/Form';

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
        this.setState((prevState) => {
            return {
                contactForm: {
                    ...prevState.contactForm,
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
        return nextState !== this.state || nextProps.children !== this.props.children;
    }

	render () {
        let ActiveRender = <Reasons reasons={this.state.reasons} toggleIsReasonSelected={this.toggleIsReasonSelected}/>
        switch (true) {
            case this.state.bIsFormActive:
                ActiveRender = (
                    <Form activeReason={this.state.activeReason}
                        onSubmitHandler={this.onSubmitHandler}
                        inputChangeHandler={this.inputChangeHandler}
                        toggleIsFormSelected={this.toggleIsFormSelected}
                        {...this.state.contactForm} />
                );
                break;
            case this.state.bIsReasonSelected:
                ActiveRender = (
                    <Options activeReason={this.state.activeReason} 
                        toggleIsReasonSelected={this.toggleIsReasonSelected} 
                        toggleIsFormSelected={this.toggleIsFormSelected} />
                );
                break;
            default:
                // do nothing
        }
		return (
            ActiveRender
		);
	}
}

export default Contact;
