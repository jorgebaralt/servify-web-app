import React, { PureComponent } from 'react';
// CSS
import classes from '../../Auth.module.css';
// Redux & Sagas Creator
import { connect } from 'react-redux'
import { authCreator, authActions } from '../../../../store/actions';
// Input Validity
import { checkValidity } from '../../../../shared/checkValidity';
// JSX
import SVG from '../../../../components/SVG/SVG';
import Separator from '../../../../components/UI/AuthModal/Separator/Separator';
import AuthModalSwitch from '../../../../components/UI/AuthModal/AuthModalSwitch/AuthModalSwitch';
import Button from '../../../../components/UI/Button/Button';
import Input from '../../../../components/UI/Input/Input';
import Loading from '../../../../components/UI/LoadingDots/LoadingDots';

class ResetPassword extends PureComponent {
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
        },
        formIsValid: false,
        successMessage: null,
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
        this.props.onResetPasswordHandler(this.state.controls.email.value);
        this.setState({
            successMessage: "If the provided email address matches that account's email address, then you will receive an email with a link to reset your password shortly."
        });
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
        const button = this.state.successMessage ? 
            <SVG svg='checkmark-nobg'/> 
            : (this.state.loading ? <div className={classes.Loading}><Loading /></div> : 'Email me');
        const buttonStyles = {
            minHeight: '46px',
            cursor: this.state.successMessage ? 'default' : null,
            pointerEvents: this.state.successMessage ? 'none' : null
        }
        return (
            <div className={classes.Container}>  
                <div className={classes.Header}>Reset your password</div>
                <div className={classes.Subheader}>Don't stress! You may have overlooked your password, however we can help you out. Enter your email down below and we'll send you a comfirmation email to reset your password.</div>
                <Separator />
                {this.props.errorMessage ? 
                    <div className={classes.Error}>{this.props.errorMessage}</div> 
                    : null}
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
                    <Button style={buttonStyles} clicked={this.setLoading} submit disabled={!this.state.formIsValid} type='auth' blockButton={true}>
                        {button}
                    </Button>
                </form>
                {this.state.successMessage ? 
                    <div className={classes.Success}>{this.state.successMessage}</div> 
                    : null}
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
        onResetPasswordHandler: (email) => dispatch(authCreator.authResetPasswordInit(email)),
		resetErrorMessage: () => dispatch(authActions.authResetErrorMessage())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);