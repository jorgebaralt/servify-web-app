import React, { Component } from 'react';
// Input Validity
import { checkValidity } from '../../../../shared/checkValidity';
// JSX
import OrSeparator from '../../../../components/UI/AuthModal/OrSeparator/OrSeparator';
import Separator from '../../../../components/UI/AuthModal/Separator/Separator';
import Marketing from '../../../../components/UI/AuthModal/Marketing/Marketing';
import MarketingPrompt from '../../../../components/UI/AuthModal/MarketingPrompt/MarketingPrompt';
import UtilContainer from '../../../../components/UI/AuthModal/UtilContainer/UtilContainer';
import AuthModalSwitch from '../../../../components/UI/AuthModal/AuthModalSwitch/AuthModalSwitch';
import Button from '../../../../components/UI/Button/Button';
import Input from '../../../../components/UI/Input/Input';

class SignUpModal extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    autoComplete: 'email',
                    placeholder: 'Email',
                    autocorrect:"off",
                    autocapitalize:"off",
                    spellcheck:"false"
                },
                value: '',
                valueType: 'email',
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                style: {marginTop: '22px'}
            },
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    autoComplete: 'first name',
                    placeholder: 'First name',
                    autocorrect:"off",
                    autocapitalize:"on",
                    spellcheck:"false"
                },
                value: '',
                valueType: 'text',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            lastName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    autoComplete: 'last name',
                    placeholder: 'Last name',
                    autocorrect:"off",
                    autocapitalize:"on",
                    spellcheck:"false"
                },
                value: '',
                valueType: 'text',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    autoComplete: 'current-password',
                    placeholder: 'Password',
                    autocorrect:"off",
                    autocapitalize:"off",
                    spellcheck:"false"
                },
                value: '',
                valueType: 'password',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false,
                style: {marginBottom: '22px'}
            },
        },
        bRememberMe: false,
        bMarketingPrompt: false,
        bShowPassword: false,
        bSignUpWithEmail: false,
        formIsValid: false,
    }

    componentDidMount () {
        // TODO Auth Redux Saga
        // if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
        //     this.props.onSetAuthRedirectPath();
        // }
    }

    toggleRememberMe = () => {
        this.setState( (prevState) => {
            return {
                bRememberMe: !prevState.bRememberMe
            };
        })
    }

    toggleSignUpWithEmail = () => {
        this.setState( (prevState) => {
            return {
                bSignUpWithEmail: !prevState.bSignUpWithEmail
            };
        })
    }

    toggleMarketingPrompt = () => {
        this.setState( (prevState) => {
            return {
                bMarketingPrompt: !prevState.bMarketingPrompt
            };
        })
    }

    toggleShowPassword = () => {
        const passwordConfig = {...this.state.controls.password.elementConfig}
        this.setState( (prevState) => {
            return {
                controls: {
                    ...prevState.controls,
                    password: {
                        ...prevState.controls.password,
                        elementConfig: {
                            ...prevState.controls.password.elementConfig,
                            type: prevState.bShowPassword ? passwordConfig.type = 'password' : passwordConfig.type = 'text'
                        }
                    }
                },
                bShowPassword: !prevState.bShowPassword
            };
        })
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules) {
            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }

            if (rules.minLength) {
                isValid = value.length >= rules.minLength && isValid;
            }

            if (rules.maxLength) {
                isValid = value.length <= rules.maxLength && isValid;
            }

            if (rules.email) {
                isValid = value.includes('@') && value.includes('.') && isValid;
            }
        }
        return isValid;
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

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state || nextProps.children !== this.props.children;
    }

    render() {
        const formElementsArray = Object.entries(this.state.controls);
        return (
            <>  
                <Button type='facebook' blockButton={true}>Sign up with Facebook</Button>
                <Button type='google' blockButton={true}>Sign up with Google</Button>
                <OrSeparator />
                <Button type='auth' clicked={this.toggleSignUpWithEmail} blockButton={true}>Sign up with Email</Button>
                {this.state.bSignUpWithEmail ? 
                    <form style={{userSelect: 'none'}} onSubmit={this.onSubmitHandler}>
                        {formElementsArray.map( (input) => {
                            return <Input 
                                style={input[1].style}
                                key={input[0]} 
                                elementType={input[1].elementType} 
                                elementConfig={this.state.controls[input[1].valueType] ? this.state.controls[input[1].valueType].elementConfig : input[1].elementConfig} // Referenced to state to mutate
                                changed={(event) => this.inputChangeHandler(event, input[0])}
                                invalid={!input[1].valid}
                                shouldValidate={input[1].validation}
                                touched={input[1].touched}
                                value={input[1].value} 
                                valueType={input[1].valueType} />;
                        })}
                        <UtilContainer 
                            toggleShowPassword={this.toggleShowPassword}
                            bShowPassword={this.state.bShowPassword}
                            toggleRememberMe={this.toggleRememberMe}
                            bRememberMe={this.state.bRememberMe} />
                        <Marketing />
                        <Button disabled={!this.state.formIsValid} type='auth' blockButton={true}>Sign up</Button>
                        <MarketingPrompt  
                            toggleMarketingPrompt={this.toggleMarketingPrompt}
                            bMarketingPrompt={this.state.bMarketingPrompt} />
                    </form>
                    : null
                }
                <Separator />
                <AuthModalSwitch 
                    text="Already have a Servify account?"
                    switchText='Log in'
                    switchAuthModalHandler={() => this.props.switchAuthModalHandler('sign in')} />
            </>
        );
    }
};

export default React.memo(SignUpModal);