import React, { Component } from 'react';
// React Redux
import { connect } from 'react-redux';

/**
 * Modal functionality and context. The provider and consumer is inside the layout render method
 */
export const HeaderContext = React.createContext();
class HeaderProvider extends Component {
	state ={
		bShowAuthModal: false,
		authModalType: null
	}

	switchAuthModalHandler = (type) => {
		this.setState( () => {
			return { 
				authModalType: type
			};
		});
	}

	toggleAuthModal = (type) => {
		this.setState( (prevState) => {
			return { 
				bShowAuthModal: !prevState.bShowAuthModal,
				authModalType: type
			};
		});
	}

	closeAuthModal = () => {
		this.setState( () => {
			return { 
				bShowAuthModal: false,
			};
		});
    }
    

    // If logged in, closes the modal
    componentDidUpdate() {
        if (this.state.bShowAuthModal && this.props.isAuthenticated) {
            this.closeAuthModal();
        }
    }

	render () {
		return (
			<HeaderContext.Provider value={{
					switchAuthModalHandler: this.switchAuthModalHandler, // switches modal without closing
					toggleAuthModal: this.toggleAuthModal, // switches modal and closes
					closeAuthModal: this.closeAuthModal, // closes modal
					authModalType: this.state.authModalType,
					bShowAuthModal: this.state.bShowAuthModal
				}}>
				{this.props.children}
			</HeaderContext.Provider>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.authReducer.userId !== null
	};
};

export default connect(mapStateToProps)(HeaderProvider);