import React, { Component } from 'react';
// JSX
import SignUpModal from './SignUpModal/SignUpModal';
import SignInModal from './SignInModal/SignInModal';
import Modal from '../../../components/UI/Modal/Modal';


class AuthModal extends Component {
    
    switchAuthModeHandler = () => {
        switch (this.props.authModalType) {
            case 'sign up':
                return <SignUpModal switchAuthModalHandler={this.props.switchAuthModalHandler} />
            case 'sign in':
                return <SignInModal switchAuthModalHandler={this.props.switchAuthModalHandler} />
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
                closeModal={this.props.closeModal}
                toggleModal={this.props.toggleModal}
                show={this.props.show}>  
                {this.switchAuthModeHandler()}
            </Modal>
        );
    }
};

export default React.memo(AuthModal);