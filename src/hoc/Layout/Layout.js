import React, { Component } from 'react';
// CSS
import classes from './Layout.module.css';
// JSX
import AuthModes from '../../containers/Auth/AuthModes/AuthModes';
import Navbar from '../../containers/Navbar/Navbar';
import Footer from '../../components/UI/Footer/Footer';

/**
 * Modal functionality and context. The provider and consumer is inside the layout render method
 */
const HeaderContext = React.createContext();
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

class Layout extends Component {

	render() {
		return (
			<>
				<HeaderProvider>
					<HeaderContext.Consumer>
						{(context) => {
							return(
								<>
									<AuthModes
										switchAuthModalHandler={context.switchAuthModalHandler}
										toggleModal={context.toggleAuthModal}
										closeModal={context.closeAuthModal}
										authModalType={context.authModalType}
										show={context.bShowAuthModal}/>
									<Navbar toggleAuthModal={context.toggleAuthModal} />
								</>
							);
						}}
					</HeaderContext.Consumer>
				</HeaderProvider>
				<main className={classes.Layout}>
					{this.props.children}
				</main>
				<Footer />
			</>
		);
	}
}

export default Layout;
