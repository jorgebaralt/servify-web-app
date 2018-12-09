import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
// CSS
import classes from './Navbar.module.css';
// JSX
import LandingNavbar from '../../components/UI/Navigation/LandingNavbar/LandingNavbar';
import PostInfoNavbar from '../../components/UI/Navigation/PostInfoNavbar/PostInfoNavbar';
import ScrollToTopButton from '../../components/UI/ScrollToTopButton/ScrollToTopButton';

class Navbar extends PureComponent {
	constructor(props) {
		super(props);
		this.navbar = React.createRef();
	}

	state = {
		isDrawerOpen: false,
		navbarTransparent: false,
		showScrollToTop: false,
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
	decideNavbar = () => {
		switch (this.props.location.pathname) {
			case '/':
				return (
					<LandingNavbar
						// passing reference from constructor
						reference={this.navbar}
						// Scroll Tracking Functionality if dependant on scroll then pass 'this.trackScrolling'
						onScroll={false}
						// Passing Is Navbar Transparent functionality, if dependant on scroll then pass 'this.state.navbarTransparent'
						// if never transparent then pass false, if always transparent then pass true
						isNavbarTransparent={true}
						// SideDrawer and mobile props
						drawerClass={classes.MobileOnly}
						isOpen={this.state.isDrawerOpen}
						click={this.sideDrawerToggleClick}
					/>
				);
			case '/post/overview':
				return (
                    <PostInfoNavbar reference={this.navbar} />
				);
			default:
				return null;
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
				{/* Decide navbar to display */}
				{this.decideNavbar()}

				{/* ScrollToTopButton after scrolling */}
				{this.state.showScrollToTop ? (
					<ScrollToTopButton clicked={this.scrollToTop} />
				) : null}
			</>
		);
	}
}

export default withRouter(Navbar);
