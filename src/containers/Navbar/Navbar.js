import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom';

import classes from './Navbar.module.css';

import SideDrawer from '../../components/UI/Navigation/SideDrawer/SideDrawer';
import NagivationItems from '../../components/UI/Navigation/NavigationItems/NavigationItems';
import DrawerToggle from '../../components/UI/Navigation/Toolbar/DrawerToggle/DrawerToggle';
import ScrollToTopButton from '../../components/UI/ScrollToTopButton/ScrollToTopButton';

class Navbar extends PureComponent {

    constructor (props) {
        super(props);
        this.navbar = React.createRef();
    }

    state = {
        isDrawerOpen: false,
        navbarTransparent: false,
        showScrollToTop: false,
    }

    sideDrawerToggleClick = () => {
        this.setState( prevState => {
            return {isDrawerOpen: !prevState.isDrawerOpen}
        })
    }

    scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    changeNavbarOnWindowScroll = () => {
        if (window.scrollY > this.navbar.current.clientHeight) {
            this.setState({
                navbarTransparent: false
            });
        } else {
            this.setState({
                navbarTransparent: true
            });
        }
        if (window.scrollY < window.screen.height / 2) {
            this.setState({
                showScrollToTop: false
            });
        } else {
            this.setState({
                showScrollToTop: true
            });
        }
    };

    static getDerivedStateFromProps (nextProps) {
        if ((nextProps.location.pathname !== "/projects" && nextProps.location.pathname !== "/skills")) {
            if (window.scrollY > 56) {
                return {
                    navbarTransparent: false
                }
            } else {
                return {
                    navbarTransparent: true
                }
            }
        } else {
            return {
                navbarTransparent: false
            }
        }
    }

    componentDidMount () {
        window.addEventListener('scroll', this.changeNavbarOnWindowScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.changeNavbarOnWindowScroll);
    }

    render () {
        let navbarClasses = [classes.Navbar];
        if (this.state.navbarTransparent) {
            navbarClasses.push(classes.NavbarTransparent);
        }
        return (
            <>
                <header className={navbarClasses.join(' ')} ref={this.navbar}>
                    <nav className={classes.DesktopOnly} onScroll={this.trackScrolling}>
                        <NagivationItems isNavbarTransparent={this.state.navbarTransparent}/>
                    </nav>
                    <DrawerToggle 
                        drawerClass={classes.MobileOnly}
                        isOpen={this.state.isDrawerOpen}
                        click={this.sideDrawerToggleClick}/>
                    <SideDrawer 
                        drawerClass={classes.MobileOnly}
                        isOpen={this.state.isDrawerOpen}
                        click={this.sideDrawerToggleClick}/>
                </header>
                {this.state.showScrollToTop ? <ScrollToTopButton clicked={this.scrollToTop} /> : null}
            </>
        );
    }
}

export default withRouter(Navbar);