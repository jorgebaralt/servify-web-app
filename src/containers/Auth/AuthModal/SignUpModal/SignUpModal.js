import React, { Component } from 'react';
// CSS
import classes from '../AuthModal.module.css'
// Input Validity
import { checkValidity } from '../../../../shared/checkValidity';
// JSX
import Button from '../../../../components/UI/Button/Button';
import Input from '../../../../components/UI/Input/Input';
import SVG from '../../../../components/SVG/SVG';

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
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state || nextProps.children !== this.props.children;
    }

    render() {
        const formElementsArray = Object.entries(this.state.controls);
        let checked;
        if (this.state.bRememberMe) {
            checked = classes.Checked;
        }
        return (
            <>  
                <Button type='facebook' blockButton={true}>Sign up with Facebook</Button>
                <Button type='google' blockButton={true}>Sign up with Google</Button>
                <div className={classes.SeparatorWrapper}>
                    <div className={classes.SeparatorContainer}>
                        <div className={classes.Line} />
                        <span className={classes.Option}>or</span>
                    </div>
                </div>
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
                        <div className={classes.UtilContainer}>
                            <div className={classes.RememberPasswordWrapper}>
                                <div className={classes.RememberPasswordContainer} onClick={this.toggleRememberMe}>
                                    <div className={classes.RememberPassword}>
                                        <div className={classes.RememberPasswordCheckbox}>
                                            <div>
                                                <input type="checkbox"
                                                    aria-invalid="false" 
                                                    id="AuthModal__LoginRememberMeCheckbox" 
                                                    name="remember_me" 
                                                    value="1" 
                                                    defaultChecked={this.state.bRememberMe} />
                                                <span className={checked}>
                                                    {/* SVG Here */}
                                                    <SVG svg='checkmark-nobg'/>
                                                </span>
                                            </div>
                                        </div>
                                        <div className={classes.RememberMeContainer}>
                                            <span className={classes.RememberMe}>Remember me</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.ShowPasswordWrapper}>
                                <button type="button"
                                    onClick={this.toggleShowPassword}
                                    className={classes.ShowPassword} 
                                    aria-busy="false">{this.state.bShowPassword ? 'Hide password' : 'Show password'}</button>
                            </div>
                        </div>
                        <Button disabled={!this.state.formIsValid} type='auth' blockButton={true}>Sign up</Button>
                        <div className={classes.ForgotPasswordContainer}>
                            <button type="button" 
                                className={classes.ForgotPassword} 
                                aria-busy="false">Forgot password</button>
                        </div>
                    </form>
                    : null
                }
                <div style={{margin: '10px auto'}} className={classes.SeparatorWrapper}><div className={classes.SeparatorContainer}><div className={classes.Line} /></div></div>
                <div className={classes.NoAccountWrapper}>
                    <div className={classes.NoAccountContainer}>
                        <span className={classes.DontHaveAccount}>Already have a Servify account?</span>
                        <span onClick={() => this.props.switchAuthModalHandler('sign in')} className={classes.SignUp}>Log in</span>
                    </div>
                </div>
            </>
        );
    }
};

export default React.memo(SignUpModal);