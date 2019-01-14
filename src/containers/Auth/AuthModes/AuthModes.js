import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// JSX
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import Modal from '../../../components/UI/Modal/Modal';

class AuthModal extends PureComponent {
    switchAuthModeHandler = () => {
        switch (this.props.authModalType) {
            case 'sign up':
                return <SignUp switchAuthModalHandler={this.props.switchAuthModalHandler} />
            case 'sign in':
                return <SignIn switchAuthModalHandler={this.props.switchAuthModalHandler} />
            default:
                // do nothing
                return;
        }
    }

    componentWillUnmount() {
        document.body.style.overflow = null;
    }

    render() {
        if (this.props.isAuthenticated) { return null; }
        return (
            !this.props.isAuthenticated ? 
                <Modal
                    closeModal={this.props.closeModal}
                    toggleModal={this.props.toggleModal}
                    show={this.props.show}>  
                    {this.switchAuthModeHandler()}
                </Modal>
                : null
        );
    }
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.authReducer.userId !== null
	};
};

export default connect(mapStateToProps)(AuthModal);