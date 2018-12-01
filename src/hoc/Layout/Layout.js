import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Layout.module.css'

import Navbar from '../../containers/Navbar/Navbar';
import Footer from '../../components/UI/Footer/Footer';

class Layout extends Component {
    render () {
        const footer = this.props.location.pathname === "/projects" || this.props.location.pathname === "/skills" ? <Footer /> : null;
        return (
            <>
                <Navbar />
                <main className={classes.Layout}>
                    {this.props.children}
                </main>
                {footer}
            </>
        );
    }
}

export default withRouter(Layout);