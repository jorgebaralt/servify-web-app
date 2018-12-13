import React, { Component } from 'react'
// CSS
import classes from './Services.module.css'
import { Link } from 'react-router-dom';

class Services extends Component {
    render () {
        return (
            <div className={classes.ServicesContainer}>
                <Link to='/services/1'>Test Service</Link>
            </div>
        )
    }
}

export default Services;