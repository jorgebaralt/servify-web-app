import React, { Component } from 'react';
// CSS
import classes from './AuthModal.module.css'
// JSX
import SignUpModal from './SignUpModal/SignUpModal';

class AuthModal extends Component {

    state = {
        isSignUp: false,
    }

    componentDidMount () {
        // TODO Auth Redux Saga
        // if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
        //     this.props.onSetAuthRedirectPath();
        // }
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp};
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state || nextProps.children !== this.props.children;
    }

    render() {
        return (
            <>  
                <SignUpModal />
            </>
        );
    }
};

export default React.memo(AuthModal);