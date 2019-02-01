import React from 'react';
// CSS
import classes from './Layout.module.css';
// JSX
import Menu from '../../../components/Users/Menu/Menu';

const layout = (props) => {
    return (
        <div className={classes.Container}>
            <Menu />
            <div className={classes.ContentWrapper}>
                {props.children}
            </div>
        </div>
    );
}

export default layout;