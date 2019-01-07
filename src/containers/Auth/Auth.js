import React, { Component } from 'react';
// CSS
import classes from './Auth.module.css';
// JSX
import SignUp from './AuthModes/SignUp/SignUp';
import SignIn from './AuthModes/SignIn/SignIn';

class Auth extends Component {
    state = {
		bIsSignIn: true
    }

    toggleAuthMode = () => {
		this.setState( (prevState) => {
			return { 
				bIsSignIn: !prevState.bIsSignIn,
			};
		});
	}

    switchAuthModeHandler = () => {
        switch (true) {
            case this.state.bIsSignIn:
                return <SignIn switchAuthHandler={this.toggleAuthMode} />
            case !this.state.bIsSignIn:
                return <SignUp switchAuthHandler={this.toggleAuthMode} />
            default:
                // do nothing
                return;
        }
    }

    render() {
        return (
            <div className={classes.Container}>
                <div className={classes.Auth}>
                    {this.switchAuthModeHandler()}
                </div>
            </div>
        );
    }
}

export default Auth;