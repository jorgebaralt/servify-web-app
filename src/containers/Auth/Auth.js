import React, { useState, useEffect } from 'react';
// react-router-dom
import { withRouter } from 'react-router-dom';
// redux-sagas
import { connect } from 'react-redux';
// CSS
import classes from './Auth.module.css';
// JSX
import ResetPassword from './AuthModes/ResetPassword/ResetPassword';
import SignUp from './AuthModes/SignUp/SignUp';
import SignIn from './AuthModes/SignIn/SignIn';

const auth = (props) => {
    // If the user is already authenticated then redirect to the authRedirect path or to the landing page
    if (props.isAuthenticated) {
        props.history.push({
            pathname: props.authRedirectPath ? props.authRedirectPath : '/' 
        });
    }

    const [authRedirectPath] = useState(props.authRedirectPath);
    const [authMode, setAuthMode] = useState('sign up');

    const switchAuthMode = (authMode) => {
        setAuthMode(authMode);
	}

    const switchAuthModeHandler = () => {
        switch (authMode) {
            case 'reset password':
                return <ResetPassword switchAuthModalHandler={switchAuthMode} />
            case 'sign in':
                return <SignIn switchAuthModalHandler={switchAuthMode} />
            case 'sign up':
                return <SignUp switchAuthModalHandler={switchAuthMode} />
            default:
                // do nothing
                return;
        }
    }

    useEffect(() => {
        if (props.isAuthenticated) {
            props.history.push({
                pathname: authRedirectPath
            });
        }
    }, [props.isAuthenticated]);

    return (
        <div className={classes.Container}>
            <div className={classes.Auth}>
                {switchAuthModeHandler()}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.authReducer.userId !== null,
		authRedirectPath: state.authReducer.authRedirectPath,
	};
};

export default withRouter(connect(mapStateToProps)(auth));