import React, { Component } from 'react';
// CSS
import classes from './Layout.module.css';
// JSX
import HeaderProvider, { HeaderContext } from './Header/Header';
import AuthModes from '../../containers/Auth/AuthModes/AuthModes';
import Navbar from '../../containers/Navbar/Navbar';
import Footer from '../../components/UI/Footer/Footer';

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
