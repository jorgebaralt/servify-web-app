import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// CSS
import classes from './Navbar.module.css';
// JSX
import NagivationItems from '../../components/Navigation/NavigationItems/NavigationItems';
import DrawerToggle from '../../components/Navigation/DrawerToggle/DrawerToggle';
import MobileDrawer from '../../components/Navigation/MobileDrawer/MobileDrawer';
import ScrollToTopButton from '../../components/Navigation/ScrollToTopButton/ScrollToTopButton';

const NavbarContainer = (props) => {
	return (
		<>
			<nav className={classes.NavbarContainer} onScroll={props.onScroll}>
				<NagivationItems
					width={props.width}
					navbarType={props.navbarType} 
					isNavbarTransparent={props.isNavbarTransparent} />
			</nav>
			{props.width < 1121 ? 
			<>
				<DrawerToggle
					isOpen={props.bIsDrawerOpen}
					isNavbarTransparent={props.isNavbarTransparent || props.isDrawerTransparent} 
					onClick={props.toggleMobileDrawer} />
				<MobileDrawer
					drawerClass={classes.MobileOnly}
					isOpen={props.bIsDrawerOpen}
					onClick={props.toggleMobileDrawer}
					// NavItems props
					isNavbarTransparent={props.navbarTransparent} />
			</> 
			: null}
			
		</>
	);
}

class Navbar extends PureComponent {
	constructor(props) {
		super(props);
		this.myNavbar = React.createRef();
		this.state.isMobile = props.isMobile;
	}

	state = {
		width: window.innerWidth,
		bIsDrawerOpen: false,
		navbarTransparent: false,
		showScrollToTop: false,
		className: classes.LandingNavbar,
		// passing reference from constructor
		navbarType: 'LandingNavbar', // pass navbarType prop to select respective navigation items
		// Scroll Tracking Functionality if dependant on scroll then pass 'this.trackScrolling'
		onScroll: null, // No functionality
		// Passing Is Navbar Transparent functionality, if dependant on scroll then pass 'this.state.navbarTransparent'
		// if never transparent then pass false or pass nothing, if always transparent then pass true
		isNavbarTransparent: true,
	};

	/**
	 * Toggles (opens/closes) the SideDrawer on click.
	 */
	toggleMobileDrawer = () => {
		this.setState((prevState) => {
			return { bIsDrawerOpen: !prevState.bIsDrawerOpen };
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
		if (!this.myNavbar.current) {
			return;
		}
		if (window.scrollY > this.myNavbar.current.clientHeight && this.state.isNavbarTransparent) {
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

	handleResize = () => {
		this.setState({ width: window.innerWidth });
	};

	/**
	 * Sets Navbar Settings && Add Event Listener
	 */
	componentDidMount () {
		this.setNavbar();
		window.addEventListener('resize', this.handleResize);
		window.addEventListener('scroll', this.changeNavbarOnWindowScroll);
	}

	/**
	 * Sets Navbar if there is a route change
	 */
	componentDidUpdate (prevProps) {
		if (this.props.location !== prevProps.location) {
			this.setNavbar();
		}
	}

	/**
	 * Remove Event Listener
	 */
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
		window.removeEventListener('scroll', this.changeNavbarOnWindowScroll);
	}

	/**
	 *   Function decides which navbar to display according to the path
	 */
	setNavbar = () => {
		let settings = {};
		switch (true) {
			case this.props.location.pathname === '/':
				settings = {
					className: classes.LandingNavbar,
					// passing reference from constructor
					navbarType: 'LandingNavbar', // pass navbarType prop to select respective navigation items
					// Scroll Tracking Functionality if dependant on scroll then pass 'this.trackScrolling'
					onScroll: () => { return }, // No functionality
					// Passing Is Navbar Transparent functionality, if dependant on scroll then pass 'this.state.navbarTransparent'
					// if never transparent then pass false or pass nothing, if always transparent then pass true
					isNavbarTransparent: true,
					isDrawerTransparent: true,
					toggleMobileDrawer: this.toggleMobileDrawer,
				};
				break;
			case this.props.location.pathname.includes('/services'): // Renders navbar for every address that has /services as root
				settings = {
					className: classes.Navbar,
					navbarType: 'SearchNavbar', // pass navbarType prop to select respective navigation items
					toggleMobileDrawer: this.toggleMobileDrawer,
					isNavbarTransparent: false,
					isDrawerTransparent: false
				}
				break;
			case this.props.location.pathname.includes('/users/publications/edit'): // Renders navbar for every address that has /services as root
				settings = {
					className: classes.EditPublicationNavbar,
					navbarType: 'EditPublicationNavbar', // pass navbarType prop to select respective navigation items
					toggleMobileDrawer: this.toggleMobileDrawer,
					isNavbarTransparent: false,
					isDrawerTransparent: false
				}
				break;
			case this.props.location.pathname.includes('/publish/overview'):
				settings = {
					className: classes.Navbar,
					navbarType: 'PublishOverviewNavbar', // pass navbarType prop to select respective navigation items
					toggleMobileDrawer: this.toggleMobileDrawer,
					isNavbarTransparent: false,
					isDrawerTransparent: false
				}
				break;
			case this.props.location.pathname.includes('/publish'):
				settings = {
					className: classes.PublishNavbar,
					navbarType: 'PublishNavbar', // pass navbarType prop to select respective navigation items
					toggleMobileDrawer: this.toggleMobileDrawer,
					isNavbarTransparent: false,
					isDrawerTransparent: true
				}
				break;
			case this.props.location.pathname.includes('/help') || this.props.location.pathname.includes('/contact'):
				settings = {
					className: classes.SupportNavbar,
					navbarType: 'SupportNavbar', // pass navbarType prop to select respective navigation items
					toggleMobileDrawer: this.toggleMobileDrawer,
					isNavbarTransparent: false,
					isDrawerTransparent: true
				};
				break;
			default:
				// Same as services nabvar, for now it's the default
				settings = {
					className: classes.Navbar,
					navbarType: 'SearchNavbar', // pass navbarType prop to select respective navigation items
					toggleMobileDrawer: this.toggleMobileDrawer,
					isNavbarTransparent: false,
					isDrawerTransparent: false
				}
		}
		return this.setState( () => {
			return {
				...settings
			}
		});
	};

	render () {
		const navbarClasses = [this.state.className];
		if (this.state.isNavbarTransparent) {
			navbarClasses.push(classes.NavbarTransparent);
		}
		return (
			<header className={navbarClasses.join(' ')} ref={this.myNavbar}>
				<NavbarContainer
					isMobile={this.props.isMobile}  
					{...this.state} />
				{/* ScrollToTopButton after scrolling */}
				{this.state.showScrollToTop ? (
					<ScrollToTopButton clicked={this.scrollToTop} />
				) : null}
			</header>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isMobile: state.mobileReducer.isMobile
	};
};

export default withRouter(connect(mapStateToProps)(Navbar));