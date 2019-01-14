import React from 'react';
// CSS
import classes from './LoadingPage.module.css';
// JSX
import Loading from '../LoadingBounce/LoadingBounce'

const loadingPage = () => {
    return (
        <div className={classes.Container}>
            <Loading />
        </div>
    );
}

export default loadingPage;