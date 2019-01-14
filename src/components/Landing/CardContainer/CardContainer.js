import React from 'react';
// CSS
import classes from './CardContainer.module.css';

const Container = (props) => {
    return (
        <div className={classes.Wrapper}>
            <div className={classes.Container}>
                {props.children}
            </div>
        </div>
    );
};

export default Container;