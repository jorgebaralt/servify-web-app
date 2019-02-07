import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
// JSX
import { HeaderContext } from '../../../hoc/Layout/Header/Header';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import Modal from '../../../components/UI/Modal/Modal';

const authModal = (props) => {
    const header = useContext(HeaderContext);

    const switchAuthModeHandler = () => {
        switch (header.authModalType) {
            case 'sign up':
                return <SignUp switchAuthModalHandler={header.switchAuthModalHandler} />
            case 'sign in':
                return <SignIn switchAuthModalHandler={header.switchAuthModalHandler} />
            default:
                // do nothing
                return;
        }
    }

    useEffect(() => {
        /**
         * returns in useEffect hooks are known as cleanups. They execute when 
         * the component hill unmount or just before useEffect is executed AFTER
         * the first time.
         */
        return () => {
            document.body.style.overflow = null;
        };
    }, []);

    if (props.isAuthenticated) { return null; }
    return (
        !props.isAuthenticated ? 
            <Modal
                closeModal={header.closeAuthModal}
                toggleModal={header.toggleAuthModal}
                show={header.bShowAuthModal}>  
                {switchAuthModeHandler()}
            </Modal>
            : null
    );
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.authReducer.userId !== null
	};
};

export default connect(mapStateToProps)(authModal);