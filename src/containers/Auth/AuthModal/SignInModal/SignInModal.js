import React, { Component } from 'react';
// CSS
import classes from '../AuthModal.module.css'
// Input Validity
import { checkValidity } from '../../../../shared/checkValidity';
// JSX
import OrSeparator from '../../../../components/UI/AuthModal/OrSeparator/OrSeparator';
import Separator from '../../../../components/UI/AuthModal/Separator/Separator';
import UtilContainer from '../../../../components/UI/AuthModal/UtilContainer/UtilContainer';
import AuthModalSwitch from '../../../../components/UI/AuthModal/AuthModalSwitch/AuthModalSwitch';
import Button from '../../../../components/UI/Button/Button';
import Input from '../../../../components/UI/Input/Input';

class SignInModal extends Component {

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
                style: {marginTop: 0}
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    autoComplete: 'current-password',
                    placeholder: 'Password'
                },
                value: '',
                valueType: 'password',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false,
                style: null
            },
        },
        bRememberMe: false,
        bShowPassword: false,
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
            ...this.state.controls
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
                <Button type='facebook' blockButton={true}>Sign in with Facebook</Button>
                <Button type='google' blockButton={true}>Sign in with Google</Button>
                <OrSeparator />
                <form style={{userSelect: 'none'}} onSubmit={this.onSubmitHandler}>
                    {formElementsArray.map( (input) => {
                        return <Input 
                            style={input[1].style}
                            key={input[0]} 
                            elementType={input[1].elementType} 
                            elementConfig={this.state.controls[input[1].valueType].elementConfig} // Referenced to state to mutate
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
                    <Button disabled={!this.state.formIsValid} type='auth' blockButton={true}>Sign in</Button>
                    <div className={classes.ForgotPasswordContainer}>
                        <button type="button" 
                            className={classes.ForgotPassword} 
                            aria-busy="false">Forgot password</button>
                    </div>
                </form>
                <Separator />
                <AuthModalSwitch 
                    text="Don't have an account yet?"
                    switchText='Sign up!'
                    switchAuthModalHandler={() => this.props.switchAuthModalHandler('sign up')} />
            </>
        );
    }
};

export default React.memo(SignInModal);