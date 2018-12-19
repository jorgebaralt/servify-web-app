import React from 'react';
// CSS
import classes from './ServiceContainer.module.css';

const serviceContainer = (props) => {
    return (
        <div className={classes.ServiceContainer}>
            {props.children}
        </div>
    );
};

export default serviceContainer;