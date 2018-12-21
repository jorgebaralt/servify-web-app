import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
// CSS
import classes from './Navbar.module.css';
// JSX
import LandingNavbar from '../../components/Navigation/LandingNavbar/LandingNavbar';
import PublishNavbar from '../../components/Navigation/PublishNavbar/PublishNavbar';
import SearchNavbar from '../../components/Navigation/SearchNavbar/SearchNavbar';
import DesktopNav from '../../components/Navigation/DesktopNav/DesktopNav';
import NagivationItems from '../../components/Navigation/NavigationItems/NavigationItems';
import DrawerToggle from '../../components/Navigation/Toolbar/DrawerToggle/DrawerToggle';
import MobileDrawer from '../../components/Navigation/MobileDrawer/MobileDrawer';
import ScrollToTopButton from '../../components/Navigation/ScrollToTopButton/ScrollToTopButton';

const NavbarContainer = (props) => {
	let navbarClasses = [classes.LandingNavbar];
    if (props.isNavbarTransparent) {
        navbarClasses.push(classes.NavbarTransparent);
    }
	return (
		<header className={navbarClasses.join(' ')} ref={props.reference}>
            <nav onScroll={props.onScroll}>
                <DesktopNav onScroll={props.onScroll}
						navbarType={props.navbarType} 
                        isNavbarTransparent={props.navbarTransparent} 
                        toggleAuthModal={props.toggleAuthModal}>
                    <NagivationItems  
                        navbarType={props.navbarType} 
                        isNavbarTransparent={props.navbarTransparent} 
                        toggleAuthModal={props.toggleAuthModal} />
                </DesktopNav>
            </nav>
            <DrawerToggle 
                isOpen={props.bIsDrawerOpen}
                onClick={props.toggleMobileDrawer}/>
            <MobileDrawer
                drawerClass={classes.MobileOnly}
                isOpen={props.bIsDrawerOpen}
                onClick={props.toggleMobileDrawer}
                // NavItems props
                isNavbarTransparent={props.navbarTransparent} 
                toggleAuthModal={props.toggleAuthModal} />
        </header>
	);
}

class Navbar extends PureComponent {
	constructor(props) {
		super(props);
		this.navbar = React.createRef();
	}

	state = {
		bIsDrawerOpen: false,
		navbarTransparent: false,
		showScrollToTop: false,
		settings: null
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
			bShowAuthModal: false
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
	// static getDerivedStateFromProps(nextProps) {
	// 	// if on the addresses navbar is not transparent.
	// 	if ( nextProps.location.pathname !== '/projects' &&
	// 		nextProps.location.pathname !== '/skills' ) {
	// 		// if the window.scrollY is higher then 56 pixels the navbar shall be false, else it's true
	// 		if (window.scrollY > 56) {
	// 			return {
	// 				navbarTransparent: false,
	// 			};
	// 		} else {
	// 			return {
	// 				navbarTransparent: true,
	// 			};
	// 		}
	// 		// if not on the addresses navbar is not transparent.
	// 	} else {
	// 		return {
	// 			navbarTransparent: false,
	// 		};
	// 	}
	// }

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
		// switch (true) {
		// 	case this.props.location.pathname === '/':
		// 		return (
		// 			<LandingNavbar
		// 				// Toggle Auth Modal
		// 				toggleAuthModal={this.props.toggleAuthModal}
		// 				// passing reference from constructor
		// 				navbarType='LandingNavbar' // pass navbarType prop to select respective navigation items
		// 				// Scroll Tracking Functionality if dependant on scroll then pass 'this.trackScrolling'
		// 				onScroll={() => { return }} // No functionality
		// 				// Passing Is Navbar Transparent functionality, if dependant on scroll then pass 'this.state.navbarTransparent'
		// 				// if never transparent then pass false or pass nothing, if always transparent then pass true
		// 				isNavbarTransparent={true}
		// 				// // MobileDrawer and mobile props
		// 				// drawerClass={classes.MobileOnly}
		// 				bIsDrawerOpen={this.state.bIsDrawerOpen}
		// 				toggleMobileDrawer={this.toggleMobileDrawer} 
		// 				reference={this.navbar} />
		// 		);
		// 	case this.props.location.pathname.includes('/services'): // Renders navbar for every address that has /services as root
		// 		return (
        //             <SearchNavbar 
		// 				toggleAuthModal={this.props.toggleAuthModal} // Toggle Auth Modal
		// 				navbarType='SearchNavbar' // pass navbarType prop to select respective navigation items
		// 				bIsDrawerOpen={this.state.bIsDrawerOpen}
		// 				toggleMobileDrawer={this.toggleMobileDrawer} 
		// 				reference={this.navbar} />
		// 		);
		// 	case this.props.location.pathname.includes('/publish'):
		// 		return (
        //             <PublishNavbar 
		// 				toggleAuthModal={this.props.toggleAuthModal} // Toggle Auth Modal
		// 				navbarType='PublishNavbar' // pass navbarType prop to select respective navigation items
		// 				bIsDrawerOpen={this.state.bIsDrawerOpen}
		// 				toggleMobileDrawer={this.toggleMobileDrawer} 
		// 				reference={this.navbar} />
		// 		);
		// 	default:
		// 		// do nothing
		// }
		let settings = {
			// passing reference from constructor
			navbarType: 'LandingNavbar', // pass navbarType prop to select respective navigation items
			// Toggle Auth Modal
			toggleAuthModal: this.props.toggleAuthModal,
			// Scroll Tracking Functionality if dependant on scroll then pass 'this.trackScrolling'
			onScroll: () => { return }, // No functionality
			// Passing Is Navbar Transparent functionality, if dependant on scroll then pass 'this.state.navbarTransparent'
			// if never transparent then pass false or pass nothing, if always transparent then pass true
			isNavbarTransparent: true,
			// // MobileDrawer and mobile props
			// drawerClass={classes.MobileOnly}
			bIsDrawerOpen: this.state.bIsDrawerOpen,
			toggleMobileDrawer: this.toggleMobileDrawer,
			reference: this.navbar
		};
		switch (true) {
			case this.props.location.pathname === '/':
				break;
			case this.props.location.pathname.includes('/services'): // Renders navbar for every address that has /services as root
				settings = {
					navbarType:'SearchNavbar', // pass navbarType prop to select respective navigation items
					toggleAuthModal:this.props.toggleAuthModal, // Toggle Auth Modal
					bIsDrawerOpen:this.state.bIsDrawerOpen,
					toggleMobileDrawer:this.toggleMobileDrawer,
					reference:this.navbar
				}
				break;
			case this.props.location.pathname.includes('/publish'):
				settings = {
					navbarType:'PublishNavbar', // pass navbarType prop to select respective navigation items
					toggleAuthModal:this.props.toggleAuthModal, // Toggle Auth Modal
					bIsDrawerOpen:this.state.bIsDrawerOpen,
					toggleMobileDrawer:this.toggleMobileDrawer,
					reference:this.navbar
				}
				break;
			default:
				// do nothing
		}
		return this.setState( () => {
			return {
				settings: settings
			}
		});
	};

	// render() {
	// 	// array that holds the Navbar CSS
	// 	let navbarClasses = [classes.Navbar];
	// 	// if transparent push the transparent CSS properties
	// 	if (this.state.navbarTransparent) {
	// 		navbarClasses.push(classes.NavbarTransparent);
	// 	}
	// 	return (
	// 		<>
	// 			{/* Decide navbar to display */}
	// 			{this.setNavbar()}
	// 			{/* ScrollToTopButton after scrolling */}
	// 			{this.state.showScrollToTop ? (
	// 				<ScrollToTopButton clicked={this.scrollToTop} />
	// 			) : null}
	// 		</>
	// 	);
	// }

	render () {
		// array that holds the Navbar CSS
		let navbarClasses = [classes.Navbar];
		// if transparent push the transparent CSS properties
		if (this.state.navbarTransparent) {
			navbarClasses.push(classes.NavbarTransparent);
		}
		return (
			<>
				{/* Decide navbar to display */}
				<NavbarContainer {...this.state.settings} />
				{/* ScrollToTopButton after scrolling */}
				{this.state.showScrollToTop ? (
					<ScrollToTopButton clicked={this.scrollToTop} />
				) : null}
			</>
		);
	}
}

export default withRouter(Navbar);
