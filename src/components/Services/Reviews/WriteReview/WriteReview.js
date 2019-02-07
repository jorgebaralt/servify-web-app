import React, { useContext } from 'react';
import { HeaderContext } from '../../../../hoc/Layout/Header/Header';
// CSS
import classes from '../Reviews.module.css';
// JSX
import Button from '../../../UI/Button/Button';

const writeReview = (props) => {
    const header = useContext(HeaderContext);
    const bUserIsAuthenticated = props.userDetails ? props.userDetails.userId !== null : false;

    /**
     * If the user is not logged in, the auth modal will open.
     * Otherwise, toggles the review form.
     */
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
