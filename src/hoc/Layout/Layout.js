import React, { Component } from 'react';
// CSS
import classes from './Layout.module.css';
// JSX
import AuthModal from '../../containers/Auth/AuthModal/AuthModal';
import Navbar from '../../containers/Navbar/Navbar';
import Footer from '../../components/UI/Footer/Footer';

/**
 * Modal functionality and context, provider and consumer in layout render
 */
const MyAuthModalContext = React.createContext();
class MyAuthModalProvider extends Component {
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
			<MyAuthModalContext.Provider value={{
					switchAuthModalHandler: this.switchAuthModalHandler, // switches modal without closing
					toggleAuthModal: this.toggleAuthModal, // switches modal and closes
					closeAuthModal: this.closeAuthModal, // closes modal
					authModalType: this.state.authModalType,
					bShowAuthModal: this.state.bShowAuthModal
				}}>
				{this.props.children}
			</MyAuthModalContext.Provider>
		)
	}
}

class Layout extends Component {

	render() {
		return (
			<>
				<MyAuthModalProvider>
					<MyAuthModalContext.Consumer>
						{(context) => {
							return(
								<>
									<AuthModal
										switchAuthModalHandler={context.switchAuthModalHandler}
										toggleModal={context.toggleAuthModal}
										closeModal={context.closeAuthModal}
										authModalType={context.authModalType}
										show={context.bShowAuthModal}/>
									<Navbar toggleAuthModal={context.toggleAuthModal} />
								</>
							);
						}}
					</MyAuthModalContext.Consumer>
				</MyAuthModalProvider>
				<main className={classes.Layout}>
					{this.props.children}
				</main>
				<Footer />
			</>
		);
	}
}

export default Layout;
