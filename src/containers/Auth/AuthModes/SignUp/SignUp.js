import React, { PureComponent } from 'react';
// CSS
import classes from '../../Auth.module.css';
// Redux & Sagas Creator
import { connect } from 'react-redux'
import { authCreator, authActions } from '../../../../store/actions/';
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
import Loading from '../../../../components/UI/LoadingDots/LoadingDots';

class SignUp extends PureComponent {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    autoComplete: 'email',
                    placeholder: 'Email',
                    autoCorrect:"off",
                    autoCapitalize:"off",
                    spellCheck:"false"
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
                    autoCorrect:"off",
                    autoCapitalize:"on",
                    spellCheck:"false"
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
                    autoCorrect:"off",
                    autoCapitalize:"on",
                    spellCheck:"false"
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
                    autoCorrect:"off",
                    autoCapitalize:"off",
                    spellCheck:"false"
                },
                value: '',
                valueType: 'password',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                style: {marginBottom: '22px'}
            },
        },
        bRememberMe: true,
        bMarketingPrompt: false,
        bShowPassword: false,
        bSignUpWithEmail: false,
        formIsValid: false,
        loading: false
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
        });
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
        const displayName = [this.state.controls.firstName.value, this.state.controls.lastName.value].join(' ');
        this.props.onSignUpHandler(this.state.controls.email.value, this.state.controls.password.value, this.state.bRememberMe, displayName);
    }
    
    setLoading = () => {
        this.setState({
            loading: false
        });
    }

    componentDidUpdate() {
        if (this.state.loading && this.props.errorMessage) {
            this.setState({
                loading: false
            });
        }
    }

    componentWillUnmount() {
        if (this.props.errorMessage) {
            this.props.resetErrorMessage();
        }
    }

    render() {
        const formElementsArray = Object.entries(this.state.controls);
        return (
            <div className={classes.Container}>  
                <Button clicked={() => this.props.onFacebookSignInHandler(this.state.bRememberMe)} 
                    type='facebook' blockButton={true}>Sign up with Facebook</Button>
                <Button clicked={() => this.props.onGoogleSignInHandler(this.state.bRememberMe)} 
                    type='google' blockButton={true}>Sign up with Google</Button>
                <OrSeparator />
                <Button type='auth' clicked={this.toggleSignUpWithEmail} blockButton={true}>Sign up with Email</Button>
                {this.props.errorMessage ? 
                    <div className={classes.Error}>{this.props.errorMessage}</div> 
                    : null}
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
                        <Button style={{minHeight: '46px'}} clicked={this.setLoading} submit disabled={!this.state.formIsValid} type='auth' blockButton={true}>
                            {this.state.loading ? <div className={classes.Loading}><Loading /></div> : 'Sign up'}
                        </Button>
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
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
		errorMessage: state.authReducer.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignUpHandler: (email, password, bRememberMe, displayName) => dispatch(authCreator.authSignUpInit(email, password, bRememberMe, displayName)),
		onFacebookSignInHandler: (bRememberMe) => dispatch(authCreator.authFacebook.signUpInit(bRememberMe)),
		onGoogleSignInHandler: (bRememberMe) => dispatch(authCreator.authGoogle.signUpInit(bRememberMe)),
		resetErrorMessage: () => dispatch(authActions.authResetErrorMessage())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);