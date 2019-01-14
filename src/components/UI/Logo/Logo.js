import React from 'react'

import servifyLogo from '../../../assets/images/servify-logo-96x96.png';

import classes from './Logo.module.css'

const logo = () => {
    return (
        <div  className={classes.Logo}>
            <img src={servifyLogo} alt=''/>
            <span>RM</span>
        </div>
    );
}

export default logo;