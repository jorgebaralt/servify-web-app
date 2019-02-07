import React, { useContext } from 'react';
// CSS
import classes from '../Reviews.module.css';
// JSX
import { HeaderContext } from '../../../../hoc/Layout/Header/Header';
import Button from '../../../UI/Button/Button';

const writeReview = (props) => {
    const header = useContext(HeaderContext);
    const bUserIsAuthenticated = props.userDetails ? props.userDetails.userId !== null : false;

    const onClickHandler = () => {
        if (!bUserIsAuthenticated) {
            header.toggleAuthModal('sign in');
        } else {
            props.toggleFormHandler();
        }
    }

    return (
        <Button 
            clicked={onClickHandler} 
            className={classes.Button} 
            blockButton>Write A Review</Button>
    );
}

export default writeReview;