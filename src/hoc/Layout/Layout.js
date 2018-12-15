import React, { Component } from 'react';
// CSS
import classes from './Layout.module.css';
// JSX
import AuthModal from '../../containers/Auth/AuthModal/AuthModal';
import Navbar from '../../containers/Navbar/Navbar';
import Footer from '../../components/UI/Footer/Footer';

const MyAuthModalContext = React.createContext();
class MyAuthModalProvider extends Component {
	state ={
		bShowAuthModal: false,
		authModalType: null
	}

	toggleAuthModal = (type) => {
		this.setState( (prevState) => {
			return { 
				bShowAuthModal: !prevState.bShowAuthModal,
				authModalType: type
			};
		});
	}

	render () {
		return (
			<MyAuthModalContext.Provider value={{
					authModalType: this.state.authModalType,
					toggleAuthModal: this.toggleAuthModal,
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
										toggleModal={context.toggleAuthModal}
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
