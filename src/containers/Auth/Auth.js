import React, { Component } from 'react';
// react-router-dom
import { withRouter } from 'react-router-dom';
// redux-sagas
import { connect } from 'react-redux';
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
                return <SignIn switchAuthModalHandler={this.toggleAuthMode} />
            case !this.state.bIsSignIn:
                return <SignUp switchAuthModalHandler={this.toggleAuthMode} />
            default:
                // do nothing
                return;
        }
    }

    componentDidUpdate() {
        if (this.props.isAuthenticated) {
            this.props.history.push({
                pathname: this.props.authRedirectPath
            });
        }
    }

    componentWillUnmount() {
        this.props.history.push({
            pathname: this.props.authRedirectPath
        });
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

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.authReducer.userId !== null,
		authRedirectPath: state.authReducer.authRedirectPath,
	};
};

export default withRouter(connect(mapStateToProps)(Auth));