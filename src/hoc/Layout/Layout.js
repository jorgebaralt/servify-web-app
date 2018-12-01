import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Layout.module.css';

import Navbar from '../../containers/Navbar/Navbar';
import Footer from '../../components/UI/Footer/Footer';

class Layout extends Component {
	render() {
		const footer =
			this.props.location.pathname === '/' ||
			this.props.location.pathname === '/post/info' ? (
				<Footer />
			) : null;
		return (
            <>
                {/* TODO: Check state, and decide which navbar to show. there will be multiple navbar options */}
				<Navbar /> 
				<main className={classes.Layout}>{this.props.children}</main>
				{footer}
			</>
		);
	}
}

export default withRouter(Layout);
