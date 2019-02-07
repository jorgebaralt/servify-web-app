import React, { useState, useEffect } from 'react';
// React Redux
import { connect } from 'react-redux';

/**
 * Modal functionality and context. The provider and consumer is inside the layout render method
 */
export const HeaderContext = React.createContext({
	switchAuthModalHandler: () => {}, // switches modal without closing
	toggleAuthModal: () => {}, // switches modal and closes
	closeAuthModal: () => {}, // closes modal
	authModalType: null,
	bShowAuthModal: false
});

const headerProvider = (props) => {
	const [bShowAuthModal, setShowAuthModal] = useState(false);
	const [authModalType, setAuthModalType] = useState(false);

	const switchAuthModalHandler = (type) => {
		setAuthModalType(type);
	}

	const toggleAuthModal = (type) => {
		setShowAuthModal(!bShowAuthModal); // Toggles modal.
		setAuthModalType(type); // Then sets type.
	}

	const closeAuthModal = () => {
		setShowAuthModal(false); // Closes modal.
    }

    // If user logs in, closes the modal.
	useEffect(() => {
		if (bShowAuthModal && props.isAuthenticated) {
            closeAuthModal();
        }
    }, [bShowAuthModal, props.isAuthenticated]);

	return (
		<HeaderContext.Provider value={{
				switchAuthModalHandler: switchAuthModalHandler, // switches modal without closing
				toggleAuthModal: toggleAuthModal, // switches modals
				closeAuthModal: closeAuthModal, // closes modal
				authModalType: authModalType,
				bShowAuthModal: bShowAuthModal
			}}>
			{props.children}
		</HeaderContext.Provider>
	);
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.authReducer.userId !== null
	};
};

export default connect(mapStateToProps)(headerProvider);