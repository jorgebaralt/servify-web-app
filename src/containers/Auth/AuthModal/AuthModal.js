import React, { Component } from 'react';
// JSX
import SignUpModal from './SignUpModal/SignUpModal';
import SignInModal from './SignInModal/SignInModal';
import Modal from '../../../components/UI/Modal/Modal';


class AuthModal extends Component {

    componentDidMount () {
        // TODO Auth Redux Saga
        // if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
        //     this.props.onSetAuthRedirectPath();
        // }
    }

    switchAuthModeHandler = () => {
        switch (this.props.authModalType) {
            case 'sign up':
                return <SignUpModal />
            case 'sign in':
                return <SignInModal />
            default:
                // do nothing
                return;
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state || nextProps.children !== this.props.children;
    }

    render() {
        return (
            <Modal 
                toggleModal={this.props.toggleModal}
                show={this.props.show}>  
                {this.switchAuthModeHandler()}
            </Modal>
        );
    }
};

export default React.memo(AuthModal);