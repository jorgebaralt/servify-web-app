import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
// CSS
import classes from './Navbar.module.css';
// JSX
import LandingNavbar from '../../components/Navigation/LandingNavbar/LandingNavbar';
import PublishNavbar from '../../components/Navigation/PublishNavbar/PublishNavbar';
import SearchNavbar from '../../components/Navigation/SearchNavbar/SearchNavbar';
import ScrollToTopButton from '../../components/Navigation/ScrollToTopButton/ScrollToTopButton';
import Modal from '../../components/UI/Modal/Modal';
import AuthModal from '../AuthModal/AuthModal';

class Navbar extends PureComponent {
	constructor(props) {
		super(props);
		this.navbar = React.createRef();
	}

	state = {
		isDrawerOpen: false,
		navbarTransparent: false,
		showScrollToTop: false,
		bShowAuthModal: false
	};

	/**
	 * Toggles (opens/closes) the SideDrawer on click.
	 */
	sideDrawerToggleClick = () => {
		this.setState((prevState) => {
			return { isDrawerOpen: !prevState.isDrawerOpen };
		});
	};

	/**
	 * Smoothly scrolls to the top, works in mobile with the polyfill.
	 */
	scrollToTop = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	};

	/**
	 * Tracks the window scroll then toggles the state navbarTransparent
	 * depending on the window.scrollY property, if user scrolls further than
	 * the .clientHeight property then the navbarTransparent state shall be false,
	 * otherwise if the navbar is at the top it will be true.
	 *
	 * With the same functionality, it detects whenever the window.scrollY is less
	 * than the total height of the window.screen.height divided by 2 (sensible value,
	 * can be changed), meaning whenever the user scrolls halfway down the size of
	 * their screen, the showScrollToTop property will toggleand the ScrollToButton
	 * component will be shown.
	 */
	changeNavbarOnWindowScroll = () => {
		if (!this.navbar.current) {
			return;
		}
		if (window.scrollY > this.navbar.current.clientHeight) {
			this.setState({
				navbarTransparent: false,
			});
		} else {
			this.setState({
				navbarTransparent: true,
			});
		}
		if (window.scrollY < window.screen.height / 2) {
			this.setState({
				showScrollToTop: false,
			});
		} else {
			this.setState({
				showScrollToTop: true,
			});
		}
	};

	/**
	 * getDerivedStateFromProps is invoked right before calling the render method,
	 * both on the initial mount and on subsequent updates. It should return an
	 * object to update the state, or null to update nothing.
	 * TODO determine if this method is needed.
	 */
	static getDerivedStateFromProps(nextProps) {
		// if on the addresses navbar is not transparent.
		if (
			nextProps.location.pathname !== '/projects' &&
			nextProps.location.pathname !== '/skills'
		) {
			// if the window.scrollY is higher then 56 pixels the navbar shall be false, else it's true
			if (window.scrollY > 56) {
				return {
					navbarTransparent: false,
				};
			} else {
				return {
					navbarTransparent: true,
				};
			}
			// if not on the addresses navbar is not transparent.
		} else {
			return {
				navbarTransparent: false,
			};
		}
	}

	toggleAuthModal = () => {
		this.setState( (prevState) => {
			return { bShowAuthModal: !prevState.bShowAuthModal };
		});
	}

	/**
	 * Add Event Listener
	 */
	componentDidMount() {
		window.addEventListener('scroll', this.changeNavbarOnWindowScroll);
	}

	/**
	 * Remove Event Listener
	 */
	componentWillUnmount() {
		window.removeEventListener('scroll', this.changeNavbarOnWindowScroll);
	}

	/**
	 *   Function decides which navbar to display according to the path
	 */
	setNavbar = () => {
		switch (true) {
			case this.props.location.pathname === '/':
				return (
					<LandingNavbar
						// Toggle Auth Modal
						toggleAuthModal={this.toggleAuthModal}
						// passing reference from constructor
						reference={this.navbar}
						navbarType='LandingNavbar' // pass navbarType prop to select respective navigation items
						// Scroll Tracking Functionality if dependant on scroll then pass 'this.trackScrolling'
						onScroll={() => { return }} // No functionality
						// Passing Is Navbar Transparent functionality, if dependant on scroll then pass 'this.state.navbarTransparent'
						// if never transparent then pass false or pass nothing, if always transparent then pass true
						isNavbarTransparent={true}
						// SideDrawer and mobile props
						drawerClass={classes.MobileOnly}
						isOpen={this.state.isDrawerOpen}
						click={this.sideDrawerToggleClick} />
				);
			case this.props.location.pathname.includes('/services'): // Renders navbar for every address that has /services as root
				return (
                    <SearchNavbar 
						// Toggle Auth Modal
						toggleAuthModal={this.toggleAuthModal}
						navbarType='SearchNavbar' // pass navbarType prop to select respective navigation items
						reference={this.navbar} />
				);
			case this.props.location.pathname.includes('/publish'):
				return (
                    <PublishNavbar 
						// Toggle Auth Modal
						toggleAuthModal={this.toggleAuthModal}
						navbarType='PublishNavbar' // pass navbarType prop to select respective navigation items
						reference={this.navbar} />
				);
			default:
				// do nothing
		}
	};

	render() {
		// array that holds the Navbar CSS
		let navbarClasses = [classes.Navbar];
		// if transparent push the transparent CSS properties
		if (this.state.navbarTransparent) {
			navbarClasses.push(classes.NavbarTransparent);
		}
		return (
			<>
				<Modal
					toggleModal={this.toggleAuthModal}
					show={this.state.bShowAuthModal}>
					<AuthModal />
				</Modal>
				{/* Decide navbar to display */}
				{this.setNavbar()}
				{/* ScrollToTopButton after scrolling */}
				{this.state.showScrollToTop ? (
					<ScrollToTopButton clicked={this.scrollToTop} />
				) : null}
			</>
		);
	}
}

export default withRouter(Navbar);
